# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start the server
uvicorn ai_api:app --reload --port 8001 