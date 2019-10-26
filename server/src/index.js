const bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors');

const {
    setUpConnection,
    createProduct,
    changeProduct,
    deleteProduct,
    sortProduct,
    listProduct,
    findProduct
} = require('./utils');

const { LS_PORT } = process.env;
// Initialization of express application
const app = express();

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// app.use(express.static('client'))
// Using bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Set up connection of database
setUpConnection()

// Entrypoint
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/index.html'))
})

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

app.listen(LS_PORT, () => {
    console.log(`Server running on http://localhost:${LS_PORT}`)
})