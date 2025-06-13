# Remove existing venv if it exists
if (Test-Path "venv") {
    Remove-Item -Recurse -Force "venv"
}

# Create new virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Upgrade pip
python -m pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    @"
OPENAI_API_KEY=your_api_key_here
"@ | Out-File -FilePath ".env" -Encoding UTF8
}

Write-Host "Setup complete! Please edit .env file with your OpenAI API key."
Write-Host "To start the server, run: .\venv\Scripts\Activate.ps1; uvicorn ai_api:app --reload --port 8001" 