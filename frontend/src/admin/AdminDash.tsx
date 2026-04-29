import React, { useEffect, useMemo, useState } from 'react';
import { 
  Users, Activity, MessageSquare, Star, Settings, 
  TrendingUp, AlertTriangle, CheckCircle, Clock, 
  DollarSign, UserPlus, Briefcase, ChevronRight,
  ChevronDown, ChevronUp, Search, Filter, Edit2, Trash2, Save, X,
  Plus, CheckCircle2, ShieldCheck, Zap, Phone, MapPin, 
  Mail, Calendar, Globe, ExternalLink, Edit3,
  ChevronLeft,
  FileText, LogOut
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { urlBase } from "../config.js";
import ServiceForm from '../profile/ServiceForm';
import Swal from 'sweetalert2';

// --- COMPOSANTS AUXILIAIRES ---
const ChatNotifications = () => (
  <div className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
    <MessageSquare className="h-6 w-6" />
    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
  </div>
);

const StatCard = ({ title, value, icon: Icon, color, trend, subtitle = undefined }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {trend && (
          <>
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-bold">{trend}</span>
            <span className="text-gray-400 ml-2">vs mois dernier</span>
          </>
        )}
        {subtitle && <span className="text-gray-400">{subtitle}</span>}
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL ---
const AdminDash = () => {
  const [activeTab, setActiveTab] = useState('overview'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  // États Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  
  // États pour la gestion des services
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ titre: '', categorie: '', prix: '', statut: 'En ligne' });

  // --- DATA : UTILISATEURS ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${urlBase}/utilisateurs`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('admin_token', token);
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, "/admin-dashboard");
    }
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  // --- DATA : SERVICES ---
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  const fetchUserServices = async (userId) => {
    try {
      setLoadingServices(true);
      const response = await fetch(`${urlBase}/pro-service/${userId}`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des services');
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error("Erreur services:", err);
      setServices([]);
    } finally {
      setLoadingServices(false);
    }
  };

  // Fonction pour soumettre le nouveau service à la BDD
  const handleServiceSubmit = async (serviceData: Partial<Service>) => {
    try {
      const isEditing = !!editingService;
      const url = isEditing 
        ? `${urlBase}/services/${editingService.id}` 
        : `${urlBase}/service/${selectedUser.id}`; // Notez le changement d'endpoint pour la création

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          ...serviceData,
          userId: selectedUser.id
        })
      });

      if (response.ok) {
        const result = await response.json();

        // La donnée retournée par le serveur (avec son ID et ses dates)
        const savedService = result.service || result; 
        fetchUserServices(selectedUser.id);

        setShowServiceForm(false);
        setEditingService(null);
        
        // Notification de succès
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: isEditing ? 'Service mis à jour' : 'Service ajouté',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des services:", error);
    }
  };

  const handleSaveService = async () => {
    // Note: Ajoutez ici votre appel API (POST/PUT) pour persister les données
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...serviceForm } : s));
    } else {
      const newService = {
        ...serviceForm,
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : Date.now(),
        professionnel_id: selectedUser.id,
        verified: 0,
        sponsored: 0
      };
      setServices([...services, newService]);
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    const token = localStorage.getItem("token");
    alert ("Suppression du service ID: " + serviceToDelete); // Debug
    alert ("Token utilisé: " + token); // Debug
    const res = await fetch(`${urlBase}/service/${serviceToDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: selectedUser.id }) // Si votre backend attend un body, sinon retirez cette ligne
    });
    if (res.ok) {
      setServices(prev => prev.filter(s => s.id !== serviceToDelete));
    }
    setShowDeleteModal(false);
    setServiceToDelete(null);
  };
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserServices(user.id);
  };
  const [isEditingApropos, setIsEditingApropos] = useState(false);
  const [tempApropos, setTempApropos] = useState('');

  // Mettre à jour tempApropos quand selectedUser change
  useEffect(() => {
    if (selectedUser) {
      setTempApropos(selectedUser.apropos || '');
      setIsEditingApropos(false);
    }
  }, [selectedUser]);

  const handleSaveApropos = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apropos: tempApropos })
      });

      if (response.ok) {
        // 1. Créer l'objet utilisateur mis à jour
        const updatedUser = { ...selectedUser, apropos: tempApropos };

        // 2. Mettre à jour l'utilisateur sélectionné (le panneau latéral)
        setSelectedUser(updatedUser);

        // 3. Mettre à jour la liste principale (le tableau)
        // On remplace l'ancien utilisateur par le nouveau dans l'array 'users'
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === selectedUser.id ? updatedUser : user
          )
        );

        setIsEditingApropos(false);
        // Optionnel : Alerte de succès
        // toast.success("Description mise à jour !"); 
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  // --- FILTRAGE & PAGINATION ---
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.nom?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
      (u.metier?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (u.ville?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  // --- DATA : GRAPHIQUES (Simulées) ---
  const userActivityData = [
    { name: 'Jan', users: 400, professionals: 240 },
    { name: 'Feb', users: 500, professionals: 280 },
    { name: 'Mar', users: 600, professionals: 320 },
    { name: 'Apr', users: 800, professionals: 380 },
    { name: 'May', users: 1000, professionals: 450 },
  ];

  const serviceDistributionData = [
    { name: 'Plomberie', value: 30 },
    { name: 'Électricité', value: 25 },
    { name: 'Menuiserie', value: 20 },
    { name: 'Peinture', value: 15 },
    { name: 'Autres', value: 10 },
  ];

  const COLORS = ['#e0692d', '#f07e40', '#f4a261', '#e9c46a', '#2a9d8f'];

  const handleLogout = () => {
    localStorage.clear(); // Nettoie le token et la session
    window.location.href = '/login'; // Redirection brute pour réinitialiser l'état complet
  };

  // --- RENDU : VUE D'ENSEMBLE ---
  const renderOverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard title="Utilisateurs totaux" value="12,345" icon={Users} color="blue" trend="+12%" />
         <StatCard title="Professionnels" value={users.length} icon={Briefcase} color="orange" trend="+8%" />
         <StatCard title="Revenu mensuel" value="€156,789" icon={DollarSign} color="green" trend="+15%" />
         <StatCard title="Note moyenne" value="4.8" icon={Star} color="yellow" subtitle="8,567 avis" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Évolution des utilisateurs</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="professionals" stroke="#e0692d" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Distribution des services</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceDistributionData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {serviceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDU : GESTION UTILISATEURS ---
  const renderUsersSection = () => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-white">
        <div>
            <h3 className="text-xl font-bold text-slate-800">Base des Professionnels</h3>
            <p className="text-xs text-slate-500 mt-1">{filteredUsers.length} résultats trouvés</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1">
             <span className="text-xs font-bold text-slate-400 mr-2 uppercase">Afficher:</span>
             <select 
                value={itemsPerPage} 
                onChange={(e) => {setItemsPerPage(Number(e.target.value)); setCurrentPage(1);}}
                className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
             >
                <option value={15}>15</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
             </select>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition text-sm"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        {loading ? (
            <div className="p-20 text-center text-slate-400">Chargement des données...</div>
        ) : (
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-widest font-semibold">
                <tr>
                <th className="px-6 py-4">Profil</th>
                <th className="px-6 py-4">Métier / Ville</th>
                <th className="px-6 py-4">Disponibilité</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleUserClick(user)}>
                    <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3 border border-orange-200 uppercase">
                        {user.prenom?.[0] || '?'}{user.nom?.[0] || '?'}
                        </div>
                        <div>
                        <div className="font-semibold text-slate-800">{user.prenom} {user.nom}</div>
                        <div className="text-xs text-slate-400 font-mono">{user.email}</div>
                        </div>
                    </div>
                    </td>
                    <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700">{user.category || 'Non défini'}</div>
                    <div className="text-xs text-slate-500 flex items-center"><MapPin className="h-3 w-3 mr-1" />{[user.ville, user.region].filter(Boolean).join(', ') || 'NC'}</div>
                    </td>
                    <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        <Clock className="h-3 w-3 mr-1" /> {user.availability || 'Sur RDV'}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    {user.email_verified ? 
                        <span className="text-green-600 flex items-center text-xs font-bold uppercase tracking-tighter"><CheckCircle2 className="h-4 w-4 mr-1" /> Vérifié</span> :
                        <span className="text-amber-500 flex items-center text-xs font-bold uppercase tracking-tighter italic"><AlertTriangle className="h-4 w-4 mr-1" /> Attente</span>
                    }
                    </td>
                    <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-lg transition">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        {!loading && currentUsers.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium">Aucun professionnel ne correspond à votre recherche.</div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Page {currentPage} sur {totalPages || 1}
        </span>
        <div className="flex space-x-2">
            <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 transition"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 transition"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky h-screen top-0 z-40">
        <div className="p-6">
          <h2 className="text-2xl font-black tracking-tighter text-orange-500 uppercase italic">SERVICEPRO.TN</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Activity className="h-5 w-5 mr-3" /> Vue d'ensemble
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Users className="h-5 w-5 mr-3" /> Utilisateurs & Services
          </button>
          <div className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-10 border-t border-slate-800">Configuration</div>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors">
            <Settings className="h-5 w-5 mr-3" /> Paramètres site
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-xl font-bold text-slate-800">
            {activeTab === 'overview' ? 'Tableau de bord stratégique' : 'Gestion des Professionnels & Services'}
          </h1>
          <div className="flex items-center space-x-6">
            <ChatNotifications />
            
            <div className="flex items-center space-x-4 border-l pl-6 border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">Admin Founder</p>
                  <p className="text-xs text-slate-500">Super Admin</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-orange-500 overflow-hidden shadow-inner flex items-center justify-center">
                  {/* Tu peux mettre une image ici ou garder un style neutre */}
                  <span className="text-orange-600 font-bold">AF</span>
                </div>
              </div>

              {/* Bouton Déconnexion */}
              <button 
                onClick={handleLogout}
                className="ml-2 p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" /> {error}
            </div>
          )}
          {activeTab === 'overview' ? renderOverviewSection() : renderUsersSection()}
        </main>
      </div>

      {/* MODAL SERVICE */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsServiceModalOpen(false)} />
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-2xl">
            <h4 className="text-xl font-black mb-6 text-slate-900">{editingService ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Titre du service</label>
                <input 
                  type="text" value={serviceForm.titre} 
                  onChange={(e) => setServiceForm({...serviceForm, titre: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" 
                  placeholder="Ex: Installation de robinet"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Catégorie</label>
                  <input 
                    type="text" value={serviceForm.categorie} 
                    onChange={(e) => setServiceForm({...serviceForm, categorie: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1 ml-1">Prix</label>
                  <input 
                    type="text" value={serviceForm.prix} 
                    onChange={(e) => setServiceForm({...serviceForm, prix: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                </div>
              </div>
              <button 
                onClick={handleSaveService}
                className="w-full py-4 bg-orange-600 text-white font-black rounded-xl hover:bg-orange-700 transition mt-4 uppercase tracking-widest text-xs"
              >
                {editingService ? 'Sauvegarder les changements' : 'Créer le service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER (FICHE PRO) */}
      <div className={`fixed inset-0 overflow-hidden z-50 transition-opacity duration-500 ${selectedUser ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
        <div className={`absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedUser ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedUser && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Détails du Professionnel</h3>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white border border-slate-100"><X className="h-5 w-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Profil Header & Contact */}
                <section>
                  <div className="flex items-center space-x-5 mb-6">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-orange-200 uppercase">
                      {selectedUser.prenom?.[0] || 'P'}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900">{selectedUser.prenom} {selectedUser.nom}</h4>
                      <div className="flex items-center mt-1">
                        <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-sm">{selectedUser.category || 'Pro'}</span>
                        <span className="ml-3 text-slate-400 text-sm flex items-center"><MapPin className="h-3 w-3 mr-1" /> {[selectedUser.ville, selectedUser.region].filter(Boolean).join(', ') || 'NC'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center text-sm font-medium text-slate-600">
                      <Mail className="h-4 w-4 mr-3 text-orange-500 shrink-0" /> <span className="truncate">{selectedUser.email}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center text-sm font-medium text-slate-600">
                      <Phone className="h-4 w-4 mr-3 text-orange-500 shrink-0" /> {selectedUser.phone || 'Non renseigné'}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center text-sm font-medium text-slate-600 col-span-2">
                      <Calendar className="h-4 w-4 mr-3 text-orange-500" /> Membre depuis le {selectedUser.date_creation ? new Date(selectedUser.date_creation).toLocaleDateString() : 'NC'}
                    </div>
                  </div>
                </section>

                {/* --- SECTION À PROPOS AJOUTÉE --- */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold text-lg flex items-center text-slate-800">
                      <FileText className="mr-2 text-orange-500 h-5 w-5" /> 
                      À propos
                    </h5>
                    {!isEditingApropos ? (
                      <button 
                        onClick={() => setIsEditingApropos(true)}
                        className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center bg-orange-50 px-3 py-1.5 rounded-lg transition"
                      >
                        <Edit2 className="h-3 w-3 mr-1" /> Modifier
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveApropos}
                          className="text-xs font-bold text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg transition flex items-center"
                        >
                          <Save className="h-3 w-3 mr-1" /> Enregistrer
                        </button>
                        <button 
                          onClick={() => { setIsEditingApropos(false); setTempApropos(selectedUser.apropos || ''); }}
                          className="text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
                        >
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all ${isEditingApropos ? 'bg-white border-orange-300 ring-4 ring-orange-50' : 'bg-slate-50 border-slate-100'}`}>
                    {isEditingApropos ? (
                      <textarea
                        value={tempApropos}
                        onChange={(e) => setTempApropos(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-600 text-sm leading-relaxed min-h-[120px] resize-none"
                        placeholder="Décrivez le professionnel..."
                        autoFocus
                      />
                    ) : (
                      <p className="text-slate-600 leading-relaxed text-sm italic">
                        {selectedUser.apropos || "Aucune description fournie par le professionnel."}
                      </p>
                    )}
                  </div>
                </section>
                {/* ------------------------------- */}

                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h5 className="font-bold text-lg flex items-center text-slate-800">
                      <Briefcase className="mr-2 text-orange-500 h-5 w-5" /> 
                      Services Proposés ({services.length})
                    </h5>
                    <button 
                      onClick={() => {
                        setEditingService(null); // Reset pour un nouvel ajout
                        setShowServiceForm(true);
                      }}
                      className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center hover:bg-orange-600 transition shadow-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Ajouter Service
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {loadingServices ? (
                      <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
                        Chargement des services...
                      </div>
                    ) : services.length > 0 ? (
                      <div className="space-y-4">
                        {services.map(service => (
                          <div key={service.id} className="border border-slate-200 rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                {/* Header: Titre + Badges */}
                                <div className="flex items-center gap-3 mb-2">
                                  <h6 className="font-black text-slate-900 text-xl tracking-tight">{service.titre}</h6>
                                  <div className="flex gap-1">
                                    {service.verified === 1 && (
                                      <span className="bg-blue-50 text-blue-600 p-1 rounded-full" title="Vérifié">
                                        <ShieldCheck className="h-4 w-4" />
                                      </span>
                                    )}
                                    {service.sponsored === 1 && (
                                      <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase flex items-center">
                                        <Zap className="h-3 w-3 mr-1" /> Sponsorisé
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Catégories & Métier */}
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                                    {service.categorie}
                                  </span>
                                  <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                    {service.metier}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed italic">
                                  {service.description || "Aucune description détaillée."}
                                </p>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-slate-50 pt-4">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prix</span>
                                    <span className="text-lg font-black text-orange-600">{service.prix} DT</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Statut</span>
                                    <span className={`text-xs font-bold flex items-center mt-1 ${service.statut === 'active' ? 'text-green-600' : 'text-slate-400'}`}>
                                      <span className={`h-2 w-2 rounded-full mr-2 ${service.statut === 'active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                      {service.statut === 'active' ? 'En ligne' : 'Inactif'}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disponibilité</span>
                                    <span className="text-xs font-bold text-slate-700 flex items-center mt-1">
                                      <Clock className="h-3 w-3 mr-1 text-slate-400" /> {service.availability || 'NC'}
                                    </span>
                                  </div>
                                </div>

                                {/* Dates */}
                                <div className="mt-4 flex items-center gap-4 text-[10px] text-slate-400 font-medium">
                                  <span className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" /> Créé le : {new Date(service.date_creation).toLocaleDateString()}
                                  </span>
                                  {service.date_modification && (
                                    <span className="flex items-center">
                                      <Edit2 className="h-3 w-3 mr-1" /> Mis à jour : {new Date(service.date_modification).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-col space-y-2 ml-4">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingService(service);
                                    setShowServiceForm(true);
                                  }}
                                  className="p-3 bg-slate-50 hover:bg-orange-50 rounded-2xl text-slate-400 hover:text-orange-600 transition border border-transparent hover:border-orange-100"
                                >
                                  <Edit3 className="h-5 w-5" />
                                </button>
                                <button 
                                  onClick={(e) => handleDeleteService(service.id, e)}
                                  className="p-3 bg-slate-50 hover:bg-red-50 rounded-2xl text-slate-400 hover:text-red-600 transition border border-transparent hover:border-red-100"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                        <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 font-bold">Aucun service disponible</p>
                        <p className="text-slate-400 text-sm mt-1">Ce professionnel n'a pas encore listé de services.</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white flex space-x-3">
                <button 
                    onClick={() => { /* Logique validation pro */ setSelectedUser(null); }}
                    className="flex-1 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition shadow-xl shadow-orange-200 uppercase tracking-widest text-xs"
                >
                  Valider le profil
                </button>
                <button className="px-6 py-4 border-2 border-slate-100 text-slate-400 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition uppercase tracking-widest text-xs">
                  Bannir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer ce service ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showServiceForm && (
        <ServiceForm 
          service={editingService} 
          onCancel={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
          onSubmit={handleServiceSubmit}
        />
      )}
    </div>
  );
};

export default AdminDash;