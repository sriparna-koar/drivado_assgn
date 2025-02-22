
// import React, { useState, useEffect } from 'react';
// import { Search, Building2, Users, ChevronRight, Plus, X } from 'lucide-react';

// const App = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     companyId: '',
//     parentCompanyId: '',
//     role: ''
//   });
//   const [modalType, setModalType] = useState('user');

//   // Fetch all companies on component mount
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch('https://drivado-assgn.onrender.com/api/companies');
//       const data = await response.json();
//       setCompanies(data);
//     } catch (error) {
//       console.error('Failed to fetch companies:', error);
//     }
//   };
//   // http://localhost:5000
//   const handleSearch = async (query) => {
//     try {
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/search?query=${query}`);
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error('Search failed:', error);
//     }
//   };

//   const handleCompanySelect = async (companyId) => {
//     try {
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/companies/${companyId}`);
//       const data = await response.json();
//       setSelectedCompany(data);
//     } catch (error) {
//       console.error('Failed to fetch company details:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = modalType === 'user' ? 'users' : 'companies';
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
      
//       if (response.ok) {
//         setShowAddModal(false);
//         setFormData({ name: '', email: '', companyId: '', parentCompanyId: '' , role: ''});
//         fetchCompanies(); // Refresh companies list
//         if (selectedCompany) {
//           handleCompanySelect(selectedCompany._id);
//         }
//       } else {
//         alert(data.error || 'An error occurred');
//       }
//     } catch (error) {
//       console.error('Submission failed:', error);
//       alert('Failed to submit the form');
//     }
//   };

//   // Rest of the component remains the same until the modal form
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <Building2 className="h-8 w-8 text-blue-600" />
//                 <span className="ml-2 text-xl font-bold text-gray-800">CompanyHub</span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={() => {
//                   setModalType('user');
//                   setShowAddModal(true);
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add User
//               </button>
//               <button 
//                 onClick={() => {
//                   setModalType('company');
//                   setShowAddModal(true);
//                 }}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Company
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search Bar */}
//         <div className="relative max-w-xl mx-auto mb-8">
//           <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search companies or users..."
//             className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               handleSearch(e.target.value);
//             }}
//           />
//         </div>

//         {/* Search Results */}
//         {searchQuery && searchResults.length > 0 && (
//           <div className="bg-white rounded shadow p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//             <div className="space-y-4">
//               {searchResults.map((result) => (
//                 <div 
//                   key={result._id}
//                   className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
//                   onClick={() => result.companyId ? null : handleCompanySelect(result._id)}
//                 >
//                   <div className="flex items-center">
//                     {result.companyId ? (
//                       <Users className="h-6 w-6 text-blue-500 mr-3" />
//                     ) : (
//                       <Building2 className="h-6 w-6 text-green-500 mr-3" />
//                     )}
//                     <div>
//                       <p className="font-medium">{result.name}</p>
//                       {result.email && <p className="text-sm text-gray-500">{result.email}</p>}
//                     </div>
//                   </div>
//                   {!result.companyId && <ChevronRight className="h-5 w-5 text-gray-400" />}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Selected Company Details */}
//         {selectedCompany && (
//           <div className="bg-white rounded shadow p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">{selectedCompany.name}</h2>
//               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                 Level {selectedCompany.hierarchyLevel}
//               </span>
//             </div>

