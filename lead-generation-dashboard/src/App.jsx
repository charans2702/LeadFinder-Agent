import React, { useState } from 'react';
import axios from 'axios';
import LeadTable from './components/LeadTable';
import SearchForm from './components/SearchForm';
import './index.css';
import { FiSearch, FiUsers, FiLink, FiArrowUp, FiAward, FiBriefcase } from 'react-icons/fi';

function App() {
  const [leads, setLeads] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query, numLinks) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/generate-leads', { 
        query,
        num_links: Number(numLinks)
      });
      
      setLeads(response.data.user_data);
      setUrls(response.data.urls);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError('Failed to fetch leads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-6xl font-bold text-gray-800 relative">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LeadFinder AI
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Discover High-Quality Leads through AI-Powered Social Analysis
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <FeatureCard icon={<FiUsers />} text="Targeted Leads" />
            <FeatureCard icon={<FiAward />} text="Quality Insights" />
            <FeatureCard icon={<FiBriefcase />} text="Professional Network" />
          </div>
        </header>

        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
              <SearchForm 
                onSearch={handleSearch} 
                loading={loading}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center py-4 px-6 bg-red-100 text-red-700 rounded-lg mb-8">
            {error}
          </div>
        )}

        {leads.length > 0 ? (
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <LeadTable 
              leads={leads} 
              sourceUrls={urls}
            />
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center w-48 h-48">
                  <div className="animate-float bg-white p-6 rounded-full shadow-lg border border-blue-100">
                    <FiSearch className="w-16 h-16 text-blue-500" />
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-600 font-medium mb-2">
                {loading ? 'Scanning Social Platforms' : 'Ready to Explore'}
              </p>
              <p className="text-gray-500 mb-4">
                {loading ? 
                  'Analyzing posts and profiles across multiple platforms...' : 
                  'Enter a professional service or skill to find relevant leads'
                }
              </p>
              {loading && (
                <div className="mt-6 flex justify-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="mt-12 text-center text-gray-500">
        <p>&copy; 2023 LeadFinder AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, text }) {
  return (
    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
      <div className="mr-2 text-blue-500">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

export default App;
