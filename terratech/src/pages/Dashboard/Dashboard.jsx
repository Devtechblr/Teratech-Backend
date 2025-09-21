import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    // Remove the unused Buffer import since we're not using base64 anymore
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null); // Store the file object
    const [previewUrl, setPreviewUrl] = useState(""); // blob URL for preview
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(null);


    // Fetch user and products
    useEffect(() => {
        axios
            .get("https://api.terratechaerospace.com/dashboard", { withCredentials: true })
            .then(() => fetchProducts())
            .catch(() => {
                window.location.href = "/admin";
            });

        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Clean up preview URL on unmount or when image changes
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);


    const fetchProducts = () => {
        setLoading(true);
        axios
            .get("https://api.terratechaerospace.com/api/products", { withCredentials: true })
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch(() => {
                setMessage("Failed to load products. Please try again.");
                setMessageType("error");
                setLoading(false);
            });
    };


    const addProduct = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage("");

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await axios.post(
                "https://api.terratechaerospace.com/api/products",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMessage(res.data.message || "Product added");
            setMessageType("success");
            setName("");
            setDescription("");
            setImageFile(null);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl("");
            }
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
            .catch(() => {
                window.location.href = "/admin";
            });
    };

    const handleDescriptionChange = (e) => {
        const words = e.target.value.trim().split(/\s+/);
        if (words.length <= 200) {
            setDescription(e.target.value);
        }
    };

    // File input handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <div className="flex items-center text-center sm:text-left">
                        <img
                            src="/favicon-removebg-preview.png"
                            alt="TerraTech Logo"
                            className="h-10 w-auto mr-2 sm:mr-4"
                        />
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Admin Dashboard
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <a
                            href="/products"
                            className="inline-flex justify-center items-center px-4 py-2 text-sm sm:text-base bg-blue-100 border border-blue-300 rounded-md font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            View Products
                        </a>
                        <button
                            onClick={handleLogout}
                            className="inline-flex justify-center items-center px-4 py-2 text-sm sm:text-base bg-gray-100 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-3 sm:p-4 text-sm rounded-lg border flex items-center ${messageType === "success"
                            ? "text-green-700 bg-green-100 border-green-200"
                            : "text-red-700 bg-red-100 border-red-200"
                            }`}
                    >
                        {message}
                    </div>
                )}

                {/* Add Product Form */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                        Add New Product
                    </h2>
                    <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {(previewUrl) && (
                                <div className="mt-3">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-24 w-24 object-cover rounded border"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description (max 200 words)
                            </label>
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter product description"
                                rows="4"
                                className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1">
                                {description.trim().split(/\s+/).filter(Boolean).length}/200 words
                            </p>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold shadow-md flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {submitting ? "Adding Product..." : "Add Product"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Products List */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
                    <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                        Existing Products
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center h-40 sm:h-64">
                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center border border-gray-200">
                            <p className="text-gray-600 text-base sm:text-lg mb-2">No products found</p>
                            <p className="text-gray-500 text-sm">Add your first product using the form above</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                                >
                                    {/* Image */}
                                    <div className="h-40 sm:h-48 bg-gray-200 relative">
                                        <img
                                            src={product.image_data}
                                            alt={product.name}
                                            className="w-full h-full object-cover"

                                        />
                                    </div>


                                    {/* Content */}
                                    <div className="p-4 sm:p-5">
                                        <h3 className="font-semibold text-base sm:text-lg text-gray-800 mb-2 line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                disabled={deleting === product.id}
                                                className={`flex items-center px-3 py-1.5 rounded text-white text-sm sm:text-base ${deleting === product.id ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                                                    }`}
                                            >
                                                {deleting === product.id ? "Deleting..." : "Delete"}
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
