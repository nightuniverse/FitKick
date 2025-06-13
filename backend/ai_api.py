import os
import base64
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
from openai import OpenAI
import torch
from ultralytics.nn.tasks import DetectionModel
from dotenv import load_dotenv
import cv2
import numpy as np
from io import BytesIO
from PIL import Image

# Safe globals for PyTorch 2.6+
torch.serialization.add_safe_globals({'ultralytics.nn.tasks.DetectionModel': DetectionModel})

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize YOLO model
model = YOLO('yolov8n.pt')

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.post("/analyze-food")
async def analyze_food(file: UploadFile = File(...)):
    try:
        # Read and validate image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # YOLO detection
        results = model(img)
        yolo_food = "No food detected"
        
        for result in results:
            for box in result.boxes:
                if box.cls == 47:  # Class 47 is 'apple' in COCO dataset
                    yolo_food = "apple"
                    break
        
        # Convert image for GPT Vision
        _, buffer = cv2.imencode('.jpg', img)
        base64_image = base64.b64encode(buffer).decode('utf-8')
        
        # GPT Vision analysis
        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What food is in this image? Respond with just the food name."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=300
        )
        
        gpt_food = response.choices[0].message.content.strip().lower()
        
        # Compare results and get final food name
        final_food = gpt_food if "apple" in gpt_food else yolo_food
        
        # Get calorie information
        calorie_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are a nutrition expert. Provide calorie information for the given food. Respond with just the number of calories."
                },
                {
                    "role": "user",
                    "content": f"What are the calories in {final_food}? Respond with just the number."
                }
            ],
            max_tokens=50
        )
        
        calories = calorie_response.choices[0].message.content.strip()
        
        return JSONResponse({
            "yolo_food": yolo_food,
            "gpt_food": gpt_food,
            "final_food": final_food,
            "calories": calories
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 