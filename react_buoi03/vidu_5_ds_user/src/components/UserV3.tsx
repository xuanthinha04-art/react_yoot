import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AddUser from "./AddUser";
import UserList from "./UserList";



//Bắt API


// Định nghĩa kiểu dữ liệu cho User từ API
interface User {
    id: number;
    firstName: string;
    age: number;
    email: string;
}

const User: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]); // Khởi tạo mảng rỗng
    const [loading, setLoading] = useState(true); // Trạng thái chờ tải dữ liệu
    const [search, setSearch] = useState(""); 
    const [activeSearchTerm, setActiveSearchTerm] = useState(""); 
    
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState('');


    // --- 1. Gọi API khi component load ---
    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => {
                // DummyJSON trả về { users: [...], total: 100, ... }

                // Ta chỉ lấy mảng users
                const mappedData = data.users.map((user :any) => ({
                    id: user.id,
                    firstName: user.firstName,
                    age: user.age,
                    email: user.email
                }))

                setUsers(mappedData);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi gọi API:", err);
                setLoading(false);
            });
    }, []);

    // --- 2. Các hàm xử lý (Giữ nguyên logic cũ) ---
    const handleSearch = () => setActiveSearchTerm(search);

    const filterUser = users.filter((user) => 
        user.firstName.toLowerCase().includes(activeSearchTerm.toLowerCase())
    );

    const deleteUser = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const startEdit = (id: number, currentName: string) => {
        setEditingId(id);
        setEditName(currentName);
    };

    const saveEdit = (id: number) => {
        setUsers(users.map(u => u.id === id ? { ...u, firstName: editName } : u));
        setEditingId(null);
    };

      const cancelEdit = () => setEditingId(null);

    // Nếu đang tải thì hiện thông báo
    if (loading) return <div>Đang tải dữ liệu...</div>;

    return (

        <div>
            <h2>User List từ API</h2>

            <SearchBar
                search={search}
                setSearch={setSearch}
                onSearch={handleSearch}
            />

            <AddUser
                users={users}
                setUsers={setUsers}
            />

            <UserList
                users={filterUser}
                editingId={editingId}
                editName={editName}
                setEditName={setEditName}
                onDelete={deleteUser}
                onStartEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
            />
        </div>

        // <div style={{ padding: '20px' }}>
        //     <h2>User List từ API</h2>

        //     <div style={{ marginBottom: '20px' }}>
        //         <input 
        //             placeholder='Tìm theo tên...'
        //             value={search}
        //             onChange={(e) => setSearch(e.target.value)}
        //         />
        //         <button onClick={handleSearch}>Search</button>
        //     </div>

        //     <ol>
        //         {filterUser.map((user) => (
        //             <li key={user.id} style={{ marginBottom: '10px' }}>
        //                 {editingId === user.id ? (
        //                     <>
        //                         <input 
        //                             value={editName} 
        //                             onChange={(e) => setEditName(e.target.value)} 
        //                         />
        //                         <button onClick={() => saveEdit(user.id)}>Save</button>
        //                         <button onClick={() => setEditingId(null)}>Cancel</button>
        //                     </>
        //                 ) : (
        //                     <>
        //                         <span style={{ marginRight: '20px' }}>Tên: {user.firstName}</span>
        //                         <span style={{ marginRight: '20px' }}>Tuổi: {user.age}</span>
        //                         <span style={{ marginRight: '20px' }}>Email: {user.email}</span>
        //                         <button onClick={() => startEdit(user.id, user.firstName)} style={{ marginRight: '20px' }}>Edit</button>
        //                         <button onClick={() => deleteUser(user.id)}>Delete</button>
        //                     </>
        //                 )}
        //             </li>
        //         ))}
        //     </ol>
        // </div>
    )
}

export default User










