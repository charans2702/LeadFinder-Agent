import os
from typing import List
from firecrawl import FirecrawlApp
from dotenv import load_dotenv
from ..schemas import QuoraPageSchema

load_dotenv()

class ExtractionService:
    @staticmethod
    def extract_user_info_from_urls(urls: List[str]) -> List[dict]:
        firecrawl_app = FirecrawlApp(api_key=os.getenv('FIRECRAWL_API_KEY'))
        user_info_list = []
        
        for url in urls:
            try:
                response = firecrawl_app.extract(
                    [url],
                    {
                        'prompt': 'Extract user info from Quora posts',
                        'schema': QuoraPageSchema.model_json_schema(),
                    }
                )
                
                if response.get('success'):
                    interactions = response.get('data', {}).get('interactions', [])
                    if interactions:
                        user_info_list.append({
                            "website_url": url,
                            "user_info": interactions
                        })
            except Exception:
                continue
        
        return user_info_list