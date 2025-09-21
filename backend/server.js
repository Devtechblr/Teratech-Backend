import express from "express";
import cors from "cors";
import mysql from "mysql2";
import session from "express-session";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import multer from "multer";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

dotenv.config({ path: '.env' });

// ------------------ S3 Configuration ------------------
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const s3Config = {
    bucket: process.env.S3_BUCKET_NAME,
    region: process.env.AWS_REGION,
};

// ------------------ Multer Configuration ------------------
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadSingle = (fieldName) => {
    return (req, res, next) => {
        const uploadSingle = upload.single(fieldName);
        uploadSingle(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message || 'Error uploading file',
                });
            }
            next();
        });
    };
};

// ------------------ S3 Utility Functions ------------------
const uploadFileToS3 = async (file, folder = '') => {
    try {
        const fileName = `${folder}${Date.now()}-${file.originalname}`;
        const params = {
            Bucket: s3Config.bucket,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: s3Config.acl
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        
        const fileUrl = `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com/${encodeURIComponent(fileName)}`;
        
        return {
            success: true,
            url: fileUrl,
            key: fileName
        };
    } catch (error) {
        console.error('Error uploading to S3:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

const deleteFileFromS3 = async (fileKey) => {
    try {
        const params = {
            Bucket: s3Config.bucket,
            Key: fileKey
        };

        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        
        return {
            success: true,
            message: 'File deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting from S3:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

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
  ssl: process.env.NODE_ENV === 'production' 
    ? { ca: fs.readFileSync("/app/isrgrootx1.pem") }
    : { ca: fs.readFileSync("./isrgrootx1.pem") },
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
      secure: false, // set true in production with HTTPS
      httpOnly: true,
      sameSite: "lax", // change to "none" + secure:true in production
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
  db.query("SELECT id, name, description, image_data, created_at FROM products", (err, results) => {
    if (err) {
      console.error("❌ DB error fetching products:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    
    console.log("🔍 Raw database results:", JSON.stringify(results, null, 2));
    
    const products = results.map(product => {
      console.log(`🖼️ Processing product ${product.id} - Image data: ${product.image_data ? 'exists' : 'null'}`);
      if (product.image_data) {
        console.log(`   Image URL: ${product.image_data}`);
      }
      return {
        ...product,
        // Rename image_data to image_url for frontend compatibility
        image_url: product.image_data || null
      };
    });
    
    console.log(`✅ Found ${products.length} products`);
    console.log("📤 Sending products to client:", JSON.stringify(products, null, 2));
    res.json({ success: true, products });
  });
});

// Add product with image upload
app.post("/api/products", isAuthenticated, uploadSingle('image'), async (req, res) => {
  const { name, description } = req.body;
  console.log("➕ Add product request:", { name, description });

  if (!name) {
    return res.status(400).json({ 
      success: false, 
      message: "Product name is required" 
    });
  }

  const wordCount = description ? description.trim().split(/\s+/).length : 0;
  if (wordCount > 200) {
    return res.status(400).json({ 
      success: false, 
      message: "Description exceeds 200 words" 
    });
  }

  try {
    let imageUrl = null;
    
    // If there's a file, upload it to S3
    if (req.file) {
      const uploadResult = await uploadFileToS3(req.file, 'products/');
      if (!uploadResult.success) {
        throw new Error('Failed to upload image to S3');
      }
      imageUrl = uploadResult.url;
    }

    // Save product to database with image URL
    db.query(
      "INSERT INTO products (name, description, image_data) VALUES (?, ?, ?)",
      [name, description, imageUrl],
      (err, result) => {
        if (err) {
          console.error("❌ DB error inserting product:", err);
          // If there was an error, delete the uploaded file from S3
          if (imageUrl) {
            const key = imageUrl.split('/').slice(3).join('/');
            deleteFileFromS3(key).catch(console.error);
          }
          return res.status(500).json({ 
            success: false, 
            message: "Error saving product to database" 
          });
        }
        
        console.log("✅ Product added:", { id: result.insertId, name });
        res.json({
          success: true,
          message: "Product added successfully",
          product: {
            id: result.insertId,
            name,
            description,
            image_url: imageUrl
          }
        });
      }
    );
  } catch (error) {
    console.error("❌ Error in product creation:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error processing your request",
      error: error.message 
    });
  }
});

// Delete product
app.delete("/api/products/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  console.log("🗑️ Delete product request:", id);

  try {
    // First, get the product to find the image URL
    db.query("SELECT image_data FROM products WHERE id = ?", [id], async (err, results) => {
      if (err) {
        console.error("❌ DB error finding product:", err);
        return res.status(500).json({ success: false, message: "Error finding product" });
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      const product = results[0];
      
      // If the product has an image, delete it from S3
      if (product.image_data) {
        // Extract the key from the URL
        const key = product.image_data.split('/').slice(3).join('/');
        await deleteFileFromS3(key);
      }

      // Now delete the product from the database
      db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
        if (err) {
          console.error("❌ DB error deleting product:", err);
          return res.status(500).json({ 
            success: false, 
            message: "Error deleting product from database" 
          });
        }
        
        console.log("✅ Product deleted:", id);
        res.json({ 
          success: true, 
          message: "Product and associated image deleted successfully" 
        });
      });
    });
  } catch (error) {
    console.error("❌ Error in product deletion:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error processing your request",
      error: error.message 
    });
  }
});

// ------------------ Start server ------------------
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
