import React from "react";

const ProductItem = ({
  product,
  editingId,
  editedProduct,
  setEditedProduct,
  onDelete,
  onIncrease,
  onDecrease,
  onStartEdit,
  onSaveEdit,
  onCancelEdit
}: any) => {

  return (
    <li style={{ marginBottom: "10px" }}>
      {editingId === product.id ? (
        // Giao diện khi ĐANG EDIT
        <>
          <input
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
            style={{ marginRight: "10px" }}
          />

          <input type="" 
            value={editedProduct.price} 
            onChange={(e) =>
              setEditedProduct({...editedProduct, price: Number(e.target.value) })
            }
            style={{ width: "80px", marginRight: "10px" }}
          />
          <input type=""
          value={editedProduct.quantity}
          onChange={(e) =>
            setEditedProduct({...editedProduct, quantity: Number(e.target.value) })
          }
          style={{ width: "80px", marginRight: "10px" }}    
          />

          <button
            onClick={() => onSaveEdit(product.id)}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>

          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        // Giao diện bình thường
        <>
          <span style={{ marginRight: "10px" }}>
            {product.name} - ${product.price} x {product.quantity}
          </span>

          <button onClick={() => onIncrease(product.id)} 
            style={{ marginRight: "10px" }}>
            +
          </button>

          <button
            onClick={() => onDecrease(product.id)}
            style={{ marginRight: "20px" }}
          >
            -
          </button>

          <button
            onClick={() =>
            onStartEdit(product.id, product.name, product.price)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>

          <button onClick={() => onDelete(product.id)}>Delete</button>
        </>
      )}
    </li>
  );
};

export default ProductItem;