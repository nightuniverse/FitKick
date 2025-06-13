# NutriAI - AI-Powered Food Analysis

NutriAI is an intelligent food analysis platform that uses artificial intelligence to identify food items and provide detailed nutritional information.

## Features

- AI-powered food recognition
- Detailed nutritional analysis
- Calorie and macronutrient breakdown
- Ingredient identification
- User-friendly interface

## Tech Stack

- Frontend: React with TypeScript
- Backend: FastAPI
- AI: OpenAI GPT-4 Vision
- Image Processing: Pillow

## Setup Instructions

### Frontend Setup

1. Navigate to the project root directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file in the backend directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Upload a food image using the interface
3. Click "Analyze Food" to get detailed nutritional information
4. View the results including calories, macronutrients, and ingredients

## API Endpoints

- `POST /analyze-food`: Upload and analyze a food image
- `GET /health`: Health check endpoint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License