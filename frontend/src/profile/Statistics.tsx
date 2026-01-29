import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, MessageSquare, Star, Eye, 
  Calendar, Clock, DollarSign, Award, RefreshCw, Download,
  Filter, ChevronDown, ChevronUp
} from 'lucide-react';
import { User } from '../../utils/types';

interface StatisticsProps {
  user: User;
}

const Statistics: React.FC<StatisticsProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - In a real app, this would come from API
  const [stats, setStats] = useState({
    totalViews: 1247,
    totalMessages: 89,
    averageRating: 4.8,
    totalReviews: 156,
    responseTime: '2h 15min',
    conversionRate: 23.5,
    totalEarnings: 15420,
    activeProjects: 12
  });

  const monthlyData = [
    { name: 'Jan', vues: 120, messages: 15, projets: 8, revenus: 1200 },
    { name: 'Fév', vues: 180, messages: 22, projets: 12, revenus: 1800 },
    { name: 'Mar', vues: 150, messages: 18, projets: 10, revenus: 1500 },
    { name: 'Avr', vues: 220, messages: 28, projets: 15, revenus: 2200 },
    { name: 'Mai', vues: 280, messages: 35, projets: 18, revenus: 2800 },
    { name: 'Jun', vues: 320, messages: 42, projets: 22, revenus: 3200 }
  ];

  const weeklyData = [
    { name: 'Lun', vues: 45, messages: 8, projets: 3 },
    { name: 'Mar', vues: 52, messages: 12, projets: 4 },
    { name: 'Mer', vues: 38, messages: 6, projets: 2 },
    { name: 'Jeu', vues: 61, messages: 15, projets: 5 },
    { name: 'Ven', vues: 55, messages: 11, projets: 4 },
    { name: 'Sam', vues: 42, messages: 9, projets: 3 },
    { name: 'Dim', vues: 35, messages: 5, projets: 2 }
  ];

  const serviceDistribution = [
    { name: 'Plomberie', value: 35, color: '#e0692d' },
    { name: 'Électricité', value: 25, color: '#f07e40' },
    { name: 'Chauffage', value: 20, color: '#f4a261' },
    { name: 'Dépannage', value: 15, color: '#e9c46a' },
    { name: 'Conseil', value: 5, color: '#2a9d8f' }
  ];

  const recentActivity = [
    { type: 'view', content: 'Nouveau visiteur sur votre profil', time: '5 min', icon: Eye },
    { type: 'message', content: 'Nouveau message de Marie L.', time: '12 min', icon: MessageSquare },
    { type: 'review', content: 'Nouvel avis 5 étoiles reçu', time: '1h', icon: Star },
    { type: 'project', content: 'Projet "Réparation fuite" terminé', time: '2h', icon: Award },
    { type: 'view', content: '3 nouveaux visiteurs', time: '3h', icon: Users }
  ];

  const refreshStats = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 10),
        totalMessages: prev.totalMessages + Math.floor(Math.random() * 3)
      }));
      setIsLoading(false);
    }, 1000);
  };

  const exportData = () => {
    const data = {
      period: selectedPeriod,
      stats,
      monthlyData,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statistiques-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getChartData = () => {
    return selectedPeriod === 'week' ? weeklyData : monthlyData;
  };

  const StatCard = ({ title, value, change, icon: Icon, color, suffix = '' }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}{suffix}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          {change > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500 ml-2">vs période précédente</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#e0692d] p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Statistiques</h2>
              <p className="text-white text-opacity-80 text-sm">Analysez vos performances</p>
            </div>
            <div className="mt-3 sm:mt-0 flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white text-[#e0692d] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                <Filter size={16} className="mr-1" />
                Filtres
                {showFilters ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
              </button>
              <button
                onClick={refreshStats}
                disabled={isLoading}
                className="bg-white text-[#e0692d] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition-colors duration-200 flex items-center disabled:opacity-50"
              >
                <RefreshCw size={16} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <button
                onClick={exportData}
                className="bg-white text-[#e0692d] px-4 py-2 rounded-md shadow hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                <Download size={16} className="mr-1" />
                Exporter
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="p-4 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]"
                >
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="quarter">Ce trimestre</option>
                  <option value="year">Cette année</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Métrique</label>
                <select className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]">
                  <option value="all">Toutes les métriques</option>
                  <option value="views">Vues uniquement</option>
                  <option value="messages">Messages uniquement</option>
                  <option value="projects">Projets uniquement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comparaison</label>
                <select className="w-full rounded-lg border-gray-300 focus:ring-[#e0692d] focus:border-[#e0692d]">
                  <option value="previous">Période précédente</option>
                  <option value="year">Même période l'an dernier</option>
                  <option value="average">Moyenne générale</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vues du profil"
          value={stats.totalViews.toLocaleString()}
          change={12}
          icon={Eye}
          color="bg-blue-500"
        />
        <StatCard
          title="Messages reçus"
          value={stats.totalMessages}
          change={8}
          icon={MessageSquare}
          color="bg-green-500"
        />
        <StatCard
          title="Note moyenne"
          value={stats.averageRating}
          change={2}
          icon={Star}
          color="bg-yellow-500"
          suffix="/5"
        />
        <StatCard
          title="Taux de conversion"
          value={stats.conversionRate}
          change={-3}
          icon={TrendingUp}
          color="bg-purple-500"
          suffix="%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance mensuelle</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="vues" stackId="1" stroke="#e0692d" fill="#e0692d" fillOpacity={0.6} />
                <Area type="monotone" dataKey="messages" stackId="1" stroke="#f07e40" fill="#f07e40" fillOpacity={0.6} />
                <Area type="monotone" dataKey="projets" stackId="1" stroke="#f4a261" fill="#f4a261" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution des revenus</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}€`, 'Revenus']} />
                <Line type="monotone" dataKey="revenus" stroke="#e0692d" strokeWidth={3} dot={{ fill: '#e0692d', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Service Distribution & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des services</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 bg-[#e0692d] bg-opacity-10 rounded-full mr-4">
                  <activity.icon className="h-5 w-5 text-[#e0692d]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.content}</p>
                  <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Métriques détaillées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#e0692d] bg-opacity-10 rounded-full mx-auto mb-3">
                <Clock className="h-6 w-6 text-[#e0692d]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
              <p className="text-sm text-gray-500">Temps de réponse moyen</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#e0692d] bg-opacity-10 rounded-full mx-auto mb-3">
                <Users className="h-6 w-6 text-[#e0692d]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
              <p className="text-sm text-gray-500">Projets actifs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#e0692d] bg-opacity-10 rounded-full mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-[#e0692d]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()}€</p>
              <p className="text-sm text-gray-500">Revenus totaux</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-[#e0692d] bg-opacity-10 rounded-full mx-auto mb-3">
                <Award className="h-6 w-6 text-[#e0692d]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReviews}</p>
              <p className="text-sm text-gray-500">Avis reçus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;