//             {selectedCompany.users && selectedCompany.users.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-4">Company Users</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {selectedCompany.users.map((user) => (
//                     <div key={user._id} className="p-4 border rounded bg-gray-50">
//                       <div className="flex items-center">
//                         <Users className="h-5 w-5 text-gray-500 mr-2" />
//                         <div>
//                           <p className="font-medium">{user.name}</p>
//                           <p className="text-sm text-gray-500">{user.email}</p>
//                           <p className="text-xs text-gray-400 mt-1">Role: {user.role}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Add Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">
//                 Add New {modalType === 'user' ? 'User' : 'Company'}
//               </h3>
//               <button onClick={() => setShowAddModal(false)}>
//                 <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 />
//               </div>
//               {modalType === 'user' && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Email</label>
//                     <input
//                       type="email"
//                       required
//                       className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Role</label>
//                     <input
//                       type="role"
//                       required
//                       className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
//                       value={formData.role}
//                       onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Company</label>
//                     <select
//                       required
//                       className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
//                       value={formData.companyId}
//                       onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
//                     >
//                       <option value="">Select a company</option>
//                       {companies.map((company) => (
//                         <option key={company._id} value={company._id}>
//                           {company.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </>
//               )}
//               {modalType === 'company' && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Parent Company (Optional)</label>
//                   <select
//                     className="mt-1 block w-full rounded border shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
//                     value={formData.parentCompanyId}
//                     onChange={(e) => setFormData({ ...formData, parentCompanyId: e.target.value })}
//                   >
//                     <option value="">None</option>
//                     {companies.map((company) => (
//                       <option key={company._id} value={company._id}>
//                         {company.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Add {modalType === 'user' ? 'User' : 'Company'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';
// import { Search, Building2, Users, ChevronRight, Plus, X } from 'lucide-react';
// import { TextField, Button, Select, MenuItem, IconButton, Pagination, Paper, Typography, Grid, Container, Box, Modal, FormControl, InputLabel } from '@mui/material';
// import { Search as SearchIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
// import { 

//   Card, 
//   CardContent, 
//   Chip,
//   Divider,
// } from '@mui/material';
// import {

//   FilterList as FilterIcon,
//   Business as BusinessIcon,
//   People as PeopleIcon,
//   KeyboardArrowDown as KeyboardArrowDownIcon,
//   KeyboardArrowUp as KeyboardArrowUpIcon
// } from '@mui/icons-material';
// const App = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     companyId: '',
//     parentCompanyId: '',
//     role: ''
//   });
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [modalType, setModalType] = useState('user');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 5;
//   const [filters, setFilters] = useState({
//     type: 'all',
//     role: 'all',
//     hierarchyLevel: 'all'
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       const response = await fetch('https://drivado-assgn.onrender.com/api/companies');
//       const data = await response.json();
//       setCompanies(data);
//     } catch (error) {
//       console.error('Failed to fetch companies:', error);
//     }
//   };

//   const handleSearch = async (query) => {
//     try {
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/search?query=${query}`);
//       const data = await response.json();
//       setSearchResults(data);
//       setPage(1);
//     } catch (error) {
//       console.error('Search failed:', error);
//     }
//   };
//   const handleUserSelect = async (userId) => {
//     try {
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/users/${userId}`);
//       const data = await response.json();
//       setSelectedCompany(null); // Clear any previously selected company
//       setSelectedUser(data); // Set the selected user
//     } catch (error) {
//       console.error('Failed to fetch user details:', error);
//     }
//   };
//   const handleCompanySelect = async (companyId) => {
//     try {
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/companies/${companyId}`);
//       const data = await response.json();
//       setSelectedCompany(data);
//     } catch (error) {
//       console.error('Failed to fetch company details:', error);
//     }
//   };
//   const filteredResults = searchResults.filter(result => {
//     if (filters.type !== 'all' && 
//         ((filters.type === 'companies' && result.email) || 
//          (filters.type === 'users' && !result.email))) {
//       return false;
//     }
//     if (filters.role !== 'all' && result.role !== filters.role) {
//       return false;
//     }
//     if (filters.hierarchyLevel !== 'all' && 
//         result.hierarchyLevel !== parseInt(filters.hierarchyLevel)) {
//       return false;
//     }
//     return true;
//   });
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = modalType === 'user' ? 'users' : 'companies';
//       const response = await fetch(`https://drivado-assgn.onrender.com/api/${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
      
