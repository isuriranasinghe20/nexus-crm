import { useState } from "react";
import API from "../services/api";
import { FiX } from "react-icons/fi";

function EditLeadModal({ lead, close, refresh }){
  const [form, setForm] = useState(lead);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const leadSources = ["Website", "Email", "Referral", "Phone Call", "LinkedIn", "Advertisement", "Event", "Other"];

  const updateLead = async()=>{
    if (!form.name || !form.company) {
      setError("Name and Company are required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await API.put(`/leads/${lead._id}`, form);
      refresh();
      close();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update lead. Please try again.");
      setLoading(false);
    }
  };

  return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-lg shadow-xl w-96">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Lead</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-700">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Lead name"
              value={form.name}
              onChange={e=>setForm({...form, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Company name"
              value={form.company}
              onChange={e=>setForm({...form, company: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Email address"
              type="email"
              value={form.email || ""}
              onChange={e=>setForm({...form, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Phone number"
              value={form.phone || ""}
              onChange={e=>setForm({...form, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              value={form.status || "New"}
              onChange={e=>setForm({...form, status: e.target.value})}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              value={form.source || ""}
              onChange={e=>setForm({...form, source: e.target.value})}
            >
              <option value="">Select source</option>
              {leadSources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Salesperson</label>
            <input 
              placeholder="Salesperson name" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={form.salesperson || ""}
              onChange={e=>setForm({...form, salesperson: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="0"
              type="number"
              value={form.dealValue || 0}
              onChange={e=>setForm({...form, dealValue: parseFloat(e.target.value) || 0})}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button 
            onClick={close} 
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
          >
            Cancel
          </button>
          <button 
            onClick={updateLead} 
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>

    </div>
  );
}

export default EditLeadModal;