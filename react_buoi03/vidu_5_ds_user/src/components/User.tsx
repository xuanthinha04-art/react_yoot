import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AddUser from "./AddUser";
import UserList from "./UserList";

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

// Không chia components

// import { CirclePlus, CircleX, MessageCircleX, Pencil, Search } from 'lucide-react';
// import React, { useState } from 'react'

// const initUsers = [
//         {id: 1, name: 'Nguyen Van A'},
//         {id: 2, name: 'Nguyen Huu B'},
//         {id: 3, name: 'Tran Xuan C'},
//         {id: 4, name: 'Xuan Thinh'},
//         {id: 5, name: 'Thinh Nguyen'}
//     ]

// const User: React.FC = () => 
//     {
//             //Moi mang Users chua nhieu doi tuong(Obect) nguoi dung
//             const [users, setUsers] = useState(initUsers)
//             //
//             const [search, setSearch] = useState("");
//             const [activeSearchTerm, setActiveSearchTerm] = useState(""); // Chỉ đổi khi bấm nút Search

//             // Hàm xử lý khi bấm nút Search
//             const handleSearch = () => {
//                 setActiveSearchTerm(search);
//             }
//             console.log('search', search)

//             //Ham live search vừa nhập vua tiem
//             // const filterUser = users.filter((user) => {
//             //     return user.name.toLowerCase().includes(search.toLowerCase())
//             // })

//             // Lọc dựa trên activeSearchTerm
//             const filterUser = users.filter((user) => {
//                 return user.name.toLowerCase().includes(activeSearchTerm.toLowerCase())
//             })

//             console.log('filterUser', filterUser)

//             const [newUser, setNewUser] = useState('');
//             //Add
//             const StartAddUser = () => {
//                 if (!newUser.trim()) return;

//                 const newUserObj = {
//                     id: Date.now(),
//                     name: newUser
//                 }
//                 console.log(newUserObj)

//                 setUsers([...users, newUserObj])
//                 setNewUser('')
//             }
//             console.log('newUser', newUser)

//             const [remoUser, setRemoUser] = useState('');
//             //Delete
//             const deleteUser = (id: number) => {
//                 setUsers(users.filter((user) => user.id !== id))
//             }

//             // --- State cho chức năng Edit ---
//             const [editingId, setEditingId] = useState<number | null>(null); // ID của user đang được sửa
//             const [editName, setEditName] = useState(''); // Giá trị tên mới khi đang sửa
//             // --- Logic xử lý Edit ---
//             // 1. Khi bấm nút Edit: Mở chế độ chỉnh sửa
//             const startEdit = (id: number, currentName: string) => {
//                 setEditingId(id);
//                 setEditName(currentName);
//             };

//             // 2. Khi bấm Save: Cập nhật mảng users
//             const saveEdit = (id: number) => {
//                 const updatedUsers = users.map(user => 
//                     user.id === id ? { ...user, name: editName } : user
//                 );
//                 setUsers(updatedUsers);
//                 setEditingId(null); // Thoát chế độ sửa
//             };

//             // 3. Khi bấm Cancel: Hủy bỏ
//             const cancelEdit = () => setEditingId(null);



//         return (
//             <div>
//                 <h2>User List</h2>

//                 {/* {Search + Add} */}
//                 <div>
//                     <input 
//                         type="text"
//                         placeholder='Serach user'
//                         style={{ width: "200px", marginRight: '20px' }}
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     {/* Khi bấm nút này mới gọi handleSearch */}
//                         <button onClick={handleSearch}><Search/></button>
//                     <br /><br />
//                     <input 
//                         type="text"
//                         placeholder='Add user'
//                         style={{ width: "200px", marginRight: '20px' }}
//                         value={newUser}
//                         onChange={(e) => setNewUser(e.target.value)}
//                         />
//                     <button onClick={StartAddUser} ><CirclePlus/></button>
//                 </div>
//                 {/* Hien thi danh sach khong co delete */}
//                 {/* <ol>
//                     {filterUser.map((user) => (
//                         <li key={user.id}>{user.name}</li> 
//                     ))}
                    
//                 </ol> */}

//                 <ol>
//                     {filterUser.map((user) => (
//                         <li key={user.id} style={{ marginBottom: '10px' }}>
//                             {editingId === user.id ? (
//                                 // Giao diện khi ĐANG SỬA
//                                 <>
//                                     <input 
//                                         value={editName} 
//                                         onChange={(e) => setEditName(e.target.value)} 
//                                     />
//                                     <button onClick={() => saveEdit(user.id)} style={{ marginRight: '20px' }}><CirclePlus/></button>
//                                     <button onClick={cancelEdit}><MessageCircleX/></button>
//                                 </>
//                             ) : (
//                                 // Giao diện HIỂN THỊ bình thường
//                                 <>
//                                     <span style={{ marginRight: '20px' }}>{user.name}</span>
//                                     <button onClick={() => startEdit(user.id, user.name)} style={{ marginRight: '20px' }}><Pencil /></button>
//                                     <button onClick={() => deleteUser(user.id)}><CircleX/></button>
//                                 </>
//                             )}
//                         </li>
//                     ))}
//                 </ol>
//             </div>
            
//         )
//     }

// export default User



//Bắt API

// import React, { useState, useEffect } from 'react'

// // Định nghĩa kiểu dữ liệu cho User từ API
// interface User {
//     id: number;
//     firstName: string;
//     age: number;
// }

// const UserV1: React.FC = () => {
//     const [users, setUsers] = useState<User[]>([]); // Khởi tạo mảng rỗng
//     const [loading, setLoading] = useState(true); // Trạng thái chờ tải dữ liệu
//     const [search, setSearch] = useState(""); 
//     const [activeSearchTerm, setActiveSearchTerm] = useState(""); 
    
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [editName, setEditName] = useState('');

//     // --- 1. Gọi API khi component load ---
//     useEffect(() => {
//         fetch('https://dummyjson.com/users')
//             .then(res => res.json())
//             .then(data => {
//                 // DummyJSON trả về { users: [...], total: 100, ... }
//                 // Ta chỉ lấy mảng users
//                 setUsers(data.users);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error("Lỗi gọi API:", err);
//                 setLoading(false);
//             });
//     }, []);

//     // --- 2. Các hàm xử lý (Giữ nguyên logic cũ) ---
//     const handleSearch = () => setActiveSearchTerm(search);

//     const filterUser = users.filter((user) => 
//         user.firstName.toLowerCase().includes(activeSearchTerm.toLowerCase())
//     );

//     const deleteUser = (id: number) => {
//         setUsers(users.filter((user) => user.id !== id));
//     };

//     const startEdit = (id: number, currentName: string) => {
//         setEditingId(id);
//         setEditName(currentName);
//     };

//     const saveEdit = (id: number) => {
//         setUsers(users.map(u => u.id === id ? { ...u, firstName: editName } : u));
//         setEditingId(null);
//     };

//     // Nếu đang tải thì hiện thông báo
//     if (loading) return <div>Đang tải dữ liệu...</div>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>User List từ API</h2>

//             <div style={{ marginBottom: '20px' }}>
//                 <input 
//                     placeholder='Tìm theo tên...'
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>

//             <ol>
//                 {filterUser.map((user) => (
//                     <li key={user.id} style={{ marginBottom: '10px' }}>
//                         {editingId === user.id ? (
//                             <>
//                                 <input 
//                                     value={editName} 
//                                     onChange={(e) => setEditName(e.target.value)} 
//                                 />
//                                 <button onClick={() => saveEdit(user.id)}>Save</button>
//                                 <button onClick={() => setEditingId(null)}>Cancel</button>
//                             </>
//                         ) : (
//                             <>
//                                 <span style={{ marginRight: '20px' }}>{user.firstName}</span>
//                                 <span>{user.age}</span>
//                                 <button onClick={() => startEdit(user.id, user.firstName)} style={{ marginRight: '20px' }}>Edit</button>
//                                 <button onClick={() => deleteUser(user.id)}>Delete</button>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ol>
//         </div>
//     )
// }

// export default User