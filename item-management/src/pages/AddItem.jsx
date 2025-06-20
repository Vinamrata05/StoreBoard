import React, { useState } from "react";
import axios from "axios";

export default function AddItem({ onItemAdded }) {
  const [item, setItem] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    additionalImages: [],
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setItem({
      ...item,
      [name]: name === "coverImage" ? files[0] : Array.from(files),
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("type", item.type);
  formData.append("description", item.description);
  formData.append("coverImage", item.coverImage);
  item.additionalImages.forEach((img) => formData.append("additionalImages", img));

  try {
    const res = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onItemAdded(data); 
    setSuccess(true);

    setItem({
      name: "",
      type: "",
      description: "",
      coverImage: null,
      additionalImages: [],
    });

    setTimeout(() => setSuccess(false), 3000);
  } catch (err) {
    console.error("❌ Failed to submit item:", err);
  }
};



  return (
    <div className="max-w-2xl mx-auto mt-5 bg-white shadow-lg rounded-lg p-8 border border-[#EADBC8]">
      <h2 className="text-3xl font-bold text-[#7B2C2C] mb-6">Add New Item</h2>

      {success && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded mb-4">
          ✅ Item successfully added!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#5C1A1A] font-medium mb-1">Item Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter item name"
            value={item.name}
            onChange={handleChange}
            required
            className="w-full border border-[#EADBC8] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7B2C2C]"
          />
        </div>

        <div>
          <label className="block text-[#5C1A1A] font-medium mb-1">Item Type</label>
          <select
            name="type"
            value={item.type}
            onChange={handleChange}
            required
            className="w-full border border-[#EADBC8] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7B2C2C]"
          >
            <option value="">Select Item Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>

        <div>
          <label className="block text-[#5C1A1A] font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Enter item description"
            required
            className="w-full border border-[#EADBC8] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#7B2C2C]"
          />
        </div>

        {/* <div>
          <label className="block text-[#5C1A1A] font-medium mb-1">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-[#5C1A1A] font-medium mb-1">Additional Images</label>
          <input
            type="file"
            name="additionalImages"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="w-full"
          />
        </div> */}

        <div>
  <label className="block text-[#5C1A1A] font-medium mb-1">Cover Image</label>
  <input
    type="file"
    name="coverImage"
    accept="image/*"
    onChange={handleImageChange}
    required
    className="block w-full text-sm text-[#5C1A1A] file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-[#EADBC8] file:text-[#5C1A1A]
               hover:file:bg-[#d5c3af] transition duration-200"
  />
</div>

<div>
  <label className="block text-[#5C1A1A] font-medium mb-1">Additional Images</label>
  <input
    type="file"
    name="additionalImages"
    accept="image/*"
    onChange={handleImageChange}
    multiple
    className="block w-full text-sm text-[#5C1A1A] file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:bg-[#EADBC8] file:text-[#5C1A1A]
               hover:file:bg-[#d5c3af] transition duration-200"
  />
</div>


        <button
          type="submit"
          className="w-full bg-[#7B2C2C] hover:bg-[#5C1A1A] text-white font-semibold px-6 py-2 rounded hover:shadow-md active:scale-95 transition duration-200"
        >
          ➕ Add Item
        </button>
      </form>
    </div>
  );
}