const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w75vwv7.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//available categories
async function run(){
    try{
        const categoryCollection = client.db('iSellsDotCom').collection('categories');

        app.get('/categories', async(req,res)=>{
            const query = {};
            const cursor = categoryCollection.find(query)
            const categories = await cursor.toArray()
            res.send(categories);
        })
        
    }
    finally{

    }
}
run().catch(err=>{console.error(err)})

/* async function run() {
    try {
        const categoriesCollection = client.db("iSellsDotCom").collection("categories");

        app.get('/categoriesCollection', async(req,res)=>{
            const query = {};
            const options = await categoriesCollection.find(query).toArray();
            res.send(options);
        })

    }
    finally {

    }
}
run().catch(console.log) */
app.get('/', async (req, res) => {
    res.send('iSells.com server is running');
})

app.listen(port, () => console.log(`iSells.com running on port ${port}`))
