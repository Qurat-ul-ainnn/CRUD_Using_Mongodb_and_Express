const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Define the Pharmacy schema
const pharmacySchema = new mongoose.Schema({
  pharmacyName: {
    type: String,
    required: true,
  },
  pharmacistName: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    default: 0,
  },
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

mongoose
  .connect("mongodb://localhost:27017/PharmacyRecord", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Fetch all pharmacies
app.get("/fetchAllPharmacies", async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (error) {
    console.error("Error fetching pharmacy data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a specific pharmacy by ID
app.get("/fetchPharmacy/:pharmacyId", async (req, res) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const pharmacy = await Pharmacy.findById(pharmacyId);
    if (pharmacy) {
      res.json(pharmacy);
    } else {
      res
        .status(404)
        .json({ error: `Pharmacy with ID ${pharmacyId} not found` });
    }
  } catch (error) {
    console.error(`Error fetching pharmacy with ID ${pharmacyId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new pharmacy
app.post("/addPharmacy", async (req, res) => {
  const { pharmacyName, pharmacistName, income } = req.body;

  try {
    const newPharmacy = new Pharmacy({
      pharmacyName,
      pharmacistName,
      income,
    });
    const savedPharmacy = await newPharmacy.save();
    res.status(201).json(savedPharmacy);
  } catch (error) {
    console.error("Error adding pharmacy:", error);
    res.status(400).json({ error: "Failed to add pharmacy" });
  }
});

// Update a pharmacy by ID
app.put("/editPharmacy/:pharmacyId", async (req, res) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const updatedPharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPharmacy);
  } catch (error) {
    console.error(`Error updating pharmacy with ID ${pharmacyId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a pharmacy by ID
app.delete("/deletePharmacy/:pharmacyId", async (req, res) => {
  const pharmacyId = req.params.pharmacyId;

  try {
    const deletedPharmacy = await Pharmacy.findByIdAndDelete(pharmacyId);
    res.status(200).json(deletedPharmacy);
  } catch (error) {
    console.error(`Error deleting pharmacy with ID ${pharmacyId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
