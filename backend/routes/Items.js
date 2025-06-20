const express = require("express");
const multer = require("multer");
const path = require("path");
const Item = require("../models/Item");

const router = express.Router();

// Set up storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// GET all items
router.get("/", async (req, res) => {
  const items = await Item.find().sort({ _id: -1 });
  res.json(items);
});

// POST a new item
router.post("/", upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 5 }
]), async (req, res) => {
  try {
    const { name, type, description } = req.body;

    const coverImage = req.files.coverImage?.[0]?.filename || null;
    const additionalImages = req.files.additionalImages?.map(file => file.filename) || [];

    const newItem = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item", details: err });
  }
});

module.exports = router;
