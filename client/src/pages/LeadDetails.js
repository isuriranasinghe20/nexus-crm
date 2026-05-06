import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiArrowLeft, FiMail, FiPhone, FiDollarSign, FiTag, FiMessageSquare } from "react-icons/fi";

function LeadDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async()=>{
    try {
      const leadRes = await API.get(`/leads`);
      const currentLead = leadRes.data.find(l => l._id === id);
      setLead(currentLead);
      
      const notesRes = await API.get(`/notes/${id}`);
      setNotes(notesRes.data);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[id]);

  const addNote = async()=>{
    if(!content.trim()) return;
    try {
      await API.post("/notes",{leadId:id, content, createdBy:"Admin"});
      setContent("");
      fetchData();
    } catch(err) {
      console.error(err);
    }
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

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
    const hash = name?.charCodeAt(0) || 0;
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Lead not found</p>
          <button 
            onClick={() => navigate('/leads')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Leads
          </button>
        </div>
      </div>
    );
  }

  return(
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/leads')}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className={`${getAvatarColor(lead.name)} text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg`}>
                {getInitials(lead.name)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
                <p className="text-gray-600 text-sm mt-1">{lead.company}</p>
              </div>
            </div>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getStatusBadgeStyle(lead.status)}`}>
              {lead.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-8 py-6">
        
        {/* Left: Lead Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <FiMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Email</p>
                  <p className="text-gray-900 font-medium">{lead.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <FiPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Phone</p>
                  <p className="text-gray-900 font-medium">{lead.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FiDollarSign className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Deal Value</p>
                  <p className="text-gray-900 font-medium">${(lead.dealValue || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Lead Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Name</p>
                <p className="text-gray-900 font-medium">{lead.name}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Company</p>
                <p className="text-gray-900 font-medium">{lead.company}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Status</p>
                <p className="text-gray-900 font-medium">{lead.status}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Lead Source</p>
                <p className="text-gray-900 font-medium">{lead.source || 'Not specified'}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Assigned Salesperson</p>
                <p className="text-gray-900 font-medium">{lead.salesperson || 'Unassigned'}</p>
              </div>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Created</p>
                <p className="text-gray-900 font-medium">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Activity/Notes Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <FiMessageSquare className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-bold text-gray-900">Activity & Notes</h2>
            </div>

            {/* Add Note */}
            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200">
              <textarea
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                placeholder="Add a note..."
                rows="3"
                value={content}
                onChange={e=>setContent(e.target.value)}
              />
              <button 
                onClick={addNote}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition h-fit"
              >
                Add Note
              </button>
            </div>

            {/* Notes Timeline */}
            <div className="space-y-4">
              {notes.length === 0 ? (
                <p className="text-gray-500 text-sm">No notes yet. Add one to get started!</p>
              ) : (
                notes.map(n=>(
                  <div key={n._id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-800 text-sm leading-relaxed">{n.content}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Info */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-1">Pipeline Value</p>
                <p className="text-2xl font-bold text-blue-600">${(lead.dealValue || 0).toLocaleString()}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-3">Current Stage</p>
                <div className={`px-3 py-2 rounded-lg text-sm font-semibold text-center ${getStatusBadgeStyle(lead.status)}`}>
                  {lead.status}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Notes</p>
                <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Last Updated</p>
                <p className="text-sm text-gray-900">{lead.updatedAt ? new Date(lead.updatedAt).toLocaleString() : 'Never'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;