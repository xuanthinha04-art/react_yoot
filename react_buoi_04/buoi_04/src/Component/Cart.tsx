import React, { useState } from "react";
import SearchBar from "./SearchBar";
import AddProduct from "./AddProduct";
import ProductList from "./ListProduct"
import Total from "./Total";

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Iphone", price: 1000, quantity: 1 },
    { id: 2, name: "Macbook", price: 2000, quantity: 1 },
    { id: 3, name: "Ipad", price: 3000, quantity: 1},
    { id: 5, name: "Imac", price: 5000, quantity: 1},
  ]);

  const [search, setSearch] = useState("");
  
  // Search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Add
  const handleAdd = () => {
    if (!name || !price) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name,
        price: Number(price),
        quantity: 1
      }
    ]);

    setName("");
    setPrice("");
  };

  // Tang so luong
  const increase = (id: number) => {
    setProducts(products.map
        (p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p
    ));
  };

  //Giam so luong
  const decrease = (id: number) => {
    setProducts(products.map
        (p => p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
    ));
  };
  
  // Delete
  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedProduct, setEditedProduct] = useState({
        name: "",
        price: 0,
        quantity: 0
    });


  //Edit
    const startEdit = (id: number, name: string, price: number) => {
    setEditingId(id);
    setEditedProduct({ name, price, quantity: 0});
    };

    const saveEdit = (id: number) => {
    if (!editedProduct.name || !editedProduct.price) return;

    const updated = products.map(p =>
        p.id === id ? { ...p, ...editedProduct } : p
    );

    setProducts(updated);
    setEditingId(null);
    };

    const cancelEdit = () => {
    setEditingId(null);
    setEditedProduct({ name: "", price: 0, quantity: 0});
    };





  return (
    <div>
      <h2>Shopping Cart</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <AddProduct
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        onAdd={handleAdd}
      />

      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onIncrease={increase}
        onDecrease={decrease}
        onStartEdit={startEdit}
        onSaveEdit={saveEdit}
        onCancelEdit={cancelEdit}
        editingId={editingId}
        editedProduct={editedProduct}
        setEditedProduct={setEditedProduct}
        />

      <Total products={products} />
    </div>
  );
};

export default ShoppingCart;