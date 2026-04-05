import React from 'react'
import InputCustom from './InputCustom';

const UserItem = ({
  user,
  editingId,
  editFormData, onEditChange,
  onDelete, onStartEdit,
  onSave, onCancel
}: any) => {

  // Định nghĩa bộ khung cho mỗi User Card
  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const dataUpdateUserField = [
    {
      name: 'name',
      type: 'text',
      value: editFormData.name,
      placeholder: 'Tên:',
      onChange: onEditChange
    },
    {
      name: 'age',
      type: 'number',
      value: editFormData.age,
      placeholder: 'Tên:',
      onChange: onEditChange
    },
    {
      name: 'email',
      type: 'text',
      value: editFormData.email,
      placeholder: 'Email:',
      onChange: onEditChange
    },
    {
      name: 'phone',
      type: 'text',
      value: editFormData.phone,
      placeholder: 'Phone:',
      onChange: onEditChange
    },
  ]

  return (
    <div style={cardStyle} className="user-card">
      {editingId === user.id ? (
        // <li>
        //   <>
        //   <input value={editName} style={{height: "30px", width: "500px"}} placeholder='Tên:'
        //     onChange={(e) => setEditName(e.target.value)}
        //   /> <br />

        //   <input value={editAge} style={{height: "30px", width: "500px"}} placeholder='Tuổi:'
        //     onChange={(e) => setEditAge(e.target.value)}
        //   /> <br />

        //   <input value={editEmail} style={{height: "30px", width: "500px"}} placeholder='Email:'
        //     onChange={(e) => setEditEmail(e.target.value)}
        //   /> <br />

        //   <input value={editphone} style={{height: "30px", width: "500px"}} placeholder='Phone:'
        //     onChange={(e) => setEditphone(e.target.value)}
        //   /> <br />
        //   <button onClick={() => onSave(user.id)} style={{height: "30px", width: "100px", marginRight: '20px'}}>Save</button>
        //   <button onClick={onCancel} style={{height: "30px", width: "100px", marginRight: '20px'}}>Cencel</button>
        // </>
        // </li>

        <li>
          <>
            {dataUpdateUserField.map((field) => (
              <InputCustom key={field.name} type={field.type} name={field.name} value={field.value} placeholder={field.placeholder} onChange={field.onChange} />
            ))}

            <button onClick={() => onSave(user.id)} style={{ height: "30px", width: "100px", marginRight: '20px' }}>Save</button>
            <button onClick={onCancel} style={{ height: "30px", width: "100px", marginRight: '20px' }}>Cancel</button>
          </>
        </li>
      ) :
        (
          <li>
            <div>
              <>
                <span style={{ marginRight: '20px' }}> Tên: {user.name}</span> <br />
                <span style={{ marginRight: '20px' }}> Tuổi: {user.age}</span> <br />
                <span style={{ marginRight: '20px' }}> Email: {user.email}</span> <br />
                <span style={{ marginRight: '20px' }}> Phone: {user.phone}</span> <br />
                <button onClick={() => onStartEdit(user)}
                  style={{ height: "30px", width: "100px", marginRight: '20px' }}>
                  Edit</button>

                <button onClick={() => onDelete(user.id)}
                  style={{ height: "30px", width: "100px", marginRight: '20px' }}
                >Delete</button>
              </>

            </div>
          </li>
        )
      }
    </div>

  );
};


export default UserItem