import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddUser from "./AddUser";
import UserList from "./UserList";


//Chia component
const initUsers = [
  { id: 1, name: "Nguyen Van A" },
  { id: 2, name: "Nguyen Huu B" },
  { id: 3, name: "Tran Xuan C" },
  { id: 4, name: "Xuan Thinh" },
  { id: 5, name: "Thinh Nguyen" },
];

const User: React.FC = () => {
  const [users, setUsers] = useState(initUsers);
  const [search, setSearch] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const [newUser, setNewUser] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  // Search
  const handleSearch = () => {
    setActiveSearchTerm(search);
  };
  
  //Loc ra các User muốn tìm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(activeSearchTerm.toLowerCase())
  );

  // Add
  const handleAddUser = () => {
    if (!newUser.trim()) return;

    setUsers([
      ...users,
      { id: Date.now(), name: newUser }
    ]);
    setNewUser("");
  };

  // Delete
  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // Edit
  const startEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const saveEdit = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, name: editName } : u
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div>
      <h2>User List</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
      />

      <AddUser
        newUser={newUser}
        setNewUser={setNewUser}
        onAdd={handleAddUser}
      />

      <UserList
        users={filteredUsers}
        editingId={editingId}
        editName={editName}
        setEditName={setEditName}
        onDelete={handleDelete}
        onStartEdit={startEdit}
        onSave={saveEdit}
        onCancel={cancelEdit}
      />
    </div>
  );
};

export default User;