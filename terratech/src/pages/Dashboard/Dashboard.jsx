import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [submitting, setSubmitting] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        // Check if logged in
        axios.get("/dashboard", { withCredentials: true })
            .then(() => fetchProducts())
            .catch(() => window.location.href = "/admin/login");
    }, []);

    const fetchProducts = () => {
        axios.get("https://terratechdb.onrender.com/api/products", { withCredentials: true })
            .then(res => setProducts(res.data.products))
            .catch(() => setMessage("Failed to load products"));
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        if (words <= 200) {
            setDescription(text);
            setWordCount(words);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        if (!name.trim()) return setMessage("Product name required");

        setSubmitting(true);
        try {
            const res = await axios.post(
                "/api/products",
                { name, description, image_data: imagePreview },
                { withCredentials: true }
            );
            setMessage(res.data.message);
            setMessageType("success");
            setName(""); setDescription(""); setImagePreview(null); setWordCount(0);
            fetchProducts();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error adding product");
            setMessageType("error");
        } finally {
            setSubmitting(false);
        }
    };

    const deleteProduct = (id) => {
        axios.delete(`https://terratechdb.onrender.com/api/products/${id}`, { withCredentials: true })
            .then(() => fetchProducts())
            .catch(err => setMessage(err.response?.data?.message || "Error deleting product"));
    };

    const handleLogout = () => {
        axios.post("https://terratechdb.onrender.com/admin/logout", {}, { withCredentials: true })
            .then(() => window.location.href = "/admin/login")
            .catch(() => window.location.href = "/admin/login");
    };

    return (
        <div className="p-6">
            <button onClick={handleLogout} className="mb-4 bg-red-500 text-white px-3 py-2 rounded">Logout</button>
            {message && <div className={messageType === "success" ? "text-green-700" : "text-red-700"}>{message}</div>}

            <form onSubmit={addProduct} className="mb-6">
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 mr-2" />
                <input type="file" onChange={handleImageChange} className="border p-2 mr-2" />
                <textarea placeholder="Description" value={description} onChange={handleDescriptionChange} className="border p-2 mr-2"></textarea>
                <button type="submit" disabled={submitting} className="bg-blue-500 text-white px-3 py-2 rounded">Add Product</button>
            </form>

            <div>
                {products.map(p => (
                    <div key={p.id} className="border p-2 mb-2">
                        <strong>{p.name}</strong>
                        {p.image_data && <img src={p.image_data} alt={p.name} className="h-20" />}
                        <p>{p.description}</p>
                        <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
