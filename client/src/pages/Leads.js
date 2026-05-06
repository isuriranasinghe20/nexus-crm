import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import EditLeadModal from "../components/EditLeadModal";
import { FiPlus, FiSearch, FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2 } from "react-icons/fi";

function Leads(){
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [salesperson, setSalesperson] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;
  const navigate = useNavigate();

  const fetchLeads = async()=>{
    const res = await API.get(`/leads?search=${search}&status=${status}`);
    setLeads(res.data);
    setCurrentPage(1);
  };

  useEffect(()=>{
    fetchLeads();
  }, [search, status]);

  const deleteLead = async(id)=>{
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  // Calculate KPI metrics
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.status === "Qualified").length;
  const totalDealValue = leads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

  // Filter leads by company, source, and salesperson
  const filteredLeads = leads.filter(l => {
    if (company && l.company !== company) return false;
    if (source && l.source !== source) return false;
    if (salesperson && l.salesperson !== salesperson) return false;
    return true;
  });

  // Get unique companies, sources, and salespeople for dropdowns
  const companies = [...new Set(leads.map(l => l.company).filter(Boolean))];
  const sources = [...new Set(leads.map(l => l.source).filter(Boolean))];
  const salespeople = [...new Set(leads.map(l => l.salesperson).filter(Boolean))];

  // Pagination
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const startIdx = (currentPage - 1) * leadsPerPage;
  const paginatedLeads = filteredLeads.slice(startIdx, startIdx + leadsPerPage);

  // Get initials and color for avatar
  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
    const hash = name?.charCodeAt(0) || 0;
    return colors[hash % colors.length];
  };

  const getStatusBadgeStyle = (s) => {
    switch(s) {
      case 'New':
        return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'Contacted':
        return 'bg-orange-100 text-orange-700 border border-orange-300';
      case 'Qualified':
        return 'bg-green-100 text-green-700 border border-green-300';
      case 'Proposal Sent':
        return 'bg-purple-100 text-purple-700 border border-purple-300';
      case 'Won':
        return 'bg-green-100 text-green-700 border border-green-300';
      case 'Lost':
        return 'bg-red-100 text-red-700 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
  };

  return(
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600 text-sm mt-1">Manage and track your sales pipeline prospects in real-time.</p>
          </div>
          <button
            onClick={() => setShowLeadForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition duration-200"
          >
            <FiPlus className="w-5 h-5" />
            New Lead
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6 px-8 py-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Total Leads</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalLeads.toLocaleString()}</p>
          <p className="text-blue-600 text-xs mt-2 font-medium">Updated in real-time</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">Qualified</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{qualifiedLeads}</p>
          <p className="text-blue-600 text-xs mt-2 font-medium">{totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0}% conversion rate</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 shadow-sm">
          <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">Total Deal Value</p>
          <p className="text-4xl font-bold text-white mt-2">${(totalDealValue / 1000000).toFixed(1)}M</p>
          <p className="text-blue-100 text-xs mt-2 font-medium">Pipeline value</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border-t border-b border-gray-200 px-8 py-4">
        <div className="flex gap-4 items-center flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-xs">
            <FiSearch className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search leads, companies or owners..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Status Filter */}
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Company Filter */}
          <select 
            value={company} 
            onChange={e => setCompany(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Companies</option>
            {companies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Lead Source Filter */}
          <select 
            value={source} 
            onChange={e => setSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Sources</option>
            {sources.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Salesperson Filter */}
          <select 
            value={salesperson} 
            onChange={e => setSalesperson(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Salespeople</option>
            {salespeople.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Company</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Source</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Salesperson</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Value</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map((l, idx) => (
                <tr key={l._id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${idx === paginatedLeads.length - 1 ? 'border-b-0' : ''}`}>
                  {/* Name with Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`${getAvatarColor(l.name)} text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm`}>
                        {getInitials(l.name)}
                      </div>
                      <div className="cursor-pointer hover:text-blue-600" onClick={()=>navigate(`/lead/${l._id}`)}>
                        <p className="font-semibold text-gray-900 text-sm">{l.name}</p>
                        <p className="text-gray-500 text-xs">{l.email || 'No email'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-sm">{l.company}</p>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-sm">{l.source || '-'}</p>
                  </td>

                  {/* Salesperson */}
                  <td className="px-6 py-4">
                    <p className="text-gray-700 text-sm">{l.salesperson || '-'}</p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyle(l.status)}`}>
                      {l.status}
                    </span>
                  </td>

                  {/* Deal Value */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 text-sm">${l.dealValue?.toLocaleString() || '0'}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={()=>setSelectedLead(l)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={()=>deleteLead(l._id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-gray-600 text-sm">
            Showing {startIdx + 1} to {Math.min(startIdx + leadsPerPage, filteredLeads.length)} of {filteredLeads.length} leads
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition"
            >
              <FiChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 px-3 py-2 rounded-lg flex items-center gap-1 text-sm font-medium transition"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Create New Lead</h2>
            <LeadForm refresh={() => {
              fetchLeads();
              setShowLeadForm(false);
            }} />
            <button
              onClick={() => setShowLeadForm(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedLead && (
        <EditLeadModal
          lead={selectedLead}
          close={()=>setSelectedLead(null)}
          refresh={fetchLeads}
        />
      )}

    </div>
  );
}

export default Leads;