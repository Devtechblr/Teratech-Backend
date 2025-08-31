import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  ssl: process.env.SSL_CA
    ? { ca: Buffer.from(process.env.SSL_CA, "base64").toString("utf8") }
    : undefined,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) return console.error("MySQL connection error:", err);
  console.log("✅ Connected to MySQL");
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);

// Session config
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      sameSite: "lax", // change to "none" + secure:true in production
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.admin) return next();
  res.status(401).json({ success: false, message: "Unauthorized" });
}

// Admin login
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length > 0) {
        req.session.admin = { email };
        return res.json({ success: true, message: "Login successful" });
      }
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  );
});

// Admin logout
app.post("/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true, message: "Logged out" }));
});

// Dashboard check
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ success: true, admin: req.session.admin });
});

// Products routes
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, products: results });
  });
});

app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, image_data } = req.body;
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
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      res.json({
        success: true,
        message: "Product added successfully",
        product_id: result.insertId,
      });
    }
  );
});

app.delete("/api/products/:id", isAuthenticated, (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, message: "Product deleted successfully" });
  });
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
