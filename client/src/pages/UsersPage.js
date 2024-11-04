import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getAll, toggleBlock } from '../services/userServices';
import { useAuth } from '../context/AuthContext';
import Search from '../components/Search';
import { Title } from '../components/Input/Input';

export default function UsersPage() {

    const [users, setUsers] = useState()
    const { searchTerm } = useParams();
    const auth = useAuth();

    useEffect(() => {
        loadUsers();
    }, [searchTerm]);

    const loadUsers = async () => {
        const usersData = await getAll(searchTerm);
        setUsers(usersData);
    }

    const handleToggleBlock = async (userId) => {
      const isBlocked = await toggleBlock(userId);
      setUsers(oldUsers => oldUsers.map(user => user.id === userId? {...user, isBlocked} : user))
    }

  return (
    <>
      <div className="usersPage_container">
        <div className="users_list">
          <Title title="Manage Users" fontSize="30px" />
          <Search
            searchRoute="/admin/users/"
            defaultRoute="/admin/users"
            placeholder="Search Users..."
          />
            <div className='title_item'>
              <h3>Name</h3>
              <h3>Email</h3>
              <h3>Address</h3>
              <h3>Admin</h3>
              <h3>Actions</h3>
            </div>
            {
              users &&
              users.map(user => (
                <div key={user.id} className='list_item'>
                  <span>{user.firstName +" "+ user.lastName}</span>
                  <span>{user.email}</span>
                  <span>{user.address}</span>
                  <span>{user.isAdmin ? "✔️" : "❌"}</span>
                  <span className="actions">
                    <Link to={"/admin/editUser/" + user.id}>Edit</Link>
                    {
                      auth.user.id !== user.id && (
                        <Link onClick={() => handleToggleBlock(user.id)} className={`${user.isBlocked ? "Unblock" : "Block"}`}>
                          {/* {user.isBlocked ? "Unblock" : "Block"} */}
                        </Link>
                    )}
                  </span>
                </div>
              ))
            }
        </div>
      </div>  
    </>
  )
}
