import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductListing() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then(res => {
                if (res.data.success) {
                    setProducts(res.data.products);
                }
            })
            .catch(err => {
                console.error("Error fetching products:", err);
            });
    }, []);

    return (
        <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem", color: "#222", fontWeight: "700" }}>
                Our Products
            </h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >
                {products.map(p => (
                    <div
                        key={p.id}
                        style={{
                            background: "#fff",
                            borderRadius: "15px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            overflow: "hidden",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                        }}
                    >
                        <img
                            src={p.image_url}
                            alt={p.name}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover"
                            }}
                        />
                        <div style={{ padding: "18px" }}>
                            {/* Product Name */}
                            <h3 style={{
                                margin: "0 0 8px",
                                color: "#1a1a1a",
                                fontSize: "1.25rem",
                                fontWeight: "600",
                                letterSpacing: "0.5px"
                            }}>
                                {p.name}
                            </h3>

                            {/* Product Description */}
                            <p style={{
                                fontSize: "0.95rem",
                                color: "#555",
                                lineHeight: "1.5",
                                marginBottom: "12px",
                                minHeight: "50px"
                            }}>
                                {p.description}
                            </p>

                            {/* Product Price */}
                            {p.price && (
                                <p style={{
                                    fontWeight: "700",
                                    color: "#ff5722",
                                    fontSize: "1.3rem",
                                    marginTop: "5px"
                                }}>
                                    ${p.price}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
