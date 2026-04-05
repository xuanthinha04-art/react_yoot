import React from 'react'
import UserItem from './UserItem.tsx'


const UserList = ({users, ...props }: any) => {
    console.log("Dữ liệu users nhận được:", users);

  return (
    <div>
        <ol>
          {users.map((user: any) => (

              <UserItem key={user.id} user={user} {...props} />

          ))}
      </ol>
    </div>
  )
}

export default UserList