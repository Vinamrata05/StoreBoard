import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  if (location.pathname === "/") return null;

  return (
    <nav className="bg-white shadow-md px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-10 gap-3 sm:gap-0">
      <Link
        to="/"
        className="text-xl font-bold text-gray-800 hover:text-[#7B2C2C] transition-colors duration-200"
      >
        🛍️ StoreBoard
      </Link>
      <div className="space-x-3">
        <Link
          to="/view"
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            isActive("/view")
              ? "bg-white text-[#7B2C2C] border-[#7B2C2C] rounded-t-md"
              : "bg-[#7B2C2C] text-white border-transparent rounded-md hover:bg-[#5C1A1A]"
          }`}
        >
          View Items
        </Link>
        <Link
          to="/add"
          className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
            isActive("/add")
              ? "bg-white text-[#7B2C2C] border-[#7B2C2C] rounded-t-md"
              : "bg-[#7B2C2C] text-white border-transparent rounded-md hover:bg-[#5C1A1A]"
          }`}
        >
          Add Item
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#FFF2DC]">
        <Navbar />
        <div className="p-4 sm:p-6">
          <Routes>
            <Route path="/view" element={<ViewItems items={items} />} />
            <Route
              path="/add"
              element={
                <AddItem
                  onItemAdded={(item) => setItems((prev) => [item, ...prev])}
                />
              }
            />
            <Route
              path="/"
              element={
                <div
                  className="flex flex-col items-center justify-center min-h-[93vh] bg-cover bg-center bg-no-repeat px-4"
                  style={{
                    backgroundImage: "url('/assets/home-bg.jpg')",
                  }}
                >
                  
                  <div className="bg-white/80 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                    <h2
                      className="text-2xl sm:text-4xl mb-4"
                      style={{
                        fontFamily: "'Gravitas One', cursive",
                        color: "#7B2C2C",
                      }}
                    >
                      WELCOME TO STOREBOARD
                    </h2>

                    <p
                      className="text-sm sm:text-base mb-6 px-2 py-2 rounded-md"
                      style={{
                        fontFamily: "'Roboto Condensed', sans-serif",
                        backgroundColor: "#FFF2DC",
                        color: "#7B2C2C",
                        fontWeight: 600,
                      }}
                    >
                      Easily add and view your store inventory.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        to="/view"
                        className="bg-[#7B2C2C] text-white px-6 py-2 rounded hover:bg-[#5C1A1A] transition"
                      >
                        View Items
                      </Link>
                      <Link
                        to="/add"
                        className="bg-[#7B2C2C] text-white px-6 py-2 rounded hover:bg-[#5C1A1A] transition"
                      >
                        Add Item
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
