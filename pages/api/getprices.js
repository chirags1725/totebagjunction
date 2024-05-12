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
    if(req.method == "POST"){
        try {
            await client.connect()
            const db = client.db("users");
            const collection = db.collection("products")

            // console.log(req.body[0][0])
            if(req.body.length == 0){
                res.status(401).json({"error":"Empty cart"})
            }

            const idQuantities = {};

            req.body.forEach(([id, quantity]) => {
                idQuantities[id] = (idQuantities[id] || 0) + quantity;
            });

            console.log(idQuantities)
            const result = Object.entries(idQuantities);
            const objIds = result.map(e=> new ObjectId(e[0]))

            const quantity = result.map(e=>e[1])

            // const ids = ["66372df67e20b9bc958f721d","66372c1b7e20b9bc958f721c"]
            // const ids = []
            // const titles = await ids.map(t=> new ObjectId(id))
            // let titles = ["1"]
            
            // const oid = new ObjectId("662ba39f6c5e34f28f553f32")
            const data = await collection.find({_id:{$in : objIds}}).toArray()
            // console.log(data.length)
            // const data = awaiåt collection.find().toArray()
            var prices = []
            data.map(e=>{
                prices.push(parseFloat(e.price))
            })
            for(let i=0;i<prices.length; i++){
                prices[i] *= quantity[i]
            }
            if(prices.length !== 0){
                const price = prices.reduce((a,b)=>a+b)
                console.log(price)
            res.status(200).json({"price":price})

        }
        else{
            res.status(501).json({"error":"No products found"})
        }

        } catch (error) {
            console.log(error)
            res.status(500).json({"error":"Some products in the cart are not found"})
            
        }
    }else{
        res.status(500).json({"error":"Invalid Method"})

    }
}