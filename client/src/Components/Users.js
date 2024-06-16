

import { FaPlus } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GoUpload } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import React, { useState, useEffect  } from 'react';
import axios from 'axios';

import { FaTrash,FaEdit } from 'react-icons/fa';
import { parse } from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Users = () => {
    const [importOpen, setImportOpen] = useState(false);
    const [addOpen,setAddOpen]  =useState(true);
    const [deleteOpen,setDeleteOpen]=useState(false);
    const [filterOpen,setFilterOpen]  =useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [addBorder, setAddBorder] = useState(true);
    const [importBorder, setImportBorder] = useState(false);
    const [exportBorder, setExportBorder] = useState(false);
    const [deleteBorder, setDeleteBorder] = useState(false);
    const [filterBorder, setFilterBorder] = useState(false)
    const [users,setUsers]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletedUsers, setDeletedUsers] = useState([]);
    const [showDeleteUser,setShowDeleteUser]=useState(false);
    const [importedData, setImportedData] = useState([]);
    const [importedDataTableShow, setImportedDataTableShow] = useState(false);
    const [importedUser, setImportedUser] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedContinent, setSelectedContinent] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
   
    
    
    
   
    // Function to handle changes in the search input
    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

   
  // Filter users based on selected industry and search term
        const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const matchesSearchTerm = fullName.includes(lowerCaseSearchTerm);
        const matchesIndustry = selectedIndustry ? user.industry.toLowerCase() === selectedIndustry : true;
        const matchesContinent = selectedContinent ? user.continent.toLowerCase() === selectedContinent : true;
        return matchesSearchTerm && matchesIndustry && matchesContinent;
  });
  
  //Filter Function Handle
    const handleIndustryClick = (industry) => {
        setSelectedIndustry(industry.toLowerCase());
        setAddOpen(true);
        setCurrentPage(1);  

       // Filter users based on selected industry and search term
        const filteredUsers = users.filter(user => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            const matchesSearchTerm = fullName.includes(lowerCaseSearchTerm);
            const matchesIndustry = industry ? user.industry.toLowerCase() === industry.toLowerCase() : true;
            const matchesContinent = selectedContinent ? user.continent.toLowerCase() === selectedContinent : true;
            return matchesSearchTerm && matchesIndustry && matchesContinent;
        });

        if (filteredUsers.length === 0) {
        } else {
        }
    };

  
   //Continent Function Handle
   const handleContinetClick = (continent) => {
    setSelectedContinent(continent.toLowerCase()); 
    setAddOpen(true);
    setCurrentPage(1);  
};

   

    //Discard button function handle Import box
    const handleDiscardImportClick=()=>{
        setImportOpen(false);
        setExportOpen(false);
        setImportBorder(false);
        setAddBorder(true);
        setAddOpen(true);
        setFilterOpen(false);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
        setImportedData([]);
        setImportedUser([]);
        setImportedDataTableShow(false);
    }

    //Discard button function handle Export box
    const handleDiscardExportClick=()=>{
        setExportOpen(false);
        setExportBorder(false);
        setAddBorder(true);
        setAddOpen(true);
        setFilterOpen(false);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
    }
    
    //Blue Border Handle function for Add in navbar
    const handleNavItemAddClick = () => {
        setAddBorder(!addBorder); 
        setImportBorder(false);
        setImportOpen(false);
        setExportOpen(false);
        setExportBorder(false);
        setDeleteBorder(false);
        setAddOpen(true);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);

      };

    //Blue Border Handle function for Import in navbar
    const handleNavItemImportClick = () => {
        setImportBorder(!importBorder);
        setImportOpen(!importOpen); 
        setAddBorder(false);
        setExportOpen(false);
        setExportBorder(false);
        setDeleteBorder(false);
        setFilterBorder(false);
        setAddOpen(false);
        setFilterOpen(false);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
        
      };  

    //Blue Border Handle function for Export in navbar
    const handleNavItemExportClick = () => {
        setExportBorder(!exportBorder);
        setExportOpen(!exportOpen);  
        setImportBorder(false);
        setAddBorder(false);
        setImportOpen(false); 
        setDeleteBorder(false);
        setFilterBorder(false); 
        setAddOpen(false);
        setFilterOpen(false);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
          
      };
      
    //Blue Border Handle function for Delete in navbar
    const handleNavItemDeleteClick = () => {
        setDeleteBorder(!deleteBorder);
        setExportBorder(false);
        setImportBorder(false);
        setAddBorder(false);
        setImportOpen(false); 
        setExportOpen(false); 
        setFilterBorder(false);  
        setAddOpen(false);
        setFilterOpen(false);
        setDeleteOpen(true);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
      };      

    //Blue Border Handle function for Filter in navbar
    const handleNavItemFilterClick = () => {
        setDeleteBorder(false);
        setExportBorder(false);
        setImportBorder(false);
        setImportOpen(false); 
        setExportOpen(false); 
        setFilterOpen(prevState => !prevState);
        setDeleteOpen(false);
        setShowDeleteUser(false);
        setImportedDataTableShow(false);
        setAddOpen(true);
      };    
      
  
    //Delete Data box Function
    const handleShowDeleteData =()=>{
        setShowDeleteUser(true);
        setDeleteOpen(false);
        setDeleteBorder(false);
    }    
    //Import Csv Data box Function
    const handleShowImportDataTable =()=>{
        setImportedDataTableShow(true);
        setImportOpen(false);
        setImportBorder(false);

    }      


    //Get All  User From Backend(Role=User)
    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7143/api/user/Get');
            if (response.status === 200) {
                const usersWithRoleUser = response.data.filter(user => user.role === 'Client');
                console.log('Filtered users with role "User":', usersWithRoleUser);
                setUsers(usersWithRoleUser);
            } else {
                toast.error('Failed to fetch users.');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('An error occurred while fetching users.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Update handleDeleteUser function to store deleted users in localStorage
    const handleDeleteUser = async (userId) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this user?");
            if (!confirmed) {
                return; 
            }

            const deletedUser = users.find(user => user.id === userId);
            const updatedUsers = users.filter(user => user.id !== userId);
            setDeletedUsers(prevDeletedUsers => [...prevDeletedUsers, deletedUser]);
            setUsers(updatedUsers);
            localStorage.setItem('deletedUsers', JSON.stringify([...deletedUsers, deletedUser]));
            const response = await axios.post(`https://localhost:7143/api/user/DeleteUser?id=${userId}`);
            if (response.status === 200) {
                toast.success('User deleted successfully.');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            toast.error('An error occurred while deleting user.');
        }
    };

    // Load deleted users from localStorage when the component mounts
    useEffect(() => {
        const storedDeletedUsers = JSON.parse(localStorage.getItem('deletedUsers'));
        if (storedDeletedUsers) {
            setDeletedUsers(storedDeletedUsers);
        }
    }, []);


    //Pagination Handle
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    //Export As CSV in Table Data 
    const handleExportClick = () => {
        const csvContent = "data:text/csv;charset=utf-8,";
        const headerRow = ["First Name", "Last Name", "Email", "Mobile Number","Company Name","Continent","Country","Industry", "User Name", "Role"];
        const rows = [headerRow.join(",")];
        users.forEach(user => {
            const row = [
                user.firstName,
                user.lastName,
                user.email,
                user.mobileNumber,
                user.companyName,
                user.continent,
                user.country,
                user.industry,
                
                user.role
            ];
            rows.push(row.join(","));
        });
        const csvData = rows.join("\n");
        const encodedUri = encodeURI(csvContent + csvData);

        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
    };  

    //Export button handle function in delete box start
    const handleExportDeleteData = (event) => {
        const confirmExport = window.confirm("Do you want to export the deleted users?");
        if (!confirmExport || !deletedUsers || deletedUsers.length === 0) {
            return; 
        }

        const csvContent = "data:text/csv;charset=utf-8,";
        const headerRow = ["First Name", "Last Name", "Email", "Mobile Number", "Role"];
        const rows = [headerRow.join(",")];
        deletedUsers.forEach(user => {
            if (user) { 
                const row = [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.companyName,
                    user.continent,
                    user.country,
                    user.industry,
                    user.mobileNumber,
                    user.role
                ];
                rows.push(row.join(","));
            }
        });
        const csvData = rows.join("\n");
        const encodedUri = encodeURI(csvContent + csvData);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "deleted_users.csv");
        document.body.appendChild(link);
        link.click();
        setDeletedUsers([]);
    };
    //Export button handle function in delete box end

    //Import Box function handle start
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            parseCSVFile(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            parseCSVFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const parseCSVFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target.result;
            parse(csvData, {
                header: true,
                complete: (results) => {
                    setImportedData(results.data);
                },
                skipEmptyLines: true,
            });
        };
        reader.readAsText(file);
    };


    const handleImportClick = () => {
        setImportedUser(importedData);
        console.log("Imported Data:", importedData); 
    };
