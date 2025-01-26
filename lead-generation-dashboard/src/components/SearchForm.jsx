import React, { useState } from 'react';
import { FiSearch, FiLink } from 'react-icons/fi';

function SearchForm({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [numLinks, setNumLinks] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, numLinks);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
    >
      <div>
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="query"
        >
          Enter Search Query
        </label>
        <div className="relative">
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., AI machine learning services"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div>
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="numLinks"
        >
          Number of Links to Analyze
        </label>
        <div className="relative">
          <input
            id="numLinks"
            type="number"
            value={numLinks}
            onChange={(e) => setNumLinks(e.target.value)}
            min="1"
            max="10"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'}`}
        >
          {loading ? 'Searching...' : 'Generate Leads'}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
