"use client";
import { useState, useEffect } from 'react';

export default function EmailDashboard() {
  const [subscribers, setSubscribers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/waitlist/export').then(res => res.json()),
      fetch('http://localhost:3001/api/waitlist/stats').then(res => res.json())
    ]).then(([subsData, statsData]) => {
      if (subsData.success) setSubscribers(subsData.data);
      if (statsData.success) setStats(statsData.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">AURLINK Email Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">{stats?.total || 0}</div>
            <div className="text-gray-600">Total Subscribers</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-green-600">{stats?.last7Days || 0}</div>
            <div className="text-gray-600">Last 7 Days</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">Resend</div>
            <div className="text-gray-600">Email Service</div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Subscriber List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.email}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{subscriber.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {subscribers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No subscribers yet. Test the subscription form!
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <a 
            href="/admin/email-manager" 
            className="block p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">📧 Send Broadcast</h3>
            <p className="text-gray-600">Send premium emails to all subscribers</p>
          </a>
          
          <button 
            onClick={() => {
              const csv = [
                'Email,Position,Join Date',
                ...subscribers.map(sub => 
                  `"${sub.email}",${sub.position},"${new Date(sub.created_at).toLocaleDateString()}"`
                )
              ].join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `aurlink-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
            }}
            className="text-left p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">📊 Export CSV</h3>
            <p className="text-gray-600">Download subscriber list as CSV file</p>
          </button>
        </div>
      </div>
    </div>
  );
}