//       if (response.ok) {
//         setShowAddModal(false);
//         setFormData({ name: '', email: '', companyId: '', parentCompanyId: '' , role: ''});
//         fetchCompanies();
//         if (selectedCompany) {
//           handleCompanySelect(selectedCompany._id);
//         }
//       } else {
//         alert(data.error || 'An error occurred');
//       }
//     } catch (error) {
//       console.error('Submission failed:', error);
//       alert('Failed to submit the form');
//     }
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const paginatedResults = filteredResults.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   const totalPages = Math.ceil(filteredResults.length / itemsPerPage);


//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
//           <Grid item>
//             <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
//               CompanyHub
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('user'); setShowAddModal(true); }}>
//               Add User
//             </Button>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('company'); setShowAddModal(true); }} sx={{ ml: 2 }}>
//               Add Company
//             </Button>
//           </Grid>
//         </Grid>
//         <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
//       {/* Search Section */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <TextField
//               placeholder="Search companies or users..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 handleSearch(e.target.value);
//               }}
//               InputProps={{
//                 startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
//               }}
//               sx={{ width: '400px' }}
//             />
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => setShowFilters(!showFilters)}
//               startIcon={<FilterIcon />}
//               endIcon={showFilters ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             >
//               Filters
//             </Button>
//           </Box>

//           {/* Filters Section */}
//           {showFilters && (
//             <>
//               <Divider sx={{ my: 2 }} />
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <FormControl size="small" sx={{ minWidth: 120 }}>
//                   <InputLabel>Type</InputLabel>
//                   <Select
//                     value={filters.type}
//                     label="Type"
//                     onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//                   >
//                     <MenuItem value="all">All</MenuItem>
//                     <MenuItem value="companies">Companies</MenuItem>
//                     <MenuItem value="users">Users</MenuItem>
//                   </Select>
//                 </FormControl>

            
//               </Box>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Search Results */}
//       {searchQuery && (
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Search Results ({filteredResults.length})
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
     
//               {paginatedResults.map((result) => (
//   <Paper
//     key={result._id}
//     elevation={1}
//     sx={{
//       p: 2,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       '&:hover': { bgcolor: 'action.hover' }
//     }}
//   >
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//       {result.email ? (
//         <PeopleIcon color="action" />
//       ) : (
//         <BusinessIcon color="action" />
//       )}
//       <Box>
//         <Typography variant="subtitle1">{result.name}</Typography>
//         {result.email && (
//           <Typography variant="body2" color="text.secondary">
//             {result.email}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//     {result.email ? (
//       <Button
//         variant="text"
//         size="small"
//         onClick={() => handleUserSelect(result._id)}
//       >
//         View Details
//       </Button>
//     ) : (
//       <Button
//         variant="text"
//         size="small"
//         onClick={() => handleCompanySelect(result._id)}
//       >
//         View Details
//       </Button>
//     )}
//   </Paper>
// ))}
//             </Box>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i + 1}
//                     variant={page === i + 1 ? "contained" : "outlined"}
//                     size="small"
//                     onClick={() => setPage(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {/* Selected Company Details */}
//       {selectedCompany && (
//         <Card>
//           <CardContent>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//               <Typography variant="h6">{selectedCompany.name}</Typography>
//               <Chip
//                 label={`Level ${selectedCompany.hierarchyLevel}`}
//                 color="primary"
//                 variant="outlined"
//               />
//             </Box>
//             {selectedCompany.users && selectedCompany.users.length > 0 && (
//               <Box>
//                 <Typography variant="subtitle1" sx={{ mb: 2 }}>
//                   Company Users
//                 </Typography>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                   {selectedCompany.users.map((user) => (
//                     <Paper
//                       key={user._id}
//                       elevation={1}
//                       sx={{
//                         p: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                       }}
//                     >
//                       <Box>
//                         <Typography variant="subtitle2">{user.name}</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {user.email}
//                         </Typography>
//                       </Box>
//                       <Chip label={user.role} size="small" />
//                     </Paper>
//                   ))}
//                 </Box>
//               </Box>
//             )}
//           </CardContent>
//         </Card>
//       )}
//       {selectedUser && (
//   <Card>
//     <CardContent>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h6">{selectedUser.name}</Typography>
//         <Chip
//           label={`Role: ${selectedUser.role}`}
//           color="primary"
//           variant="outlined"
//         />
//       </Box>
//       <Typography variant="subtitle1" sx={{ mb: 2 }}>
//         User Details
//       </Typography>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <Typography variant="body1">Email: {selectedUser.email}</Typography>
//         <Typography variant="body1">Role: {selectedUser.role}</Typography>
//         {selectedUser.companyId && (
//           <Typography variant="body1">Company: {selectedUser.companyId.name}</Typography>
//         )}
//       </Box>
//     </CardContent>
//   </Card>
// )}
//     </Box>
     

