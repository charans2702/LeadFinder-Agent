import os
import requests
from typing import List
from dotenv import load_dotenv

load_dotenv()

class SearchService:
    @staticmethod
    def search_for_urls(company_description: str, num_links: int = 3) -> List[str]:
        url = "https://api.firecrawl.dev/v1/search"
        headers = {
            "Authorization": f"Bearer {os.getenv('FIRECRAWL_API_KEY')}",
            "Content-Type": "application/json"
        }
        payload = {
            "query": f"quora websites where people are looking for {company_description} services",
            "limit": num_links,
            "lang": "en",
            "location": "United States",
            "timeout": 60000,
        }
        response = requests.post(url, json=payload, headers=headers)
        return [result["url"] for result in response.json().get("data", [])] if response.status_code == 200 else []