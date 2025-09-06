import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  ssl: {
    ca: fs.readFileSync("./isrgrootx1.pem"),
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err.code, err.message);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// CORS
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

// Session config (cross-site safe)
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // must be true for HTTPS
      httpOnly: true,
      sameSite: "none", // allow cross-site cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.status(401).json({ success: false, message: "Unauthorized" });
}

// ✅ Admin login
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM admins WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length > 0) {
        const admin = results[0];
        req.session.user = { id: admin.id, email: admin.email }; // 👈 important
        return res.json({ success: true, message: "Login successful" });
      }
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  );
});

// ✅ Admin logout
app.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // clear session cookie
    res.json({ success: true, message: "Logged out" });
  });
});

// ✅ Dashboard check
app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.json({ success: true, user: req.session.user });
});

// ✅ Products routes
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, products: results });
  });
});

app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, price, image_url } = req.body;
  if (!name)
    return res
      .status(400)
      .json({ success: false, message: "Product name required" });

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
