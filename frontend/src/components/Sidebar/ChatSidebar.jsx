import React, { useState, useEffect } from "react";

function ChatSidebar({ onSelectChat, onJoinGroup }) {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return; // skip API call if search is empty
      }
      try {
        const res = await fetch(`http://localhost:5000/api/users?search=${search}`);
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      }
    };

    const fetchGroups = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/groups");
        const data = await res.json();
        if (Array.isArray(data)) setGroups(data);
        else setGroups([]);
      } catch (err) {
        console.error("Error fetching groups:", err);
        setGroups([]);
      }
    };

    fetchUsers();
    fetchGroups();
  }, [search]);

  return (
    <aside className="w-full h-full bg-gray-50 rounded-3xl shadow-xl flex flex-col overflow-hidden">
      {/* Search */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-100">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-3 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {/* Users */}
      <div className="px-3 py-4 border-b border-gray-100">
        <h3 className="text-gray-500 text-sm mb-2 font-semibold">Users</h3>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectChat?.(user)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50"
            >
              <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-white font-bold">
                {user.name[0].toUpperCase()}
              </div>
              <span>{user.name}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No users found</p>
        )}
      </div>

      {/* Groups */}
      <div className="px-3 py-4 flex-1 overflow-y-auto">
        <h3 className="text-gray-500 text-sm mb-2 font-semibold">Groups</h3>
        {Array.isArray(groups) && groups.length > 0 ? (
          groups.map((group) => (
            <button
              key={group.id}
              onClick={() => onJoinGroup?.(group.id)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-50"
            >
              <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
                {group.name[0].toUpperCase()}
              </div>
              <span>{group.name}</span>
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No groups found</p>
        )}
      </div>
    </aside>
  );
}

export default ChatSidebar;
