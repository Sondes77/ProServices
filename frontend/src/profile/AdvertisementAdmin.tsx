import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Check, 
  X, 
  Calendar, 
  Building, 
  Mail, 
  ExternalLink, 
  MessageSquare,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { AdvertisementRequest } from '../utils/types';

const AdvertisementAdmin = () => {
  const [requests, setRequests] = useState<AdvertisementRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<AdvertisementRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<AdvertisementRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, filter, searchTerm]);

  const fetchRequests = async () => {
    try {
      // Simuler un appel API - remplacer par votre vraie API
      const response = await fetch('/api/admin/advertisement-requests', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    if (filter !== 'all') {
      filtered = filtered.filter(req => req.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.contactName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const handleStatusChange = async (requestId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/advertisement-requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ 
          status: newStatus,
          adminNotes: adminNotes 
        })
      });

      if (response.ok) {
        // Mettre à jour la liste
        setRequests(prev => prev.map(req => 
          req.id === requestId 
            ? { ...req, status: newStatus, adminNotes, updatedAt: new Date().toISOString() }
            : req
        ));
        
        setShowModal(false);
        setSelectedRequest(null);
        setAdminNotes('');
        
        // Envoyer l'email de notification
        await sendNotificationEmail(requestId, newStatus);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const sendNotificationEmail = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      await fetch(`/api/admin/advertisement-requests/${requestId}/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: 'En attente',
      approved: 'Approuvée',
      rejected: 'Refusée'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPlacementLabel = (placement: string) => {
    const labels = {
      top: 'Bannière haute',
      sidebar: 'Sidebar',
      bottom: 'Bannière basse'
    };
    return labels[placement as keyof typeof labels] || placement;
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Entreprise', 'Contact', 'Email', 'Emplacement', 'Début', 'Fin', 'Statut'].join(','),
      ...filteredRequests.map(req => [
        new Date(req.createdAt).toLocaleDateString(),
        req.companyName,
        req.contactName,
        req.contactEmail,
        getPlacementLabel(req.placement),
        new Date(req.startDate).toLocaleDateString(),
        new Date(req.endDate).toLocaleDateString(),
        req.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demandes-publicite-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e0692d]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gestion des demandes de publicité</h1>
          
          {/* Filtres et recherche */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvées</option>
                  <option value="rejected">Refusées</option>
                </select>
              </div>
              
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter CSV
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-gray-900">{requests.length}</div>
              <div className="text-gray-600">Total demandes</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-yellow-600">{requests.filter(r => r.status === 'pending').length}</div>
              <div className="text-gray-600">En attente</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'approved').length}</div>
              <div className="text-gray-600">Approuvées</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-2xl font-bold text-red-600">{requests.filter(r => r.status === 'rejected').length}</div>
              <div className="text-gray-600">Refusées</div>
            </div>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emplacement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.companyName}</div>
                          {request.websiteUrl && (
                            <a 
                              href={request.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-[#e0692d] hover:text-[#f07e40] flex items-center"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Site web
                            </a>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{request.contactName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {request.contactEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getPlacementLabel(request.placement)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowModal(true);
                            setAdminNotes(request.adminNotes || '');
                          }}
                          className="text-[#e0692d] hover:text-[#f07e40] flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(request.id, 'approved')}
                              className="text-green-600 hover:text-green-800 flex items-center"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approuver
                            </button>
                            <button
                              onClick={() => handleStatusChange(request.id, 'rejected')}
                              className="text-red-600 hover:text-red-800 flex items-center"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Refuser
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">Aucune demande trouvée</div>
          </div>
        )}
      </div>

      {/* Modal de détail */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#e0692d] p-6 rounded-t-lg">
              <h3 className="text-xl font-semibold text-white">
                Demande de {selectedRequest.companyName}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Informations entreprise</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Entreprise:</strong> {selectedRequest.companyName}</div>
                    <div><strong>Contact:</strong> {selectedRequest.contactName}</div>
                    <div><strong>Email:</strong> {selectedRequest.contactEmail}</div>
                    {selectedRequest.websiteUrl && (
                      <div>
                        <strong>Site web:</strong> 
                        <a 
                          href={selectedRequest.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#e0692d] hover:text-[#f07e40] ml-1"
                        >
                          {selectedRequest.websiteUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Détails publicité</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Emplacement:</strong> {getPlacementLabel(selectedRequest.placement)}</div>
                    <div><strong>Début:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()}</div>
                    <div><strong>Fin:</strong> {new Date(selectedRequest.endDate).toLocaleDateString()}</div>
                    <div><strong>Statut:</strong> {getStatusBadge(selectedRequest.status)}</div>
                  </div>
                </div>
              </div>

              {selectedRequest.bannerImage && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Bannière</h4>
                  <img
                    src={selectedRequest.bannerImage}
                    alt="Bannière publicitaire"
                    className="max-w-full h-auto rounded-lg border"
                  />
                </div>
              )}

              {selectedRequest.message && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Message</h4>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedRequest.message}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes administratives
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e0692d] focus:border-transparent"
                  placeholder="Ajoutez des notes pour cette demande..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Fermer
                </button>
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'rejected')}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Refuser
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedRequest.id, 'approved')}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approuver
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementAdmin;