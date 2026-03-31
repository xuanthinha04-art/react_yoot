import { Ban, Pencil, Save, Trash2 } from "lucide-react";
import React from "react";

const UserItem = ({
  user,
  editingId,
  editName,
  setEditName,
  onDelete,
  onStartEdit,
  onSave,
  onCancel
}: any) => {

  return (
    <li>
      {editingId === user.id ? (
          <>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <button onClick={() => onSave(user.id)} style={{marginRight: '20px' }}><Save/></button>
            <button onClick={onCancel}><Ban/></button>
          </>
        ) :
        (
          <>
            <span>{user.name}</span>
            <button onClick={() => onStartEdit(user.id, user.name)} 
              style={{marginRight: '20px', marginLeft: '20px', marginBottom: '20px'}}>
                  <Pencil/></button>
                  
            <button onClick={() => onDelete(user.id)}><Trash2/></button>
          </>
        )
      }
    </li>
  );
};

export default UserItem;