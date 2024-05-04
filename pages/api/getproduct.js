import { MongoClient, ServerApiVersion } from "mongodb";


export default async function handler(req, res) {
  const { ObjectId } = require('mongodb');

// Check if the ID provided in the query is a valid ObjectID
if (!ObjectId.isValid(req.query.id)) {
  // Return an error response indicating invalid ID
  return res.status(400).json({ message: 'Invalid ID' });
}
var o_id = new ObjectId(req.query.id);


    const uri = process.env.DATABASE_URL;

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
        await client.connect();
    
        const database = client.db("users");
        const collection = database.collection("products");
    
        const userdata = await collection
          .find({"_id" : o_id})
          .toArray()
    
        // collection.
    
        res.status(200).json(userdata);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } finally {
        await client.close();
      }
  
  }
  