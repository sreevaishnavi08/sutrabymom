import React from 'react';
import { Scissors, Calendar, MessageSquare, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VastrakarDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vastrakarType, vastrakarId } = location.state || {};

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">Vastrakar Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {vastrakarType} - {vastrakarId}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Scissors className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Current Orders</h3>
                  <p className="text-sm text-gray-500">View and manage orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
                  <p className="text-sm text-gray-500">Manage your work schedule</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                  <p className="text-sm text-gray-500">Customer communications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}