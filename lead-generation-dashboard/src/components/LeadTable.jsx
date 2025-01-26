import React, { useState } from "react"
import { CSVLink } from "react-csv"
import { FiArrowUp, FiArrowDown, FiExternalLink, FiDownload } from "react-icons/fi"
import { ImStatsBars } from "react-icons/im"

function LeadTable({ leads, sourceUrls }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })

  const sortedLeads = React.useMemo(() => {
    const sortableLeads = [...leads]
    if (sortConfig.key !== null) {
      sortableLeads.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableLeads
  }, [leads, sortConfig])

  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const StatsCard = ({ title, value, color }) => (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${color} text-white`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="flex flex-wrap justify-between items-center p-6 border-b">
        <h2 className="text-2xl font-bold flex items-center mb-4 md:mb-0">
          <ImStatsBars className="mr-2 text-blue-500" />
          Lead Analysis Report
        </h2>
        <CSVLink
          data={leads}
          filename="lead_report.csv"
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <FiDownload className="mr-2" />
          Export CSV
        </CSVLink>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-blue-50">
        <StatsCard title="Total Leads" value={leads.length} color="from-blue-400 to-blue-500" />
        <StatsCard
          title="Avg. Upvotes"
          value={Math.round(leads.reduce((acc, lead) => acc + lead.Upvotes, 0) / leads.length) || 0}
          color="from-purple-400 to-purple-500"
        />
        <StatsCard title="Sources Analyzed" value={sourceUrls.length} color="from-green-400 to-green-500" />
      </div>

      {/* Leads Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLeads.map((lead, index) => (
            <a
              key={index}
              href={lead.Links}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold truncate">{lead.Username}</h3>
                <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">{lead["Post Type"]}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lead.Bio}</p>

              <div className="flex justify-between items-center text-sm mb-4">
                <div className="flex items-center">
                  <span className="text-green-600 font-medium">▲ {lead.Upvotes}</span>
                </div>
                <span className="text-gray-500">{new Date(lead.Timestamp).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                <FiExternalLink className="mr-2" />
                View Profile
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Source URLs Section */}
      <div className="p-6 bg-gray-50 border-t">
        <details className="group">
          <summary className="flex items-center cursor-pointer list-none">
            <span className="text-lg font-semibold">Analyzed Sources ({sourceUrls.length})</span>
            <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <div className="mt-4 space-y-2">
            {sourceUrls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2 rounded-md hover:bg-blue-50 transition-colors duration-300 text-blue-600 truncate"
              >
                {url}
              </a>
            ))}
          </div>
        </details>
      </div>
    </div>
  )
}

export default LeadTable

