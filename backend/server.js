import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import { Buffer } from "buffer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ------------------ MySQL connection ------------------
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  ssl: {
    ca: fs.readFileSync("/app/isrgrootx1.pem"),
  },
  waitForConnections: true,
  connectionLimit: 10, // adjust as needed
  queueLimit: 0,
});

// Optional: test the pool connection once
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection error:", err.code, err.message);
    return;
  }
  console.log("✅ Connected to MySQL (via pool)");
  connection.release(); // release back to pool
});

// ------------------ Middleware ------------------
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Log every incoming request
app.use(morgan("dev"));

// Custom logger
app.use((req, res, next) => {
  console.log("➡️ [REQUEST]", {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    session: req.session,
  });
  res.on("finish", () => {
    console.log("⬅️ [RESPONSE]", {
      statusCode: res.statusCode,
    });
  });
  next();
});

// ------------------ CORS ------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://terratech-dcs.netlify.app",
      "https://terratechaerospace.com",
      "https://www.terratechaerospace.com",
    ],
    credentials: true,
  })
);

app.set("trust proxy", 1); // trust first proxy

// ------------------ Sessions ------------------
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // set true in production with HTTPS
      httpOnly: true,
      sameSite: "none", // change to "none" + secure:true in production
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ------------------ Auth Middleware ------------------
function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    console.log("🔑 Authenticated admin:", req.session.admin);
    return next();
  }
  console.warn("⛔ Unauthorized access attempt");
  res.status(401).json({ success: false, message: "Unauthorized" });
}

// ------------------ Routes ------------------

// Admin login
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  console.log("🟢 Login attempt:", { email });

  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("❌ DB error during login:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length > 0) {
        req.session.admin = { email };
        console.log("✅ Login successful:", email);
        return res.json({ success: true, message: "Login successful" });
      }
      console.warn("⚠️ Invalid login:", email);
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  );
});

// Admin logout
app.post("/admin/logout", (req, res) => {
  console.log("🔴 Logout request:", req.session.admin);
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

// Dashboard
app.get("/dashboard", isAuthenticated, (req, res) => {
  console.log("📊 Dashboard accessed by:", req.session.admin);
  res.json({ success: true, admin: req.session.admin });
});

// Get products
app.get("/api/products", (req, res) => {
  console.log("📦 Fetching all products...");
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("❌ DB error fetching products:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    // Map results to convert Buffer image column (e.g., 'image_data')
    const products = results.map((product) => {
      if (product.image_data && Buffer.isBuffer(product.image_data)) {
        product.image_data = product.image_data.toString("base64");
      }
      return product;
    });
    console.log(`✅ Found ${products.length} products`);
    res.json({ success: true, products });
  });
});

// Add product
app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, image_data } = req.body;
  console.log("➕ Add product request:", { name, description });

  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Product name required" });

  const wordCount = description ? description.trim().split(/\s+/).length : 0;
  if (wordCount > 200)
    return res
      .status(400)
      .json({ success: false, message: "Description exceeds 200 words" });

  db.query(
    "INSERT INTO products (name, description, image_data) VALUES (?, ?, ?)",
    [name, description, image_data],
    (err, result) => {
      if (err) {
        console.error("❌ DB error inserting product:", err);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }
      console.log("✅ Product added:", { id: result.insertId, name });
      res.json({
        success: true,
        message: "Product added successfully",
        product_id: result.insertId,
      });
    }
  );
});

// Delete product
app.delete("/api/products/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  console.log("🗑️ Delete product request:", id);

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ DB error deleting product:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    console.log("✅ Product deleted:", id);
    res.json({ success: true, message: "Product deleted successfully" });
  });
});

// ------------------ Start server ------------------
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
