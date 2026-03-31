import React from "react";
import UserItem from "./UserItem";

const UserList = ({ users, ...props }: any) => {
  return (
    <ol >
      {users.map((user: any) => (
        
        <UserItem key={user.id} user={user} {...props} />
        
      ))}
    </ol>
  );
};

export default UserList;