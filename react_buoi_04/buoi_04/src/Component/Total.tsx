import React from "react";

const Total = ({ products }: any) => {
  const total = products.reduce(
    (sum: number, p: any) => sum + p.price * p.quantity,
    0
  );

  return <h3>Total: {total} (VND)</h3>;
};

export default Total;