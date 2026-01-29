import React, { useState } from 'react';
import { 
  Users, Activity, MessageSquare, Star, Settings, 
  TrendingUp, AlertTriangle, CheckCircle, Clock,
  DollarSign, UserPlus, Briefcase, ChevronRight,
  ChevronDown, ChevronUp, Search, Filter
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import ChatNotifications from './ChatNotifications';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for charts
  const userActivityData = [
    { name: 'Jan', users: 400, professionals: 240 },
    { name: 'Feb', users: 500, professionals: 280 },
    { name: 'Mar', users: 600, professionals: 320 },
    { name: 'Apr', users: 800, professionals: 380 },
    { name: 'May', users: 1000, professionals: 450 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 5000 },
    { name: 'Feb', revenue: 6200 },
    { name: 'Mar', revenue: 7800 },
    { name: 'Apr', revenue: 8900 },
    { name: 'May', revenue: 10500 },
  ];

  const serviceDistributionData = [
    { name: 'Plomberie', value: 30 },
    { name: 'Électricité', value: 25 },
    { name: 'Menuiserie', value: 20 },
    { name: 'Peinture', value: 15 },
    { name: 'Autres', value: 10 },
  ];

  const COLORS = ['#e0692d', '#f07e40', '#f4a261', '#e9c46a', '#2a9d8f'];

  const stats = {
    totalUsers: '12,345',
    totalProfessionals: '2,456',
    activeServices: '3,789',
    totalRevenue: '€156,789',
    averageRating: '4.8',
    totalReviews: '8,567',
    pendingVerifications: '45',
    activeChats: '234'
  };

  const recentActivities = [
    {
      id: 1,
      type: 'new_user',
      content: 'Nouveau client inscrit',
      timestamp: '2 minutes ago',
      icon: UserPlus,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'new_service',
      content: 'Nouveau service ajouté',
      timestamp: '5 minutes ago',
      icon: Briefcase,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'new_review',
      content: 'Nouvel avis posté',
      timestamp: '10 minutes ago',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 4,
      type: 'alert',
      content: 'Signalement utilisateur',
      timestamp: '15 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-500'
    }
  ];

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Utilisateurs totaux</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Professionnels</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProfessionals}</h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Briefcase className="h-6 w-6 text-[#e0692d]" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenu mensuel</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+15%</span>
            <span className="text-gray-500 ml-2">vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Note moyenne</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.averageRating}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">{stats.totalReviews} avis</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des utilisateurs</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#2563eb" />
                <Line type="monotone" dataKey="professionals" stroke="#e0692d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenus mensuels</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#e0692d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start">
                <div className={`p-2 rounded-full ${activity.color.replace('text', 'bg')}/10 mr-4`}>
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <button className="text-[#e0692d] hover:text-[#f07e40]">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution des services</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrateur</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ChatNotifications />
              <button className="text-gray-500 hover:text-gray-700">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Services actifs</p>
              <p className="text-xl font-semibold">{stats.activeServices}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">En attente</p>
              <p className="text-xl font-semibold">{stats.pendingVerifications}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Chats actifs</p>
              <p className="text-xl font-semibold">{stats.activeChats}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Activité</p>
              <p className="text-xl font-semibold">+24%</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filtres
            {showFilters ? (
              <ChevronUp className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDown className="h-5 w-5 ml-2" />
            )}
          </button>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]"
                />
              </div>

              <div>
                <select className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]">
                  <option value="">Période</option>
                  <option value="today">Aujourd'hui</option>
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="year">Cette année</option>
                </select>
              </div>

              <div>
                <select className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]">
                  <option value="">Type d'activité</option>
                  <option value="users">Utilisateurs</option>
                  <option value="services">Services</option>
                  <option value="reviews">Avis</option>
                  <option value="messages">Messages</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Section */}
        {renderOverviewSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;