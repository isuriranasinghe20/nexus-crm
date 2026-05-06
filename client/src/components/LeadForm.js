import { useState } from "react";
import API from "../services/api";

function LeadForm({ refresh }){
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    salesperson: "",
    dealValue: 0
  });
  const [loading, setLoading] = useState(false);

  const leadSources = ["Website", "Email", "Referral", "Phone Call", "LinkedIn", "Advertisement", "Event", "Other"];

  const handleSubmit = async()=>{
    if (!form.name || !form.company || !form.email) {
      alert("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    try {
      await API.post("/leads", form);
      setForm({ name: "", company: "", email: "", phone: "", source: "", salesperson: "", dealValue: 0 });
      refresh();
    } catch (error) {
      alert("Error creating lead");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input 
          placeholder="Lead name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={form.name}
          onChange={e=>setForm({...form, name: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
        <input 
          placeholder="Company name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={form.company}
          onChange={e=>setForm({...form, company: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input 
          placeholder="Email address" 
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={form.email}
          onChange={e=>setForm({...form, email: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input 
          placeholder="Phone number" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={form.phone}
          onChange={e=>setForm({...form, phone: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
        <select 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          value={form.source}
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
          value={form.salesperson}
          onChange={e=>setForm({...form, salesperson: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value</label>
        <input 
          type="number" 
          placeholder="0" 
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={form.dealValue}
          onChange={e=>setForm({...form, dealValue: parseFloat(e.target.value) || 0})}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        {loading ? "Creating..." : "Create Lead"}
      </button>
    </div>
  );
}

export default LeadForm;