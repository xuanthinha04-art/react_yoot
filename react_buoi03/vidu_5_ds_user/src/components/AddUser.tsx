import { BadgePlus } from "lucide-react";
import React from "react";

const AddUser = ({ newUser, setNewUser, onAdd }: any) => {
  return (
    <div>
      <input
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        style={{ width: "200px", marginRight: '20px' }}
        placeholder="Add user"
      />
      <button onClick={onAdd}><BadgePlus/></button>
    </div>
  );
};

export default AddUser;