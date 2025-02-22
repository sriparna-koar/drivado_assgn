
import React, { useState, useEffect } from 'react';
import { Search, Building2, Users, ChevronRight, Plus, X } from 'lucide-react';
import { TextField, Button, Select, MenuItem, IconButton, Pagination, Paper, Typography, Grid, Container, Box, Modal, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Card, CardContent, Chip, Divider,  CircularProgress, // Added CircularProgress
  Backdrop } from '@mui/material';
import { FilterList as FilterIcon, Business as BusinessIcon, People as PeopleIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
    </div>
  </div>
);
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('user');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const [filters, setFilters] = useState({
    type: 'all',
    role: 'all',
    hierarchyLevel: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Reset page to 1 when searchQuery changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://drivado-assgn.onrender.com/api/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/users/${userId}`);
      const data = await response.json();
      setSelectedCompany(null); // Clear any previously selected company
      setSelectedUser(data); // Set the selected user
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleCompanySelect = async (companyId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/companies/${companyId}`);
      const data = await response.json();
      setSelectedUser(null); // Clear any previously selected user
      setSelectedCompany(data); // Set the selected company
    } catch (error) {
      console.error('Failed to fetch company details:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const filteredResults = searchResults.filter(result => {
    if (filters.type !== 'all' && 
        ((filters.type === 'companies' && result.email) || 
         (filters.type === 'users' && !result.email))) {
      return false;
    }
    if (filters.role !== 'all' && result.role !== filters.role) {
      return false;
    }
    if (filters.hierarchyLevel !== 'all' && 
        result.hierarchyLevel !== parseInt(filters.hierarchyLevel)) {
      return false;
    }
    return true;
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = modalType === 'user' ? 'users' : 'companies';
      const response = await fetch(`https://drivado-assgn.onrender.com/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        // Show success toast
        toast.success(`${modalType === 'user' ? 'User' : 'Company'} added successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        setShowAddModal(false);
        setFormData({ name: '', email: '', companyId: '', parentCompanyId: '', role: '' });
        fetchCompanies();
        if (selectedCompany) {
          handleCompanySelect(selectedCompany._id);
        }
      } else {
        // Show error toast
        toast.error(data.error || 'An error occurred', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Submission failed:', error);
      // Show error toast
      toast.error('Failed to submit the form', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
 
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedResults = filteredResults.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* {isLoading && <LoadingSpinner />} */}
        <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
        open={isLoading}
      >
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Loading...
        </Typography>
      </Backdrop>

      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
            <Grid item>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                Drivado
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('user'); setShowAddModal(true); }}>
                Add User
              </Button>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('company'); setShowAddModal(true); }} sx={{ ml: 2 }}>
                Add Company
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
            {/* Search Section */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <TextField
                    placeholder="Search companies or users..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
                    }}
                    sx={{ width: '400px' }}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setShowFilters(!showFilters)}
                    startIcon={<FilterIcon />}
                    endIcon={showFilters ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  >
                    Filters
                  </Button>
                </Box>
  
                {/* Filters Section */}
                {showFilters && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={filters.type}
                          label="Type"
                          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="companies">Companies</MenuItem>
                          <MenuItem value="users">Users</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
  
            {/* Search Results */}
            {searchQuery && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Search Results ({filteredResults.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {paginatedResults.map((result) => (
                      <Paper
                        key={result._id}
                        elevation={1}
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          '&:hover': { bgcolor: 'action.hover' }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {result.email ? (
                            <PeopleIcon color="action" />
                          ) : (
                            <BusinessIcon color="action" />
                          )}
                          <Box>
                            <Typography variant="subtitle1">{result.name}</Typography>
                            {result.email && (
                              <Typography variant="body2" color="text.secondary">
                                {result.email}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        {result.email ? (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleUserSelect(result._id)}
                          >
                            View Details
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => handleCompanySelect(result._id)}
                          >
                            View Details
                          </Button>
                        )}
                      </Paper>
                    ))}
                  </Box>
  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={page === i + 1 ? "contained" : "outlined"}
                          size="small"
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
  
            {/* Selected Company Details */}
            {selectedCompany && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">{selectedCompany.name}</Typography>
                    <Chip
                      label={`Level ${selectedCompany.hierarchyLevel}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  {selectedCompany.users && selectedCompany.users.length > 0 && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Company Users
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {selectedCompany.users.map((user) => (
                          <Paper
                            key={user._id}
                            elevation={1}
                            sx={{
                              p: 2,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle2">{user.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                            <Chip label={user.role} size="small" />
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}
  
            {/* Selected User Details */}
            {selectedUser && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6">{selectedUser.name}</Typography>
                    <Chip
                      label={`Role: ${selectedUser.role}`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    User Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body1">Email: {selectedUser.email}</Typography>
                    <Typography variant="body1">Role: {selectedUser.role}</Typography>
                    {selectedUser.companyId && (
                      <Typography variant="body1">Company: {selectedUser.companyId.name}</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
          </Box>
  
          {/* Add User/Company Modal */}
          <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Add New {modalType === 'user' ? 'User' : 'Company'}</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                {modalType === 'user' && (
                  <>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Company</InputLabel>
                      <Select
                        value={formData.companyId}
                        onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                      >
                        <MenuItem value="">Select a company</MenuItem>
                        {companies.map((company) => (
                          <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}
                {modalType === 'company' && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Parent Company (Optional)</InputLabel>
                    <Select
                      value={formData.parentCompanyId}
                      onChange={(e) => setFormData({ ...formData, parentCompanyId: e.target.value })}
                    >
                      <MenuItem value="">None</MenuItem>
                      {companies.map((company) => (
                        <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                  Add {modalType === 'user' ? 'User' : 'Company'}
                </Button>
              </form>
            </Box>
          </Modal>
        </Box>
      </Container>
      <Box 
        component="footer" 
        sx={{
          py: 6,
          px: 2,
          mt: 'auto',
          backgroundColor: '#0d47a1', // Dark blue background
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                About Me
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Motivated Computer Science and Engineering Student eager to secure an Internship position to further enhance skills, leverage academic knowledge, and contribute to real-world projects.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                  Developed by Sriparna Koar
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton 
                    href="https://www.linkedin.com/in/sriparna-koar-2a4415289/" 
                    target="_blank"
                    sx={{ color: 'white' }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton 
                    href="https://github.com/sriparna-koar/drivado_assgn" 
                    target="_blank"
                    sx={{ color: 'white' }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton 
                    href="koarsk03@gmail.com"
                    sx={{ color: 'white' }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Key Features
              </Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Advanced User Management System
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Hierarchical Company Structure
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Role-based Access Control
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Real-time Search & Filtering
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    • Detailed Analytics & Reporting
                  </Typography>
                </li>
              </ul>
            </Grid>
  
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Email: koarsk03@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Phone: +91 6290596740
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Address: Kolkata, India
              </Typography>
            </Grid>
          </Grid>
  
          <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
  
          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} Drivado. All rights reserved. Created by Sriparna Kaor
          </Typography>
        </Container>
      </Box>
    </Box>
  );

};

export default App;