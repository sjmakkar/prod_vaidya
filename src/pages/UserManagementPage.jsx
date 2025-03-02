import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthProvider";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);7
  const { user, token } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Stores user input for search/filter
  const [editingUser, setEditingUser] = useState(null);

  const usersPerPage = 8;

  // Fetch users with pagination and search query
  const fetchUsers = async (page = 0, size = usersPerPage, query = "") => {
    try {
      const params = { page, size };
      if (query.trim() !== "") params.query = query;

      const response = await axios.get("https://ums-production.up.railway.app/users/pagination", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  // Fetch a single user by ID
  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`https://ums-production.up.railway.app/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([response.data]); // Display only this user
      setTotalPages(1);
    } catch (error) {
      console.error("Error fetching user by ID", error);
      alert("User not found!");
    }
  };

  // Fetch users by filter criteria
  const fetchFilteredUsers = async (fullName) => {
    try {
      const response = await axios.get("https://ums-production.up.railway.app/users/filter", {
        params: { fullName },
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setTotalPages(1);
    } catch (error) {
      console.error("Error fetching filtered users", error);
    }
  };

  // Update a user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://ums-production.up.railway.app/users/${editingUser.userId}`, editingUser, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      setEditingUser(null);
      fetchUsers(currentPage - 1, usersPerPage, searchQuery);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ums-production.up.railway.app/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(currentPage - 1, usersPerPage, searchQuery);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search/filter decision
  const handleFilter = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a value for filtering!");
      return;
    }

    if (!isNaN(searchQuery) && searchQuery.trim() !== "") {
      fetchUserById(searchQuery); // If input is a number, fetch user by ID
    } else {
      fetchFilteredUsers(searchQuery); // Otherwise, hit filter endpoint
    }
    setCurrentPage(1);
  };

  // Reset search
  const resetSearch = () => {
    setSearchQuery("");
    fetchUsers(0, usersPerPage);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchUsers(page - 1, usersPerPage, searchQuery);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage - 1, usersPerPage, searchQuery);
  }, [currentPage, token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex justify-center items-center mt-6">
        <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-md p-6">
          {/* Search Bar with Filter Button */}
          <div className="mb-6 flex gap-4">
            <input
              type="text"
              placeholder="Enter User ID or Filter Criteria"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleFilter} // New Filter button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Filter
            </button>
            <button
              onClick={resetSearch}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>

          {/* User Table */}
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 border-b">
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Role ID</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.userId} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{user.userId}</td>
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{user.userEmail}</td>
                    <td className="px-4 py-2">{user.address}</td>
                    <td className="px-4 py-2">{user.roleId}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => fetchUserById(user.userId)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.userId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center px-4 py-2 text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
