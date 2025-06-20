import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ViewItems({ items }) {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#7B2C2C] mb-6 text-center md:text-left">
                All Items
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {items.map((item) => (
                    <div
                        key={item._id}
                        onClick={() => setSelectedItem(item)}
                        className="cursor-pointer bg-white border border-[#EADBC8] rounded-lg p-3 shadow hover:shadow-xl transition"
                    >
                        <img
                            src={`http://localhost:5000/uploads/${item.coverImage}`}
                            alt={item.name}
                            className="h-40 w-full object-cover rounded"
                        />
                        <h3 className="mt-2 text-sm md:text-base font-semibold text-[#5C1A1A] text-center">
                            {item.name}
                        </h3>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.85)] flex justify-center items-center z-50 px-4">
                    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md sm:max-w-xl md:max-w-2xl relative shadow-lg transition-all transform scale-95 hover:scale-100 duration-300">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
                            title="Close"
                        >
                            ❌
                        </button>
                
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#5C1A1A] mb-3 tracking-wide">
                            {selectedItem.name}
                        </h2>

                        <p className="text-sm sm:text-base text-[#7B2C2C] font-medium mb-1">
                            <span className="font-semibold">Type:</span> {selectedItem.type}
                        </p>

                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                            {selectedItem.description}
                        </p>

                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            showIndicators={
                                (selectedItem.additionalImages || []).length > 0
                            }
                            className="rounded overflow-hidden"
                        >
                            <div>
                                <img
                                    src={`http://localhost:5000/uploads/${selectedItem.coverImage}`}
                                    alt="cover"
                                    className="aspect-square h-100 w-full object-contain rounded"
                                />
                            </div>
                            {(selectedItem.additionalImages || []).map((img, index) => (
                                <div key={index}>
                                    <img
                                        src={`http://localhost:5000/uploads/${img}`}
                                        alt={`additional-${index}`}
                                        className="aspect-square h-100 w-full object-contain rounded"
                                    />
                                </div>
                            ))}
                        </Carousel>

                        <button
                            onClick={() => {
                                fetch("http://localhost:5000/api/send-email", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ item: selectedItem.name }),
                                })
                                    .then((res) => {
                                        if (!res.ok) throw new Error("Failed to send email");
                                        return res.json();
                                    })
                                    .then((data) => {
                                        alert(
                                            data.success
                                                ? "✅ Enquiry email sent successfully!"
                                                : "⚠️ Email not sent. Please try again."
                                        );
                                    })
                                    .catch((err) => {
                                        console.error("Email error:", err);
                                        alert("❌ Something went wrong while sending email.");
                                    });
                            }}
                            className="mt-4 bg-[#7B2C2C] text-white px-4 py-2 rounded hover:bg-[#5C1A1A] transition w-full sm:w-auto"
                        >
                            Enquire
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
