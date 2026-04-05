import React from "react";

const AddUser = ({ newUser, setNewUser, onAdd }: any) => {
  return (
    <div>
      <input
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        style={{ width: "400px", marginRight: '20px', height: "20px"}}
        placeholder="Add user"
      />
      <button onClick={onAdd} style={{ width: "100px", marginRight: '20px', height: "30px" }}>Add</button>
    </div>
  );
};

export default AddUser;