import { MongoClient, ServerApiVersion } from "mongodb";


export default async function handler(req, res) {

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
          .find()
          .sort({ _id: -1})
          .toArray();
    
        // collection.
    
        res.status(200).json(userdata);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } finally {
        await client.close();
      }
  
  }
  