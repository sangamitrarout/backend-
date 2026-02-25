require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
// Import MongoDB client and Express
const { MongoClient } = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MongoDB connection string
const uri = "mongodb+srv://sangamitrarout789_db_user:b4gDmtCZzwussMDh@cluster0.b8mjabg.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("portfolioDB");
    const collection = db.collection("messages");

    // Contact form endpoint
    app.post("/contact", async (req, res) => {
      const { name, email, message } = req.body;

      // Save message into MongoDB
      const result = await collection.insertOne({
        name,
        email,
        message,
        createdAt: new Date()
      });

      res.json({ success: true, id: result.insertedId });
    });

    // Start server on localhost:9900
    app.listen(9900, () => {
      console.log("Server running on http://localhost:9900");
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

run().catch(console.error);

