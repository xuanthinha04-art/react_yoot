import type React from "react";

interface UserProps {
    users: string[];

}

const Users: React.FC<UserProps> = ({users}) => {
 return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    )
};


export default Users;   
