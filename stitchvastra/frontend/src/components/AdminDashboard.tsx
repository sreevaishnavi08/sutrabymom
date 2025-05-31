import React, { useState, useEffect, useMemo } from 'react';
import { Search, Edit, Filter, ArrowUpDown, Plus, X, Check, AlertCircle, TrendingUp, Users, ShoppingBag, IndianRupee } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  orderStatus: string;
  location: string;
  date: string;
  items?: string[];
}

interface Employee {
  id: number;
  name: string;
  occupation: string;
  location: string;
  totalOrders: number;
  totalMoneyEarned: number;
  status: string;
  joinDate: string;
  skills?: string[];
}

interface Customer {
  id: number;
  name: string;
  orderIds: number[];
  orderStatus: string;
  paymentStatus: string;
  email: string;
  phone: string;
  joinDate: string;
}

// Analytics Data
const monthlyRevenue = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 19000 },
];

const ordersByLocation = [
  { location: 'Mumbai', orders: 45 },
  { location: 'Delhi', orders: 35 },
  { location: 'Bangalore', orders: 30 },
  { location: 'Chennai', orders: 25 },
];

const employeePerformance = [
  { name: 'Priya Mehta', orders: 15, earnings: 6000 },
  { name: 'Rahul Kumar', orders: 8, earnings: 3500 },
  { name: 'Anita Singh', orders: 12, earnings: 4800 },
  { name: 'Vikram Patel', orders: 10, earnings: 4000 },
];

const orderStatusData = [
  { name: 'Pending', value: 30 },
  { name: 'In Progress', value: 45 },
  { name: 'Completed', value: 85 },
  { name: 'Cancelled', value: 10 },
];

// Enhanced Dummy Data
const dummyOrders: Order[] = [
  { 
    id: 1, 
    customerName: 'Aarav Sharma', 
    totalAmount: 1500, 
    orderStatus: 'Pending', 
    location: 'Mumbai',
    date: '2024-03-15',
    items: ['Suit', 'Blouse']
  },
  { 
    id: 2, 
    customerName: 'Saanvi Patel', 
    totalAmount: 1200, 
    orderStatus: 'Completed', 
    location: 'Delhi',
    date: '2024-03-14',
    items: ['Saree', 'Petticoat']
  },
];

const dummyEmployees: Employee[] = [
  { 
    id: 1, 
    name: 'Priya Mehta', 
    occupation: 'Tailor', 
    location: 'Mumbai', 
    totalOrders: 15, 
    totalMoneyEarned: 6000, 
    status: 'Active',
    joinDate: '2023-01-15',
    skills: ['Stitching', 'Pattern Making', 'Alterations']
  },
  { 
    id: 2, 
    name: 'Rahul Kumar', 
    occupation: 'Embroidery Specialist', 
    location: 'Delhi', 
    totalOrders: 8, 
    totalMoneyEarned: 3500, 
    status: 'Active',
    joinDate: '2023-02-20',
    skills: ['Hand Embroidery', 'Machine Embroidery', 'Beadwork']
  },
];

const dummyCustomers: Customer[] = [
  { 
    id: 1, 
    name: 'Aarav Sharma', 
    orderIds: [1], 
    orderStatus: 'Pending', 
    paymentStatus: 'Unpaid',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    joinDate: '2024-01-10'
  },
  { 
    id: 2, 
    name: 'Saanvi Patel', 
    orderIds: [2], 
    orderStatus: 'Completed', 
    paymentStatus: 'Paid',
    email: 'saanvi@example.com',
    phone: '+91 98765 43211',
    joinDate: '2024-01-15'
  },
];

// Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Summary Cards */}
      <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h4 className="text-2xl font-bold">₹101,500</h4>
              <p className="text-green-500 text-sm">+12.5% from last month</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <IndianRupee className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h4 className="text-2xl font-bold">170</h4>
              <p className="text-green-500 text-sm">+8.2% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Customers</p>
              <h4 className="text-2xl font-bold">1,250</h4>
              <p className="text-green-500 text-sm">+15.3% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Growth Rate</p>
              <h4 className="text-2xl font-bold">12.5%</h4>
              <p className="text-green-500 text-sm">+2.1% from last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by Location */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Orders by Location</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersByLocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Performance */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Employee Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={employeePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#6366f1" />
              <Line yAxisId="right" type="monotone" dataKey="earnings" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#6366f1"
                dataKey="value"
                label
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [employees, setEmployees] = useState<Employee[]>(dummyEmployees);
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterConfig, setFilterConfig] = useState({
    orderStatus: '',
    location: '',
    paymentStatus: ''
  });

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    let result = {
      orders: [...orders],
      employees: [...employees],
      customers: [...customers]
    };

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result.orders = result.orders.filter(order => 
        order.customerName.toLowerCase().includes(query) ||
        order.location.toLowerCase().includes(query)
      );
      result.employees = result.employees.filter(employee => 
        employee.name.toLowerCase().includes(query) ||
        employee.occupation.toLowerCase().includes(query)
      );
      result.customers = result.customers.filter(customer => 
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filterConfig.orderStatus) {
      result.orders = result.orders.filter(order => 
        order.orderStatus === filterConfig.orderStatus
      );
    }
    if (filterConfig.location) {
      result.orders = result.orders.filter(order => 
        order.location === filterConfig.location
      );
      result.employees = result.employees.filter(employee => 
        employee.location === filterConfig.location
      );
    }
    if (filterConfig.paymentStatus) {
      result.customers = result.customers.filter(customer => 
        customer.paymentStatus === filterConfig.paymentStatus
      );
    }

    return result;
  }, [orders, employees, customers, searchQuery, filterConfig]);

  // Sort function
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Toggle employee status
  const toggleEmployeeStatus = (id: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === id
          ? { ...employee, status: employee.status === 'Active' ? 'Deactivated' : 'Active' }
          : employee
      )
    );
  };

  // Handle item selection and modal
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterConfig({
      orderStatus: '',
      location: '',
      paymentStatus: ''
    });
    setSearchQuery('');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 rounded-md mb-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 pl-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-2 top-3" />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {/* Analytics Dashboard */}
        <AnalyticsDashboard />

        {/* Original Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
              <button 
                onClick={() => handleSort('totalAmount')}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
            {filteredData.orders.map(order => (
              <div 
                key={order.id} 
                className="p-4 bg-gray-100 rounded-lg mb-3 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => handleItemClick(order)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">{order.customerName}</p>
                    <p className="text-gray-600">Total: ₹{order.totalAmount}</p>
                    <p className="text-gray-600">Status: {order.orderStatus}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Employee Management */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Employees</h3>
              <button className="text-indigo-600 hover:text-indigo-800">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            {filteredData.employees.map(employee => (
              <div 
                key={employee.id} 
                className="p-4 bg-gray-100 rounded-lg mb-3 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => handleItemClick(employee)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">{employee.name}</p>
                    <p className="text-gray-600">{employee.occupation}</p>
                    <p className="text-gray-600">Orders: {employee.totalOrders}</p>
                    <p className="text-gray-600">Earnings: ₹{employee.totalMoneyEarned}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEmployeeStatus(employee.id);
                    }}
                    className={`px-4 py-2 rounded ${
                      employee.status === 'Active' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white transition-colors`}
                  >
                    {employee.status === 'Active' ? 'Active' : 'Deactivated'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customers */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Customers</h3>
            {filteredData.customers.map(customer => (
              <div 
                key={customer.id} 
                className="p-4 bg-gray-100 rounded-lg mb-3 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => handleItemClick(customer)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold">{customer.name}</p>
                    <p className="text-gray-600">Orders: {customer.orderIds.length}</p>
                    <p className="text-gray-600">Status: {customer.orderStatus}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    customer.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.paymentStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setSelectedItem(null);
      }}>
        {selectedItem && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedItem.customerName || selectedItem.name}
            </h2>
            <div className="space-y-4">
              {Object.entries(selectedItem).map(([key, value]: [string, any]) => {
                if (key !== 'id' && key !== 'customerName' && key !== 'name') {
                  return (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-gray-600">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal 
        isOpen={isModalOpen && !selectedItem} 
        onClose={() => setIsModalOpen(false)}
      >
        <div>
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Order Status</label>
              <select
                value={filterConfig.orderStatus}
                onChange={(e) => setFilterConfig(prev => ({ ...prev, orderStatus: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={filterConfig.location}
                onChange={(e) => setFilterConfig(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Status</label>
              <select
                value={filterConfig.paymentStatus}
                onChange={(e) => setFilterConfig(prev => ({ ...prev, paymentStatus: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;