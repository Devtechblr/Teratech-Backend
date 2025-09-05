import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ------------------ MySQL bootstrap ------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, // allow multiple SQL queries
  ssl: {
    ca: fs.readFileSync("./isrgrootx1.pem"),
  },
});

// Ensure DB + tables exist
const initDB = () => {
  db.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\`;`,
    (err) => {
      if (err) {
        console.error("❌ Error creating DB:", err);
        return;
      }
      console.log("✅ Database ensured");

      // Switch to DB
      db.changeUser({ database: process.env.DB_DATABASE }, (err2) => {
        if (err2) {
          console.error("❌ Error switching DB:", err2);
          return;
        }

        // Create tables
        const createTables = `
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          image_data LONGBLOB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

        db.query(createTables, (err3) => {
          if (err3) {
            console.error("❌ Error creating tables:", err3);
            return;
          }
          console.log("✅ Tables ensured");

          // Ensure default admin exists
          db.query(
            "SELECT * FROM admins WHERE email = ?",
            ["admin@terratech.com"],
            (err4, results) => {
              if (err4) {
                console.error("❌ Error checking default admin:", err4);
                return;
              }
              if (results.length === 0) {
                db.query(
                  "INSERT INTO admins (email, password) VALUES (?, ?)",
                  ["admin@terratech.com", "admin123"],
                  (err5) => {
                    if (err5) {
                      console.error("❌ Error inserting default admin:", err5);
                    } else {
                      console.log(
                        "✅ Default admin inserted (admin@terratech.com / admin123)"
                      );
                    }
                  }
                );
              } else {
                console.log("ℹ️ Default admin already exists");
              }
            }
          );
        });
      });
    }
  );
};

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err.code, err.message);
    return;
  }
  console.log("✅ Connected to MySQL");
  initDB();
});

// ------------------ Middleware ------------------
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(morgan("dev"));

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

// ------------------ Sessions ------------------
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production", // only force HTTPS in prod
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ------------------ Auth Middleware ------------------
function isAuthenticated(req, res, next) {
  if (req.session.admin) return next();
  res.status(401).json({ success: false, message: "Unauthorized" });
}

// ------------------ Routes ------------------
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

app.post("/admin/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true, message: "Logged out" }));
});

app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.json({ success: true, admin: req.session.admin });
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err)
      return res.status(500).json({ success: false, message: "Server error" });
    res.json({ success: true, products: results });
  });
});

app.post("/api/products", isAuthenticated, (req, res) => {
  const { name, description, image_data } = req.body;
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

// ------------------ Start server ------------------
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
