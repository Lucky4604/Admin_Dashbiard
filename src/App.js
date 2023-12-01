
import { useEffect, useState } from 'react';
import './App.css';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import { MdDelete } from "react-icons/md";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteSelected = () => {
    setUsers(users.filter(user => !selectedRows.includes(user.id)));
  };  

  useEffect(() => {
    // Fetch users from the API
    
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response => response.json())
    .then(data => {
      setUsers(data);
      setFilteredUsers(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again later.');
    });
  }, []);

    // Filtering users based on search term
    useEffect(() => {
      const filtered = users.filter(user =>
        Object.values(user).some(value =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredUsers(filtered);
      setCurrentPage(1); // Reset current page when filtering
    }, [searchTerm, users]);

     // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="App">
    <input
      type="text"
      placeholder="Enter Value ..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    
   
  
      
    <UserTable
      users={currentItems}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
    />
    <Pagination
      
      itemsPerPage={itemsPerPage}
      totalItems={filteredUsers.length}
      currentPage={currentPage}
      paginate={paginate}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',  // Align to the right
        alignItems: 'center',       // Align vertically in the center
        paddingRight: '100px',       // Add some right padding
        Size: '30vh',           // Increase the font size
          // Increase the font size
      }}
     
    />
  
  </div>
  );
}

export default App;
