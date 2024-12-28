const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const uri = "mongodb+srv://pavan:pavan123@pavancluster.bej5p2q.mongodb.net/?retryWrites=true&w=majority&appName=pavanCluster"
app.use(bodyParser.json());

app.post('/data', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('arduino_data');
        const collection = database.collection('sensor_data');
        await collection.insertOne(req.body);
        res.status(200).send('Data inserted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error inserting data');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});