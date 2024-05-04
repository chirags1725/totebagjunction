// import { MongoClient, ServerApiVersion } from "mongodb";


// export default async function handler(req, res) {

//     const uri = process.env.DATABASE_URL;

//     const client = new MongoClient(uri, {
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//       },
//     });
//     try {
//         await client.connect();
    
//         const database = client.db("users");
//         const collection = database.collection("products");
    
//         const userdata = await collection
//           .find()
//           .toArray();
    
//         // collection.
    
//         res.status(200).json(userdata);
//       } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//       } finally {
//         await client.close();
//       }
  
//   }
  

// pages/api/postJson.js

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { jsonData } = req.body;

    // Connect to MongoDB
    const client = new MongoClient(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    try {
      await client.connect();
      
      const db = client.db("users");
      const collection = db.collection('products'); // Change 'yourCollection' to your actual collection name
      
      // Insert the JSON data into MongoDB
      const result = await collection.insertOne(jsonData);
      
      res.status(201).json({ message: 'JSON data posted successfully', result });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
