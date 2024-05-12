import { MongoClient, ServerApiVersion } from "mongodb";


export default async function handler(req, res) {
    const uri = process.env.DATABASE_URL;
  const { ObjectId } = require('mongodb');


    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
        try {
            await client.connect()
            const db = client.db("users");
            const collection = db.collection("products")

            const id = new ObjectId(req.query.id)
            collection.deleteOne({_id: id})
            res.status(200).json({"deleted":"true"})

        }

        catch (error) {
            console.log(error)
            res.status(500).json({"deleted":"false"})
            
        }
}