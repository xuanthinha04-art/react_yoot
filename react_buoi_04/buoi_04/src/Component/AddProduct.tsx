import React from "react";

const AddProduct = ({ name, setName, price, setPrice, onAdd }: any) => {
  return (
    <div>
      <input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default AddProduct;