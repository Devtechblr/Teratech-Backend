import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Sessions
app.use(
  session({
    secret: "super-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "terratech_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("✅ Connected to MySQL");

  db.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `);

  db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2),
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.query(
    `
      INSERT INTO admins (email, password)
      SELECT 'admin@terratech.com', 'admin123'
      WHERE NOT EXISTS (SELECT * FROM admins WHERE email = 'admin@terratech.com')
    `,
    (err) => {
      if (!err) console.log("✅ Default admin ready");
    }
  );
});

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.admin) {
    return next();
  }
  res.status(401).json({ success: false, message: "Unauthorized" });
}

// POST: Admin login
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0) {
        req.session.admin = { email };
        res.json({ success: true, message: "Login successful" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
    }
  );
});

// GET: Admin dashboard (protected)
app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.json({
    success: true,
    message: "Authenticated",
    user: req.session.admin,
  });
});

// Public products route
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, products: results });
  });
});

// Protected add product
app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, price, image_url } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Product name is required" });

  db.query(
    "INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)",
    [name, description, price, image_url],
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

// Protected delete product
app.delete("/api/products/:id", isAuthenticated, (req, res) => {
  const productId = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", [productId], (err) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, message: "Product deleted successfully" });
  });
});

// Logout
app.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
