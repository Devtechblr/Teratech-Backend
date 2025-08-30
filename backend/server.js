import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Update MySQL configuration to handle large packets
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: process.env.DB_CHARSET,
  ssl: {
    ca: fs.readFileSync(
      "C:\\Users\\yoges\\OneDrive\\Desktop\\TerraTech - Copy\\backend\\isrgrootx1.pem"
    ), // 👈 Path to downloaded CA cert
  },
  maxAllowedPacket: 16777216, // 16MB
});

// Update middleware configuration with increased limits
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add these lines before other middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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
      image_data LONGTEXT,
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
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    res.json({ success: true, products: results });
  });
});

// Helper function to count words
function countWords(str) {
  return str.trim().split(/\s+/).length;
}

// Protected add product with word limit
app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, image_data } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Product name is required",
    });
  }

  if (description && countWords(description) > 200) {
    return res.status(400).json({
      success: false,
      message: "Description must not exceed 200 words",
      wordsCount: countWords(description),
      wordsRemaining: 200 - countWords(description),
    });
  }

  db.query(
    "INSERT INTO products (name, description, image_data) VALUES (?, ?, ?)",
    [name, description, image_data],
    (err, result) => {
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }
      res.json({
        success: true,
        message: "Product added successfully",
        product_id: result.insertId,
        wordsCount: description ? countWords(description) : 0,
        wordsRemaining: description ? 200 - countWords(description) : 200,
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

// Utility function to convert image URL to base64
async function convertImageToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    const base64String = buffer.toString("base64");
    const mimeType = response.headers["content-type"];
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
}

// New endpoint to convert URL to base64
app.post("/api/convert-image", isAuthenticated, async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res
      .status(400)
      .json({ success: false, message: "Image URL is required" });
  }

  try {
    const base64Data = await convertImageToBase64(imageUrl);
    if (!base64Data) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to convert image" });
    }
    res.json({ success: true, base64Data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update existing product with base64 image
app.put("/api/products/:id/update-image", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { image_data } = req.body;

  db.query(
    "UPDATE products SET image_data = ? WHERE id = ?",
    [image_data, id],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      res.json({
        success: true,
        message: "Product image updated successfully",
      });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
