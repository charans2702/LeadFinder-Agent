from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from lead_generation.core import generate_leads
from lead_generation.schemas import LeadGenerationRequest, LeadGenerationResponse

def create_app() -> FastAPI:
    app = FastAPI(title="Lead Generation API")

    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.post("/generate-leads", response_model=LeadGenerationResponse)
    async def create_lead_generation(request: LeadGenerationRequest):
        try:
            result = generate_leads(request.query, request.num_links)
            
            if not result:
                raise HTTPException(status_code=404, detail="No leads found")
            
            return LeadGenerationResponse(**result)
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return app