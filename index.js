const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.da6po2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("foysal-portfolio");
    const projectsCollection = database.collection("projects");
    const reviewsCollection = database.collection("reviews");

    // all post operation are here 
    app.post('/projects', async(req, res) => {
      const postProjectInfo = req.body;
      console.log(postProjectInfo);
      const result = await projectsCollection.insertOne(postProjectInfo);
      res.send(result);
    });

    app.post('/reviews', async(req, res) => {
      const postReviews = req.body;
      console.log(postReviews);
      const result = await reviewsCollection.insertOne(postReviews);
      res.send(result);
    });

    // all get operation are here 
    app.get('/projects', async(req, res) => {
      const getProjects = projectsCollection.find();
      const result = await getProjects.toArray();
      res.send(result);
    });

    app.get('/reviews', async(req, res) => {
      const getReviews = reviewsCollection.find();
      const result = await getReviews.toArray();
      res.send(result);
    });





  } 
  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Portfolio Server Running!')
})

app.listen(port, () => {
  console.log(`Server On Running ${port}`)
})