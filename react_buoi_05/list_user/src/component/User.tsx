import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import SearchUser from './SearchUser';
import AddUser from './AddUser';


interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string;
}
const User: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState("");
    const [activeSearchTerm, setActiveSearchTerm] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    // const [editName, setEditName] = useState('');
    // const [editAge, setEditAge] = useState(0);
    // const [editEmail, setEditEmail] = useState('');
    // const [editphone, setEditphone] = useState('');
    const [editFormData, setEditFormData] = useState<User>({
        id: 0,
        name: '',
        age: 0,
        email: '',
        phone: ''
    });



    // Goi API
    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(response => response.json())
            .then(data => {
                const mappedData = data.users.map((user: any) => ({
                    id: user.id,
                    // Gộp họ và tên lại để có trường 'name'
                    name: `${user.firstName} ${user.lastName}`,
                    age: user.age,
                    email: user.email,
                    phone: user.phone
                }));

                setUsers(mappedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Loi API: ", error);
                setLoading(false);
            });
    }, []);
    // --- 2. Các hàm xử lý (Giữ nguyên logic cũ) ---
    const handleSearch = () => setActiveSearchTerm(search);

    const filterUser = users.filter((users) =>
        users.name.toLowerCase().includes(activeSearchTerm.toLowerCase())
    );

    const deleteUser = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? Number(value) : value // Chuyển age sang kiểu số
        }));
    };

    // const startEdit = (user: User) => {
    //     const { id, name, age, email, phone } = user;

    //     setEditingId(id);
    //     setEditName(name);
    //     setEditAge(age);
    //     setEditEmail(email);
    //     setEditphone(phone);
    // };

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditFormData(user); // Đổ toàn bộ object user vào form edit
    };

    // const saveEdit = (id: number) => {
    //     setUsers(users.map(u => u.id === id ? { ...u, name: editName, age: editAge, email: editEmail, phone: editphone} : u));
    //     setEditingId(null);
    // };

    const saveEdit = (id: number) => {
        setUsers(users.map(user => (user.id === id ? editFormData : user)));
        setEditingId(null);
    };

    const cancelEdit = () => setEditingId(null);


    // Nếu đang tải thì hiện thông báo
    if (loading)
        return <div>Đang tải dữ liệu...</div>;


    return (
        <div>
            <h1 style={{color: 'green'}}>
                Danh sach User
            </h1>

            <SearchUser
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
                // editName={editName}
                // setEditName={setEditName}
                // editAge={editAge}
                // setEditAge={setEditAge}
                // editEmail={editEmail}
                // setEditEmail={setEditEmail}
                // editphone={editphone}
                // setEditphone={setEditphone}
                editFormData={editFormData}
                onEditChange={handleEditChange}
                onDelete={deleteUser}
                onStartEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
            />
        </div>
    )
}

export default User