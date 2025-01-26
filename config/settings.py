import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # API Keys
    GROQ_API_KEY: str = os.getenv('GROQ_API_KEY', '')
    FIRECRAWL_API_KEY: str = os.getenv('FIRECRAWL_API_KEY', '')

    # Application Settings
    API_HOST: str = '0.0.0.0'
    API_PORT: int = 8000
    DEBUG_MODE: bool = False

    # Search Configuration
    DEFAULT_SEARCH_LINKS: int = 3
    SEARCH_LANGUAGE: str = 'en'
    SEARCH_LOCATION: str = 'United States'

    # Optional: Load from .env file
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

settings = Settings()