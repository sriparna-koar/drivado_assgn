
import React, { useState, useEffect } from 'react';
import { Search, Building2, Users, ChevronRight, Plus, X } from 'lucide-react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyId: '',
    parentCompanyId: '',
    role: ''
  });
  const [modalType, setModalType] = useState('user');

  // Fetch all companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleCompanySelect = async (companyId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/companies/${companyId}`);
      const data = await response.json();
      setSelectedCompany(data);
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = modalType === 'user' ? 'users' : 'companies';
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        setShowAddModal(false);
        setFormData({ name: '', email: '', companyId: '', parentCompanyId: '' , role: ''});
        fetchCompanies(); // Refresh companies list
        if (selectedCompany) {
          handleCompanySelect(selectedCompany._id);
        }
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit the form');
    }
  };

  // Rest of the component remains the same until the modal form
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">CompanyHub</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  setModalType('user');
                  setShowAddModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </button>
              <button 
                onClick={() => {
                  setModalType('company');
                  setShowAddModal(true);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Company
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies or users..."
            className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>

        {/* Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div 
                  key={result._id}
                  className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => result.companyId ? null : handleCompanySelect(result._id)}
                >
                  <div className="flex items-center">
                    {result.companyId ? (
                      <Users className="h-6 w-6 text-blue-500 mr-3" />
                    ) : (
                      <Building2 className="h-6 w-6 text-green-500 mr-3" />
                    )}
                    <div>
                      <p className="font-medium">{result.name}</p>
                      {result.email && <p className="text-sm text-gray-500">{result.email}</p>}
                    </div>
                  </div>
                  {!result.companyId && <ChevronRight className="h-5 w-5 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Company Details */}
        {selectedCompany && (
          <div className="bg-white rounded shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedCompany.name}</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Level {selectedCompany.hierarchyLevel}
              </span>
            </div>

            {selectedCompany.users && selectedCompany.users.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Company Users</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCompany.users.map((user) => (
                    <div key={user._id} className="p-4 border rounded bg-gray-50">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-500 mr-2" />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400 mt-1">Role: {user.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Add New {modalType === 'user' ? 'User' : 'Company'}
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {modalType === 'user' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input
                      type="role"
                      required
                      className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <select
                      required
                      className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              {modalType === 'company' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Parent Company (Optional)</label>
                  <select
                    className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                    value={formData.parentCompanyId}
                    onChange={(e) => setFormData({ ...formData, parentCompanyId: e.target.value })}
                  >
                    <option value="">None</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company._id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add {modalType === 'user' ? 'User' : 'Company'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;