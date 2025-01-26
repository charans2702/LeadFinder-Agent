# LeadFinder Agent

## Overview
LeadFinder is an AI-powered lead generation tool that helps businesses find potential leads on Quora by transforming user queries into targeted searches.

![LeadFinder Dashboard](gifs/leadfinder.gif)

## Features
- Query transformation using AI
- Targeted Quora URL search
- User interaction extraction
- Comprehensive lead data formatting

## Prerequisites
- Python 3.9+
- API Keys:
  - Groq API Key
  - Firecrawl API Key

## Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd lead-finder
```

### 2. Set Up Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the project root:
```
GROQ_API_KEY=your_groq_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## Running the Application

### Start the API Server
```bash
python main.py
```

### API Endpoint
- **POST** `/generate-leads`
- Request Body:
  ```json
  {
    "query": "Find leads for AI customer support",
    "num_links": 3
  }
  ```

## React Dashboard

### Setup
```bash
cd lead_generation_dashboard
npm install
npm start
```

## Configuration
Modify `settings.py` to adjust:
- API Host/Port
- Default Search Settings
- Debug Mode

## Technologies
- FastAPI
- Groq AI
- Firecrawl
- Pydantic
- React