//Import Box function handle end

    //Edit Table Data Function start
    const [editedUserData, setEditedUserData] = useState({
        id: '',
        fullName: '',
       
        email: '',
        mobileNumber: '',
        companyName: '',
        continent: '',
        country: '',
        industry: '',
        role: ''
    });

    const openEditModal = (user) => {
        setEditedUserData(user);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditedUserData({
            id: '',
            fullName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            companyName: '',
            continent: '',
            country: '',
            industry: '',
            role: ''
        });
        setEditModalOpen(false);
    };


    //Edit User Function
    const handleEditUser = async () => {
        if (window.confirm('Do you want to update this user?')) {
            try {
                const response = await axios.put('https://localhost:7143/api/user/UpdateUser', editedUserData);
                if (response.status === 204) {
                    toast.success('User updated successfully.');
                    closeEditModal();
                } else {
                    toast.error('Failed to update user.');
                }
            } catch (error) {
                toast.error('Error updating user.');
            }
        } else {
            console.log('User cancelled the update.');
        }
    };

//Edit Table Data Function End

  return (

    // import sidebar
    <div className={`bg-opacity-20 h-screen`}>
        

        {/* import navbar */}
        <div className='w-full '>
           
            <div className='flex justify-center'>

                {/* Gray Navbar Details */}
                <nav className='w-9/12 ml-72 h-8 bg-gray-200 flex items-center justify-start py-6 mt-8 rounded-md pl-8'>

                <div className={`flex items-center justify-center p-2 cursor-pointer ${addBorder ? 'bg-blue-200 bg-opacity-50 rounded' : ''}`} onClick={handleNavItemAddClick}>
                        <FaPlus className='mr-1 text-blue-600'/>
                        <span className='text-blue-600'>Users</span>
                    </div>
                    {/* Add Data Box */}
                    {addOpen && (
                           <div className="absolute top-48 w-9/12 bg-gray-100 rounded-lg shadow-lg z-10 -ml-8">
                           <div className="overflow-x-auto">
                               <table className="min-w-full divide-y divide-gray-200">
                                   <thead className="bg-gray-50">
                                       <tr>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                           
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                       </tr>
                                   </thead>
                                   {filteredUsers.length === 0 ? (
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-center">No users found.</td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredUsers.slice(indexOfFirstItem, indexOfLastItem).map(user => (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.mobileNumber}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.companyName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.continent}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.industry}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )}
                               </table>
                           </div>
                           <div className='flex justify-between p-2'>
                               <button className='mr-4 ml-2 cursor-pointer bg-teal-700 hover:bg-teal-200 text-white font-bold py-2 px-4 rounded' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                               <button className='cursor-pointer bg-teal-700 hover:bg-teal-200 text-white font-bold py-2 px-4 rounded' onClick={nextPage} disabled={indexOfLastItem >= users.length}>Next</button>
                           </div>
   
                       </div>
                    
                    )}

                    {/* rounded bg-blue-200 bg-opacity-50 */}

                    <div className={`ml-8 flex items-center justify-center p-2 cursor-pointer ${importBorder ? 'bg-blue-200 bg-opacity-50 rounded' : ''}`} onClick={handleNavItemImportClick}>
                        <MdOutlineFileDownload className='mr-1 text-blue-600'/>
                        <span className='text-blue-600'>Import</span>
                        <RiArrowDropDownLine className='ml-1 text-blue-600'/>
                    </div>

                    {/* Import Data Box */}
                    
                        {importOpen && (
                            <div className="absolute top-60 ml-72 w-96 bg-gray-100 p-4 rounded-lg shadow-lg z-10">
                                <h3 className="text-lg font-bold text-teal-600">Import Your Data</h3>
                                <p className='text-xs text-teal-600 mb-8'>Support Format CSV</p>

                                <div
                                    className="flex items-center justify-center border-dotted border-2 border-teal-600 rounded p-12"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <div className="text-center text-teal-600">Drag it Here</div>
                                </div>
                                <input type="file" accept=".csv" onChange={handleFileInputChange} className="mt-4" />

                                <div className="flex justify-end mt-12">
                                    <button onClick={handleImportClick} className="bg-teal-700 hover:bg-teal-400 text-white px-4 py-1 rounded-md mr-6">Import</button>
                                    <button onClick={handleDiscardImportClick} className="bg-teal-700 hover:bg-teal-500 text-white px-4 py-1 rounded-md">Discard</button>
                                    <button onClick={handleShowImportDataTable} className="bg-teal-300 hover:bg-teal-700 text-white px-4 py-1 rounded-md ml-6 mr-2">View Import Data</button>
                                </div>
                            </div>
                        )}
                        {/* Import Data Table Box */}
                        {importedDataTableShow && (
                        <div className="absolute top-44 -ml-10  w-9/12 bg-gray-100 p-4 rounded-lg shadow-lg z-10">  
                        <table className="min-w-full bg-white mt-2">
                            <thead>
                                <tr>
                                    <th className="py-2">Full Name</th>
                                    
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Mobile Number</th>
                                    <th className="py-2">Company Details</th>
                                    <th className="py-2">Continent</th>
                                    <th className="py-2">Country</th>
                                    <th className="py-2">Industry</th>
                                   
                                    <th className="py-2">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                            {importedUser.map((user, index) => (
                                <tr key={index}>
                                    <td className="py-2">{user['Full Name']}</td>
                                    
                                    <td className="py-2">{user['Email']}</td>
                                    <td className="py-2">{user['Mobile Number']}</td>
                                    <td className="py-2">{user['Company Details']}</td>
                                    <td className="py-2">{user['Continent']}</td>
                                    <td className="py-2">{user['Country']}</td>
                                    <td className="py-2">{user['Industry']}</td>
                                    
                                    <td className="py-2">{user['Role']}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                      )}  
                    
                    <div className={`ml-8 flex items-center justify-center p-2 cursor-pointer ${exportBorder ? 'bg-blue-200 bg-opacity-50 rounded' : ''}`} onClick={handleNavItemExportClick}>
                        <GoUpload className='mr-1 text-blue-600'/>
                        <span className='text-blue-600'>Export</span>
                        <RiArrowDropDownLine className='ml-1 text-blue-600'/>
                    </div>

                    {/* Export Data Box */}
                    {exportOpen && (
                        <div className="absolute top-72 ml-72 w-96 bg-gray-100 p-4 rounded-lg shadow-lg z-10">
                        <h3 className="text-lg font-bold text-teal-600 ">Export User's Data</h3>
                        <p className='text-xs text-teal-600 mb-8'>Your file is on it's way to your download folder</p>

                       

                        <div className="flex justify-end  mt-12">
                            <button onClick={handleExportClick} className="bg-teal-700 hover:bg-teal-400 text-white px-4 py-2 rounded-md mr-6">Export</button>
                            <button onClick={handleDiscardExportClick} className="bg-teal-700 hover:bg-teal-400 text-white px-4 py-2 rounded-md">Discard</button>
                        </div>
                        </div>
                    )}


                    <div className={`ml-8 flex items-center justify-center p-2 cursor-pointer ${deleteBorder ? 'bg-blue-200 bg-opacity-50 rounded' : ''}`} onClick={handleNavItemDeleteClick}>
                        <RiDeleteBin6Line className='mr-1 text-blue-600'/>
                        <span className='text-blue-600'>Delete</span>
                    </div>
                    {/* Delete Data Box */}
                    {deleteOpen && (
                        
                        <div className="absolute top-44 w-9/12 bg-gray-100 rounded-lg shadow-lg z-10 -ml-8">
                        <div className="overflow-x-auto">
                            <input 
                                className='w-full mb-2  px-4 py-2 bg-gray-100 text-bold rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-teal-100 transition duration-300 ease-in-out'
                                placeholder='Enter your First Name...'
                                onChange={handleSearchInputChange}
                                value={searchTerm}
                            />
            
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>

                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                {filteredUsers.length === 0 ? (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-center">No users found.</td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                                           
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.mobileNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.companyName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.continent}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.industry}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex">
                                                    <button 
                                                        className="text-teal-700 hover:text-teal-400"
                                                        onClick={() => openEditModal(user)}
                                                    >
                                                        <FaEdit className='cursor-pointer'/>
                                                    </button>
                                                    <button 
                                                        className="text-teal-700 hover:text-teal-400 ml-2"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        <FaTrash className='cursor-pointer'/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {editModalOpen && (
                                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                                            <div className="bg-white p-8 max-w-md rounded-lg shadow-lg">
                                                <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">Edit User</h1>
                                                <form onSubmit={handleEditUser} className="flex flex-wrap gap-4">
                                                    <div className="w-full">
                                                        <label htmlFor="id" className="block text-gray-700">ID</label>
                                                        <input type="text" id="id" name="id" value={editedUserData.id} readOnly className="form-input mt-1 block w-1/2 bg-gray-100 cursor-not-allowed rounded" />
                                                    </div>
                                                    <div className="w-full flex gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="firstName" className="block text-gray-700">Full Name</label>
                                                            <input type="text" id="firstName" name="firstName" value={editedUserData.fullName} onChange={(e) => setEditedUserData({ ...editedUserData, firstName: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                       
                                                    </div>
                                                    <div className="w-full flex gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="email" className="block text-gray-700">Email</label>
                                                            <input type="email" id="email" name="email" value={editedUserData.email} onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number</label>
                                                            <input type="text" id="mobileNumber" name="mobileNumber" value={editedUserData.mobileNumber} onChange={(e) => setEditedUserData({ ...editedUserData, mobileNumber: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                                                            <input type="text" id="companyName" name="companyName" value={editedUserData.companyName} onChange={(e) => setEditedUserData({ ...editedUserData, companyName: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="continent" className="block text-gray-700">Continent</label>
                                                            <input type="text" id="continent" name="continent" value={editedUserData.continent} onChange={(e) => setEditedUserData({ ...editedUserData, continent: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="country" className="block text-gray-700">Country</label>
                                                            <input type="text" id="country" name="country" value={editedUserData.country} onChange={(e) => setEditedUserData({ ...editedUserData, country: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="industry" className="block text-gray-700">Industry</label>
                                                            <input type="text" id="industry" name="industry" value={editedUserData.industry} onChange={(e) => setEditedUserData({ ...editedUserData, industry: e.target.value })} className="form-input mt-1 block w-full rounded" />
                                                        </div>
                                                    </div>
                                                    <div className="w-full">
                                                        <label htmlFor="id" className="block text-gray-700">Role</label>
                                                        <input type="text" id="id" name="id" value={editedUserData.role} readOnly className="form-input mt-1 block w-1/2 bg-gray-100 cursor-not-allowed rounded" />
                                                    </div>
                                                    <div className="w-full flex justify-end">
                                                        <button type="submit" className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-900">Save</button>
                                                        <button type="button" onClick={closeEditModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                </tbody>
                                )}
                            </table>
                        </div>
                        <div className='flex justify-between p-2'>
                            <button className='mr-4 ml-2 cursor-pointer bg-teal-700 hover:bg-teal-200 text-white font-bold py-2 px-4 rounded' onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                            <button className='cursor-pointer bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' onClick={handleShowDeleteData}>View Delete Users</button>
                            <button className='cursor-pointer bg-teal-700 hover:bg-teal-200 text-white font-bold py-2 px-4 rounded' onClick={nextPage} disabled={indexOfLastItem >= users.length}>Next</button>
                        </div>
                    </div>
                    )}
                     {/* Delete Data show box */}
                     {showDeleteUser && (
                         <div className="absolute top-44 w-9/12 bg-gray-100 rounded-lg shadow-lg z-10 -ml-10">
                            <div className="text-center"> 
                            <div className='flex justify-between items-center'>
                                <h2 className="text-lg font-bold text-teal-600 ml-6">Deleted Users</h2>
                                <button onClick={handleExportDeleteData} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-2 rounded-md mr-6 mt-2 mb-2">
                                    Export
                                </button>
                            </div>
                             <table className="min-w-full divide-y divide-gray-200">
                                 <thead className="bg-gray-50">
                                     <tr>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                         
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Continent</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                     </tr>
                                 </thead>
                                 <tbody className="bg-white divide-y divide-gray-200">
                                     {deletedUsers.map(user => (
                                         user &&
                                         <tr key={user.id}>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                                            
                                             <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.mobileNumber}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.companyName}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.continent}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.country}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.industry}</td>
                                             <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                    
                    )}

                    <div className={`ml-8 flex items-center justify-center p-2 cursor-pointer ${filterBorder ? 'bg-blue-200 bg-opacity-50 rounded' : ''}`} onClick={handleNavItemFilterClick}>
                        <LuFilter className='mr-1 text-blue-600'/>
                        <span className='text-blue-600'>Filter</span>
                        <RiArrowDropDownLine className='ml-1 text-blue-600'/>
                    </div>
                    {/* Filter Data */}
                    {filterOpen && (
                        <div className='mt-80 z-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
                            <div className="flex flex-col space-y-2">
                                {/* Industry Buttons */}
                                <h2 className="text-lg font-bold">Industries</h2>
                                <div className="flex flex-wrap">
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Information Technology(IT)')}
                                    >
                                        Information Technology(IT)
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Healthcare')}
                                    >
                                        Healthcare
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Construction')}
                                    >
                                        Construction
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Finance and Banking')}
                                    >
                                        Finance and Banking
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Retail')}
                                    >
                                        Retail
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Automotive')}
                                    >
                                        Automotive
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Tourism and Hospitality')}
                                    >
                                        Tourism and Hospitality
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Energy')}
                                    >
                                        Energy
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Agriculture')}
                                    >
                                        Agriculture
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Media and Entertainment')}
                                    >
                                        Media and Entertainment
                                    </button>
                                    <button
                                        className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleIndustryClick('Other')}
                                    >
                                        Other
                                    </button>
                                </div>

                                {/* Continent Buttons */}
                                <h2 className="text-lg font-bold">Continent</h2>
                                <div className="flex flex-wrap">
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Africa')}
                                    >
                                        Africa
                                    </button>
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Antarctic')}
                                    >
                                        Antarctic
                                    </button>
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Asia')}
                                    >
                                        Asia
                                    </button>
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Europe')}
                                    >
                                        Europe
                                    </button>
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Americas')}
                                    >
                                        Americas
                                    </button>
                                    <button
                                        className="bg-orange-700 hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-lg text-sm transition duration-300 mr-2 mb-2"
                                        onClick={() => handleContinetClick('Oceania')}
                                    >
                                        Oceania
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </nav>
            </div>
            <ToastContainer/>
        </div>
    </div>
        
  )
}

export default Users








