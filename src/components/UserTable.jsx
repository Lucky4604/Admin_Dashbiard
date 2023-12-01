import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const UserTable = ({ users, selectedRows, setSelectedRows }) => {
    const handleCheckboxChange = (id) => {
        setSelectedRows((prevSelectedRows) => {
          if (prevSelectedRows.includes(id)) {
            return prevSelectedRows.filter((rowId) => rowId !== id);
          } else {
            return [...prevSelectedRows, id];
          }
        });
      };
    
      const handleSelectAllChange = () => {
        if (selectedRows.length === users.length) {
          // If all rows are selected, unselect all
          setSelectedRows([]);
        } else {
          // Otherwise, select all rows
          const allUserIds = users.map((user) => user.id);
          setSelectedRows(allUserIds);
        }
      };
      
  return (
    <table style={{height:'45vw'}}> 
    <thead>
      <tr>
      <th>
            <input
              type="checkbox"
              checked={selectedRows.length === users.length}
              onChange={handleSelectAllChange}
             
            />
            Select All
          </th>
        
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id} style={selectedRows.includes(user.id) ? { background: '#ccc' } : {}}>
          <td>
            <input
              type="checkbox"
              checked={selectedRows.includes(user.id)}
              onChange={() => handleCheckboxChange(user.id)}
            />
          </td>
       
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button className="edit-btn">
            <FaRegEdit  size='20'/>   
            </button>
            <button className="delete-btn">
            <MdDeleteOutline 
            size='20'
            />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default UserTable