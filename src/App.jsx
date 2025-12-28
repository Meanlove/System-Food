import { useState } from "react";

export default function App() {
  const products = {
    Drink: [
      { id: 1, name: "Coca Cola", price: 0.75 },
      { id: 2, name: "Cambodia Beer", price: 0.75 },
      { id: 3, name: "Genzberg", price: 0.75 },
      { id: 4, name: "Genzberg", price: 0.75 },
      { id: 5, name: "ស្រាពាង", price: 10 },
      { id: 6, name: "ផាសិនសូដា", price: 1.5 },
      { id: 7, name: "ផាសិន", price: 3.5 },
      { id: 8, name: "ទំពាំងបាយជូ", price: 3.5 },
      { id: 9, name: "ម៉ាការីតា", price: 3.5 },
      { id: 10, name: "ស្រាផ្លែមាន", price: 3.5 },
    ],
    Food: [
      { id: 11, name: "ចាណាង", price: 3 },
      { id: 12, name: "សាច់ក្រក់", price: 3 },
      { id: 13, name: "ឡាបសាច់ជ្រូក", price: 3 },
      { id: 14, name: "ឆាក្ដៅសាច់គោ", price: 3 },
      { id: 15, name: "ឆាក្ដៅសាច់មាន់", price: 3 },
      { id: 16, name: "ឆាក្ដៅអន្ទង់", price: 3 },
      { id: 17, name: "សម្លរបុកទ្រាប់", price: 3 },
      { id: 18, name: "បុកល្ងរ", price: 3 },
      { id: 19, name: "Pasta", price: 3 },
      { id: 11, name: "French Fries", price: 3 },
      { id: 12, name: "បាយស", price: 3 },
    ],
  };

  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
                subtotal: (item.qty + 1) * item.price,
              }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1, subtotal: product.price }]);
    }
  };

  // Delete item
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
              subtotal: (item.qty + 1) * item.price,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.qty > 1
          ? {
              ...item,
              qty: item.qty - 1,
              subtotal: (item.qty - 1) * item.price,
            }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div style={{ fontFamily: "'Noto Sans Khmer', sans-serif" }} className="min-h-screen bg-gray-100 p-2 md:p-4 lg:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 print:hidden">Khara Coffee and Food</h1>

      <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Product List - Hidden when printing */}
        <div className="lg:col-span-2 bg-white p-3 md:p-4 rounded shadow print:hidden">
          {/* Drink */}
          <h2 className="text-lg md:text-xl font-semibold mb-2">Drink</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
            {products.Drink.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="border p-2 md:p-3 rounded hover:bg-gray-100 transition-colors flex flex-col items-center justify-center"
              >
                <div className="font-bold text-sm md:text-base truncate w-full text-center">{p.name}</div>
                <div className="text-xs md:text-sm">${p.price.toFixed(2)}</div>
              </button>
            ))}
          </div>

          {/* Food */}
          <h2 className="text-lg md:text-xl font-semibold mb-2">Food</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 md:gap-3">
            {products.Food.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="border p-2 md:p-3 rounded hover:bg-gray-100 transition-colors flex flex-col items-center justify-center"
              >
                <div className="font-bold text-sm md:text-base truncate w-full text-center">{p.name}</div>
                <div className="text-xs md:text-sm">${p.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cart / Order */}
        <div className="bg-white p-3 md:p-4 rounded shadow print:shadow-none print:border-0 print:p-2 print:w-[80mm] print:max-w-[80mm] print:mx-auto print:text-xs">
          {/* Print Header - Only shows when printing */}
          <div className="hidden print:block text-center border-b pb-2 mb-2">
            <h1 className="text-lg font-bold">Khara Coffee and Food</h1>
            <div className="text-sm">Receipt</div>
            <div className="text-xs text-gray-600">{new Date().toLocaleDateString()}</div>
          </div>

          <h2 className="text-lg md:text-xl font-semibold mb-3 print:hidden">Order</h2>

          {/* Cart Table */}
          <div className="w-full print:text-xs">
            <div className="hidden lg:block">
              {/* Desktop table view */}
              <table className="w-full text-sm border print:w-full print:max-w-full print:text-xs">
                <thead className="bg-gray-200 print:bg-white">
                  <tr>
                    <th className="border p-1 print:p-1 print:text-left">Item</th>
                    <th className="border p-1 print:p-1">Qty</th>
                    <th className="border p-1 print:p-1">Price</th>
                    <th className="border p-1 print:p-1">Amount</th>
                    <th className="border p-1 print:hidden">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="border p-3 text-center text-gray-500 print:p-1">
                        No items in cart
                      </td>
                    </tr>
                  ) : (
                    cart.map((item, i) => (
                      <tr key={i} className="text-center print:text-left">
                        <td className="border p-1 print:p-1 print:text-xs">{item.name}</td>
                        <td className="border p-1 print:p-1 print:text-center">
                          <div className="flex items-center justify-center space-x-1 print:hidden">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                            >
                              +
                            </button>
                          </div>
                          <div className="hidden print:block text-center">{item.qty}</div>
                        </td>
                        <td className="border p-1 print:p-1 print:text-right">${item.price.toFixed(2)}</td>
                        <td className="border p-1 print:p-1 print:text-right">${item.subtotal.toFixed(2)}</td>
                        <td className="border p-1 print:hidden">
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile table view */}
            <div className="block lg:hidden">
              {cart.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No items in cart</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border print:w-full print:max-w-full print:text-xs">
                    <thead className="bg-gray-200 print:bg-white">
                      <tr>
                        <th className="border p-1 print:p-1 print:text-left">Item</th>
                        <th className="border p-1 print:p-1">Qty</th>
                        <th className="border p-1 print:p-1">Price</th>
                        <th className="border p-1 print:p-1">Amount</th>
                        <th className="border p-1 print:hidden">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, i) => (
                        <tr key={i} className="text-center print:text-left">
                          <td className="border p-1 print:p-1 print:text-xs">{item.name}</td>
                          <td className="border p-1 print:p-1 print:text-center">
                            <div className="flex items-center justify-center space-x-1 print:hidden">
                              <button
                                onClick={() => decreaseQty(item.id)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                              >
                                -
                              </button>
                              <span>{item.qty}</span>
                              <button
                                onClick={() => increaseQty(item.id)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                              >
                                +
                              </button>
                            </div>
                            <div className="hidden print:block text-center">{item.qty}</div>
                          </td>
                          <td className="border p-1 print:p-1 print:text-right">${item.price.toFixed(2)}</td>
                          <td className="border p-1 print:p-1 print:text-right">${item.subtotal.toFixed(2)}</td>
                          <td className="border p-1 print:hidden">
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="text-right font-bold mt-3 text-lg print:mt-2 print:text-base print:border-t print:pt-2">
            Total: ${total.toFixed(2)}
          </div>

          {/* Print Footer */}
          <div className="hidden print:block text-center mt-4 pt-2 border-t text-xs text-gray-600">
            <div>Thank you for your order!</div>
            <div>Phone: 098 860 074</div>
            <div>{new Date().toLocaleTimeString()}</div>
          </div>

          {/* Buttons - Hidden when printing */}
          {cart.length > 0 && (
            <div className="flex space-x-3 mt-4 print:hidden">
              <button
                onClick={() => setCart([])}
                className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors"
              >
                🖨️ Print
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}