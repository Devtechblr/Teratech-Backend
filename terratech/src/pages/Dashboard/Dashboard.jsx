import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success"); // success or error
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(null); // Store ID of product being deleted

    // Check if logged in & load products
    useEffect(() => {
        axios
            .get("https://api.terratechaerospace.com/dashboard", { withCredentials: true })
            .then(() => fetchProducts())
            .catch(() => {
                window.location.href = "/admin";
            });
    }, []);


    const fetchProducts = () => {
        setLoading(true);
        axios
            .get("https://api.terratechaerospace.com/api/products", { withCredentials: true })
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setMessage("Failed to load products. Please try again.");
                setMessageType("error");
                setLoading(false);
            });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        try {
            const res = await axios.post(
                "https://api.terratechaerospace.com/api/products",
                {
                    name,
                    description,
                    price: parseFloat(price),
                    image_url: imageUrl,
                },
                { withCredentials: true }
            );
            setMessage(res.data.message);
            setMessageType("success");
            setName("");
            setDescription("");
            setPrice("");
            setImageUrl("");
            fetchProducts();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error adding product");
            setMessageType("error");
        } finally {
            setSubmitting(false);
        }
    };

    const deleteProduct = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        setDeleting(id);
        setMessage("");

        axios
            .delete(`https://api.terratechaerospace.com/api/products/${id}`, { withCredentials: true })
            .then(() => {
                setMessage("Product deleted successfully");
                setMessageType("success");
                fetchProducts();
            })
            .catch((err) => {
                setMessage(err.response?.data?.message || "Error deleting product");
                setMessageType("error");
            })
            .finally(() => {
                setDeleting(null);
            });
    };

    const handleLogout = () => {
        axios
            .post("https://api.terratechaerospace.com/admin/logout", {}, { withCredentials: true })
            .then(() => {
                window.location.href = "/admin";
            })
            .catch((err) => {
                console.error("Logout error:", err);
                // Force logout even if there's an error
                window.location.href = "/admin";
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <img
                            src="/favicon-removebg-preview.png"
                            alt="TerraTech Logo"
                            className="h-10 w-auto mr-4"
                        />
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="/products"
                            className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-300 rounded-md font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            View Products Page
                        </a>
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z" clipRule="evenodd" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 text-sm rounded-lg border flex items-center ${messageType === 'success' ? 'text-green-700 bg-green-100 border-green-200' : 'text-red-700 bg-red-100 border-red-200'}`}>
                        {messageType === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        )}
                        {message}
                    </div>
                )}

                {/* Add Product Form */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Add New Product</h2>
                    <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold shadow-md flex justify-center items-center"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                        Adding Product...
                                    </>
                                ) : (
                                    'Add Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Products List */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Existing Products</h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-gray-600 text-lg mb-2">No products found</p>
                            <p className="text-gray-500">Add your first product using the form above</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="h-48 bg-gray-200 relative">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/favicon-removebg-preview.png';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <img
                                                    src="/favicon-removebg-preview.png"
                                                    alt="No image"
                                                    className="h-20 w-auto opacity-50"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-blue-600">${parseFloat(product.price).toFixed(2)}</p>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                disabled={deleting === product.id}
                                                className={`flex items-center px-3 py-1.5 rounded text-white ${deleting === product.id ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                                            >
                                                {deleting === product.id ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Delete
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
