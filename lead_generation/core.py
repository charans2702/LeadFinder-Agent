from .services.prompt_transformer import PromptTransformer
from .services.search_service import SearchService
from .services.extraction_service import ExtractionService
from .utils.data_formatter import DataFormatter
from typing import Optional, Dict, Any

def generate_leads(user_query: str, num_links: int = 3) -> Optional[Dict[str, Any]]:
    # Transform query
    company_description = PromptTransformer.transform_query(user_query)
    
    # Search URLs
    urls = SearchService.search_for_urls(company_description, num_links)
    
    if not urls:
        return None
    
    # Extract user info
    user_info_list = ExtractionService.extract_user_info_from_urls(urls)
    
    # Format data
    flattened_data = DataFormatter.format_user_info_to_json(user_info_list)
    
    return {
        "urls": urls,
        "user_data": flattened_data
    }