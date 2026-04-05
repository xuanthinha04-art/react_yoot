
// Không chia components

import { CirclePlus, CircleX, MessageCircleX, Pencil, Search } from 'lucide-react';
import React, { useState } from 'react'

const initUsers = [
        {id: 1, name: 'Nguyen Van A'},
        {id: 2, name: 'Nguyen Huu B'},
        {id: 3, name: 'Tran Xuan C'},
        {id: 4, name: 'Xuan Thinh'},
        {id: 5, name: 'Thinh Nguyen'}
    ]

const User: React.FC = () => 
    {
            //Moi mang Users chua nhieu doi tuong(Obect) nguoi dung
            const [users, setUsers] = useState(initUsers)
            //
            const [search, setSearch] = useState("");
            const [activeSearchTerm, setActiveSearchTerm] = useState(""); // Chỉ đổi khi bấm nút Search

            // Hàm xử lý khi bấm nút Search
            const handleSearch = () => {
                setActiveSearchTerm(search);
            }
            console.log('search', search)

            //Ham live search vừa nhập vua tiem
            // const filterUser = users.filter((user) => {
            //     return user.name.toLowerCase().includes(search.toLowerCase())
            // })

            // Lọc dựa trên activeSearchTerm
            const filterUser = users.filter((user) => {
                return user.name.toLowerCase().includes(activeSearchTerm.toLowerCase())
            })

            console.log('filterUser', filterUser)

            const [newUser, setNewUser] = useState('');
            //Add
            const StartAddUser = () => {
                if (!newUser.trim()) return;

                const newUserObj = {
                    id: Date.now(),
                    name: newUser
                }
                console.log(newUserObj)

                setUsers([...users, newUserObj])
                setNewUser('')
            }
            console.log('newUser', newUser)

            const [remoUser, setRemoUser] = useState('');
            //Delete
            const deleteUser = (id: number) => {
                setUsers(users.filter((user) => user.id !== id))
            }

            // --- State cho chức năng Edit ---
            const [editingId, setEditingId] = useState<number | null>(null); // ID của user đang được sửa
            const [editName, setEditName] = useState(''); // Giá trị tên mới khi đang sửa
            // --- Logic xử lý Edit ---
            // 1. Khi bấm nút Edit: Mở chế độ chỉnh sửa
            const startEdit = (id: number, currentName: string) => {
                setEditingId(id);
                setEditName(currentName);
            };

            // 2. Khi bấm Save: Cập nhật mảng users
            const saveEdit = (id: number) => {
                const updatedUsers = users.map(user => 
                    user.id === id ? { ...user, name: editName } : user
                );
                setUsers(updatedUsers);
                setEditingId(null); // Thoát chế độ sửa
            };

            // 3. Khi bấm Cancel: Hủy bỏ
            const cancelEdit = () => setEditingId(null);



        return (
            <div>
                <h2>User List</h2>

                {/* {Search + Add} */}
                <div>
                    <input 
                        type="text"
                        placeholder='Serach user'
                        style={{ width: "200px", marginRight: '20px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Khi bấm nút này mới gọi handleSearch */}
                        <button onClick={handleSearch}><Search/></button>
                    <br /><br />
                    <input 
                        type="text"
                        placeholder='Add user'
                        style={{ width: "200px", marginRight: '20px' }}
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        />
                    <button onClick={StartAddUser} ><CirclePlus/></button>
                </div>
                {/* Hien thi danh sach khong co delete */}
                {/* <ol>
                    {filterUser.map((user) => (
                        <li key={user.id}>{user.name}</li> 
                    ))}
                    
                </ol> */}

                <ol>
                    {filterUser.map((user) => (
                        <li key={user.id} style={{ marginBottom: '10px' }}>
                            {editingId === user.id ? (
                                // Giao diện khi ĐANG SỬA
                                <>
                                    <input 
                                        value={editName} 
                                        onChange={(e) => setEditName(e.target.value)} 
                                    />
                                    <button onClick={() => saveEdit(user.id)} style={{ marginRight: '20px' }}><CirclePlus/></button>
                                    <button onClick={cancelEdit}><MessageCircleX/></button>
                                </>
                            ) : (
                                // Giao diện HIỂN THỊ bình thường
                                <>
                                    <span style={{ marginRight: '20px' }}>{user.name}</span>
                                    <button onClick={() => startEdit(user.id, user.name)} style={{ marginRight: '20px' }}><Pencil /></button>
                                    <button onClick={() => deleteUser(user.id)}><CircleX/></button>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            
        )
    }

export default User