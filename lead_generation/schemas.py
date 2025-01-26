from typing import List
from pydantic import BaseModel, Field

class QuoraUserInteractionSchema(BaseModel):
    username: str = Field(description="Username of the user")
    bio: str = Field(description="User bio")
    post_type: str = Field(description="Post type")
    timestamp: str = Field(description="Post timestamp")
    upvotes: int = Field(default=0, description="Upvotes count")
    links: List[str] = Field(default_factory=list, description="Links in post")

class QuoraPageSchema(BaseModel):
    interactions: List[QuoraUserInteractionSchema] = Field(description="User interactions")

class LeadGenerationRequest(BaseModel):
    query: str
    num_links: int = 3

class LeadGenerationResponse(BaseModel):
    urls: List[str]
    user_data: List[dict]