import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import LeadForm from "../components/LeadForm";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { 
  FiPlus, FiBriefcase, FiUsers, FiTrendingUp, FiCheckCircle
} from "react-icons/fi";

function Dashboard(){
  const [leads,setLeads] = useState([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const navigate = useNavigate();

  const fetchLeads = async()=>{
    try {
      const res = await API.get("/leads");
      if(res && res.data) setLeads(res.data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchLeads();
  },[]);

  // 📊 Stats preserving original logic
  const total = leads.length;
  const won = leads.filter(l=>l.status==="Won" || l.status?.toLowerCase() === "won").length;
  const lost = leads.filter(l=>l.status==="Lost" || l.status?.toLowerCase() === "lost").length;
  const qualified = leads.filter(l=>l.status==="Qualified" || l.status?.toLowerCase().includes("qualif")).length;
  const newLeads = leads.filter(l=>l.status==="New" || l.status?.toLowerCase() === "new").length;
  const contacted = leads.filter(l=>l.status==="Contacted" || l.status?.toLowerCase() === "contacted").length;

  const totalValue = leads.reduce((sum,l)=>sum+(l.dealValue || 0),0);
  
  // Format currency helper
  const formatCurrency = (val) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
    return `$${val}`;
  };

  // 📊 Real Bar Chart Data (Actual Lead Statuses)
  const statusData = [
    { name: "New", count: newLeads },
    { name: "Contacted", count: contacted },
    { name: "Qualified", count: qualified },
    { name: "Won", count: won },
    { name: "Lost", count: lost }
  ];

  return(
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-gray-900">

      {/* Breadcrumbs */}
      <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">
        NEXUS / DASHBOARD
      </p>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Executive Overview</h2>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowLeadForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold shadow-sm transition-colors text-sm"
          >
            <FiPlus />
            New Lead
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="TOTAL PIPELINE" 
          value={formatCurrency(totalValue)} 
          icon={<FiBriefcase className="text-blue-600 w-5 h-5" />}
          iconBg="bg-blue-50"
        />
        <Card 
          title="ACTIVE LEADS" 
          value={total.toLocaleString()} 
          icon={<FiUsers className="text-red-500 w-5 h-5" />}
          iconBg="bg-red-50"
        />
        <Card 
          title="CONVERSION RATE" 
          value={total > 0 ? `${((won / total) * 100).toFixed(1)}%` : "0%"} 
          icon={<FiTrendingUp className="text-orange-500 w-5 h-5" />}
          iconBg="bg-orange-50"
        />
        <Card 
          title="WON DEALS" 
          value={won.toLocaleString()} 
          icon={<FiCheckCircle className="text-green-500 w-5 h-5" />}
          iconBg="bg-green-50"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-800">Leads By Status</h3>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="count" fill="#0052cc" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* High Priority Leads Table - dynamically mapped from leads */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Leads</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Probability</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.slice(0, 5).map((lead, idx) => {
                // Utility to assign tag colors dynamically
                const getStatusColor = (status) => {
                  const s = (status || '').toLowerCase();
                  if(s.includes('won') || s.includes('proposal')) return "bg-green-100 text-green-700";
                  if(s.includes('new') || s.includes('negotiation')) return "bg-blue-100 text-blue-700";
                  if(s.includes('qualify') || s.includes('contacted')) return "bg-orange-100 text-orange-700";
                  if(s.includes('lost')) return "bg-red-100 text-red-700";
                  return "bg-gray-100 text-gray-700";
                };

                // Calculate random visual probability 
                const probability = Math.max(30, Math.min(100, (lead.dealValue || 1000) / 1000));

                return (
                  <tr key={lead._id || idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                      {lead.company || lead.name || "Unknown Company"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm font-medium">
                      {lead.contact || lead.email || "No Contact info"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${getStatusColor(lead.status)}`}>
                        {lead.status || "NEW"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">
                      ${(lead.dealValue || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{width: `${probability}%`}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/lead/${lead._id}`} 
                        className="text-blue-600 font-semibold text-sm hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 text-sm font-medium">
                    No leads found. Add some leads to see them here!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

    </div>
  );
}

function Card({title, value, icon, iconBg}){
  return(
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[120px]">
      <div className="flex justify-between items-start">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-1.5">{value}</h2>
      </div>
    </div>
  );
}

export default Dashboard;