//         <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
//           <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>Add New {modalType === 'user' ? 'User' : 'Company'}</Typography>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 sx={{ mb: 2 }}
//               />
//               {modalType === 'user' && (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     sx={{ mb: 2 }}
//                   />
//                   <TextField
//                     fullWidth
//                     label="Role"
//                     value={formData.role}
//                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                     sx={{ mb: 2 }}
//                   />
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel>Company</InputLabel>
//                     <Select
//                       value={formData.companyId}
//                       onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
//                     >
//                       <MenuItem value="">Select a company</MenuItem>
//                       {companies.map((company) => (
//                         <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </>
//               )}
//               {modalType === 'company' && (
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel>Parent Company (Optional)</InputLabel>
//                   <Select
//                     value={formData.parentCompanyId}
//                     onChange={(e) => setFormData({ ...formData, parentCompanyId: e.target.value })}
//                   >
//                     <MenuItem value="">None</MenuItem>
//                     {companies.map((company) => (
//                       <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               )}
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//                 Add {modalType === 'user' ? 'User' : 'Company'}
//               </Button>
//             </form>
//           </Box>
//         </Modal>
//       </Box>
//     </Container>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { Search, Building2, Users, ChevronRight, Plus, X } from 'lucide-react';
import { TextField, Button, Select, MenuItem, IconButton, Pagination, Paper, Typography, Grid, Container, Box, Modal, FormControl, InputLabel } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { Card, CardContent, Chip, Divider } from '@mui/material';
import { FilterList as FilterIcon, Business as BusinessIcon, People as PeopleIcon, KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    try {
      const response = await fetch('https://drivado-assgn.onrender.com/api/companies');
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/search?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/users/${userId}`);
      const data = await response.json();
      setSelectedCompany(null); // Clear any previously selected company
      setSelectedUser(data); // Set the selected user
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleCompanySelect = async (companyId) => {
    try {
      const response = await fetch(`https://drivado-assgn.onrender.com/api/companies/${companyId}`);
      const data = await response.json();
      setSelectedUser(null); // Clear any previously selected user
      setSelectedCompany(data); // Set the selected company
    } catch (error) {
      console.error('Failed to fetch company details:', error);
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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const endpoint = modalType === 'user' ? 'users' : 'companies';
  //     const response = await fetch(`https://drivado-assgn.onrender.com/api/${endpoint}`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await response.json();
      
  //     if (response.ok) {
  //       setShowAddModal(false);
  //       setFormData({ name: '', email: '', companyId: '', parentCompanyId: '' , role: ''});
  //       fetchCompanies();
  //       if (selectedCompany) {
  //         handleCompanySelect(selectedCompany._id);
  //       }
  //     } else {
  //       alert(data.error || 'An error occurred');
  //     }
  //   } catch (error) {
  //     console.error('Submission failed:', error);
  //     alert('Failed to submit the form');
  //   }
  // };

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
  // return (
  //   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  //   <Container maxWidth="lg">
  //     <Box sx={{ flexGrow: 1 }}>
  //       <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>
  //         <Grid item>
  //           <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
  //             Drivado
  //           </Typography>
  //         </Grid>
  //         <Grid item>
  //           <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('user'); setShowAddModal(true); }}>
  //             Add User
  //           </Button>
  //           <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setModalType('company'); setShowAddModal(true); }} sx={{ ml: 2 }}>
  //             Add Company
  //           </Button>
  //         </Grid>
  //       </Grid>
  //       <Box sx={{ p: 4, maxWidth: '1000px', mx: 'auto' }}>
  //         {/* Search Section */}
  //         <Card sx={{ mb: 3 }}>
  //           <CardContent>
  //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
  //               <TextField
  //                 placeholder="Search companies or users..."
  //                 value={searchQuery}
  //                 onChange={(e) => {
  //                   setSearchQuery(e.target.value);
  //                   handleSearch(e.target.value);
  //                 }}
  //                 InputProps={{
  //                   startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
  //                 }}
  //                 sx={{ width: '400px' }}
  //               />
  //               <Button
  //                 variant="outlined"
  //                 size="small"
  //                 onClick={() => setShowFilters(!showFilters)}
  //                 startIcon={<FilterIcon />}
  //                 endIcon={showFilters ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
  //               >
  //                 Filters
  //               </Button>
  //             </Box>

  //             {/* Filters Section */}
  //             {showFilters && (
  //               <>
  //                 <Divider sx={{ my: 2 }} />
  //                 <Box sx={{ display: 'flex', gap: 2 }}>
  //                   <FormControl size="small" sx={{ minWidth: 120 }}>
  //                     <InputLabel>Type</InputLabel>
  //                     <Select
  //                       value={filters.type}
  //                       label="Type"
  //                       onChange={(e) => setFilters({ ...filters, type: e.target.value })}
  //                     >
  //                       <MenuItem value="all">All</MenuItem>
  //                       <MenuItem value="companies">Companies</MenuItem>
  //                       <MenuItem value="users">Users</MenuItem>
  //                     </Select>
  //                   </FormControl>
  //                 </Box>
  //               </>
  //             )}
  //           </CardContent>
  //         </Card>

  //         {/* Search Results */}
  //         {searchQuery && (
  //           <Card sx={{ mb: 3 }}>
  //             <CardContent>
  //               <Typography variant="h6" sx={{ mb: 2 }}>
  //                 Search Results ({filteredResults.length})
  //               </Typography>
  //               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //                 {paginatedResults.map((result) => (
  //                   <Paper
  //                     key={result._id}
  //                     elevation={1}
  //                     sx={{
  //                       p: 2,
  //                       display: 'flex',
  //                       justifyContent: 'space-between',
  //                       alignItems: 'center',
  //                       '&:hover': { bgcolor: 'action.hover' }
  //                     }}
  //                   >
  //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //                       {result.email ? (
  //                         <PeopleIcon color="action" />
  //                       ) : (
  //                         <BusinessIcon color="action" />
  //                       )}
  //                       <Box>
  //                         <Typography variant="subtitle1">{result.name}</Typography>
  //                         {result.email && (
  //                           <Typography variant="body2" color="text.secondary">
  //                             {result.email}
  //                           </Typography>
  //                         )}
  //                       </Box>
  //                     </Box>
  //                     {result.email ? (
  //                       <Button
  //                         variant="text"
  //                         size="small"
  //                         onClick={() => handleUserSelect(result._id)}
  //                       >
  //                         View Details
  //                       </Button>
  //                     ) : (
  //                       <Button
  //                         variant="text"
  //                         size="small"
  //                         onClick={() => handleCompanySelect(result._id)}
  //                       >
  //                         View Details
  //                       </Button>
  //                     )}
  //                   </Paper>
  //                 ))}
  //               </Box>

  //               {/* Pagination */}
  //               {totalPages > 1 && (
  //                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 1 }}>
  //                   {Array.from({ length: totalPages }, (_, i) => (
  //                     <Button
  //                       key={i + 1}
  //                       variant={page === i + 1 ? "contained" : "outlined"}
  //                       size="small"
  //                       onClick={() => setPage(i + 1)}
  //                     >
  //                       {i + 1}
  //                     </Button>
  //                   ))}
  //                 </Box>
  //               )}
  //             </CardContent>
  //           </Card>
  //         )}

  //         {/* Selected Company Details */}
  //         {selectedCompany && (
  //           <Card>
  //             <CardContent>
  //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  //                 <Typography variant="h6">{selectedCompany.name}</Typography>
  //                 <Chip
  //                   label={`Level ${selectedCompany.hierarchyLevel}`}
  //                   color="primary"
  //                   variant="outlined"
  //                 />
  //               </Box>
  //               {selectedCompany.users && selectedCompany.users.length > 0 && (
  //                 <Box>
  //                   <Typography variant="subtitle1" sx={{ mb: 2 }}>
  //                     Company Users
  //                   </Typography>
  //                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //                     {selectedCompany.users.map((user) => (
  //                       <Paper
  //                         key={user._id}
  //                         elevation={1}
  //                         sx={{
  //                           p: 2,
  //                           display: 'flex',
  //                           justifyContent: 'space-between',
  //                           alignItems: 'center'
  //                         }}
  //                       >
  //                         <Box>
  //                           <Typography variant="subtitle2">{user.name}</Typography>
  //                           <Typography variant="body2" color="text.secondary">
  //                             {user.email}
  //                           </Typography>
  //                         </Box>
  //                         <Chip label={user.role} size="small" />
  //                       </Paper>
  //                     ))}
  //                   </Box>
  //                 </Box>
  //               )}
  //             </CardContent>
  //           </Card>
  //         )}

  //         {/* Selected User Details */}
  //         {selectedUser && (
  //           <Card>
  //             <CardContent>
  //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  //                 <Typography variant="h6">{selectedUser.name}</Typography>
  //                 <Chip
  //                   label={`Role: ${selectedUser.role}`}
  //                   color="primary"
  //                   variant="outlined"
  //                 />
  //               </Box>
  //               <Typography variant="subtitle1" sx={{ mb: 2 }}>
  //                 User Details
  //               </Typography>
  //               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //                 <Typography variant="body1">Email: {selectedUser.email}</Typography>
  //                 <Typography variant="body1">Role: {selectedUser.role}</Typography>
  //                 {selectedUser.companyId && (
  //                   <Typography variant="body1">Company: {selectedUser.companyId.name}</Typography>
  //                 )}
  //               </Box>
  //             </CardContent>
  //           </Card>
  //         )}
  //       </Box>

  //       {/* Add User/Company Modal */}
  //       <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
  //         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
  //           <Typography variant="h6" sx={{ mb: 2 }}>Add New {modalType === 'user' ? 'User' : 'Company'}</Typography>
  //           <form onSubmit={handleSubmit}>
  //             <TextField
  //               fullWidth
  //               label="Name"
  //               value={formData.name}
  //               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  //               sx={{ mb: 2 }}
  //             />
  //             {modalType === 'user' && (
  //               <>
  //                 <TextField
  //                   fullWidth
  //                   label="Email"
  //                   type="email"
  //                   value={formData.email}
  //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  //                   sx={{ mb: 2 }}
  //                 />
  //                 <TextField
  //                   fullWidth
  //                   label="Role"
  //                   value={formData.role}
  //                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
  //                   sx={{ mb: 2 }}
  //                 />
  //                 <FormControl fullWidth sx={{ mb: 2 }}>
  //                   <InputLabel>Company</InputLabel>
  //                   <Select
  //                     value={formData.companyId}
  //                     onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
  //                   >
  //                     <MenuItem value="">Select a company</MenuItem>
  //                     {companies.map((company) => (
  //                       <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
  //                     ))}
  //                   </Select>
  //                 </FormControl>
  //               </>
  //             )}
  //             {modalType === 'company' && (
  //               <FormControl fullWidth sx={{ mb: 2 }}>
  //                 <InputLabel>Parent Company (Optional)</InputLabel>
  //                 <Select
  //                   value={formData.parentCompanyId}
  //                   onChange={(e) => setFormData({ ...formData, parentCompanyId: e.target.value })}
  //                 >
  //                   <MenuItem value="">None</MenuItem>
  //                   {companies.map((company) => (
  //                     <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
  //                   ))}
  //                 </Select>
  //               </FormControl>
  //             )}
  //             <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
  //               Add {modalType === 'user' ? 'User' : 'Company'}
  //             </Button>
  //           </form>
  //         </Box>
  //       </Modal>
  //     </Box>
  //   </Container>
  //   <Box 
  //       component="footer" 
  //       sx={{
  //         py: 6,
  //         px: 2,
  //         mt: 'auto',
  //         backgroundColor: (theme) => theme.palette.grey[900],
  //         color: 'white'
  //       }}
  //     >
  //       <Container maxWidth="lg">
  //         <Grid container spacing={4}>
  //           <Grid item xs={12} md={4}>
  //             <Typography variant="h6" gutterBottom>
  //               About Me
  //             </Typography>
  //             <Typography variant="body2" sx={{ mb: 2 }}>
  //             Motivated Computer Science and
  //               Engineering Student eager to secure
  //               an Internship position to further
  //               enhance skills, leverage academic
  //               knowledge, and contribute to realworld projects
  //             </Typography>
  //             <Box sx={{ mt: 2 }}>
  //               <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
  //                 Developed by Sriparna Kaor
  //               </Typography>
  //               <Box sx={{ display: 'flex', gap: 2 }}>
  //                 <IconButton 
  //                   href="https://linkedin.com/in/sriparnakaor" 
  //                   target="_blank"
  //                   sx={{ color: 'white' }}
  //                 >
  //                   <LinkedInIcon />
  //                 </IconButton>
  //                 <IconButton 
  //                   href="https://github.com/sriparnakaor" 
  //                   target="_blank"
  //                   sx={{ color: 'white' }}
  //                 >
  //                   <GitHubIcon />
  //                 </IconButton>
  //                 <IconButton 
  //                   href="mailto:contact@sriparnakaor.com"
  //                   sx={{ color: 'white' }}
  //                 >
  //                   <EmailIcon />
  //                 </IconButton>
  //               </Box>
  //             </Box>
  //           </Grid>
            
  //           <Grid item xs={12} md={4}>
  //             <Typography variant="h6" gutterBottom>
  //               Key Features
  //             </Typography>
  //             <ul style={{ listStyle: 'none', padding: 0 }}>
  //               <li>
  //                 <Typography variant="body2" sx={{ mb: 1 }}>
  //                   • Advanced User Management System
  //                 </Typography>
  //               </li>
  //               <li>
  //                 <Typography variant="body2" sx={{ mb: 1 }}>
  //                   • Hierarchical Company Structure
  //                 </Typography>
  //               </li>
  //               <li>
  //                 <Typography variant="body2" sx={{ mb: 1 }}>
  //                   • Role-based Access Control
  //                 </Typography>
  //               </li>
  //               <li>
  //                 <Typography variant="body2" sx={{ mb: 1 }}>
  //                   • Real-time Search & Filtering
  //                 </Typography>
  //               </li>
  //               <li>
  //                 <Typography variant="body2" sx={{ mb: 1 }}>
  //                   • Detailed Analytics & Reporting
  //                 </Typography>
  //               </li>
  //             </ul>
  //           </Grid>

        
  //         </Grid>

  //         <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

  //         <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
  //           © {new Date().getFullYear()} Drivado. All rights reserved. Created by Sriparna Kaor
  //         </Typography>
  //       </Container>
  //     </Box>
  //   </Box>
  // );
};

export default App;