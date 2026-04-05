import React from "react";
import UserItem from "./UserItemV3";

const UserList = ({ users, ...props }: any) => {
  console.log("Dữ liệu users nhận được:", users);
  return (
    <ol >
      {users.map((user: any) => (
        
        <UserItem key={user.id} user={user} {...props} />
        
      ))}
    </ol>
  );
};

export default UserList