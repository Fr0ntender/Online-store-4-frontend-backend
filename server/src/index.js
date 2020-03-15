const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

const {
    setUpConnection,
    createProduct,
    changeProduct,
    deleteProduct,
    sortProduct,
    listProduct,
    findProduct
} = require('./utils');

const { PORT } = process.env;
// Initialization of express application
const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// app.use(express.static('client'))
// Using bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

// Set up connection of database
setUpConnection()

// RESTful api handlers
app.get('/api/products', (req, res) => {
    listProduct()
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/sort', (req, res) => {
    sortProduct(req.body.state, req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/find', (req, res) => {
    findProduct(req.body.name)
        .then(data => res.send(data))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/add', (req, res) => {
    createProduct(req.body)
        .then(() => res.send('succses'))
        .catch(err => res.send(`Error ${err}`))
})

app.post('/api/product/change/:id', (req, res) => {
    changeProduct(req.params.id, req.body)
        .then(() => res.send('succses'))
        .catch(err => res.send(`Error ${err}`))
})

app.delete('/api/product/:id', (req, res) => {
    deleteProduct(req.params.id)
        .then(() => res.send('succses'))
        .catch(err => res.send(`Error ${err}`))
})

// Entrypoint Client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'))
})

app.get('/callback', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})