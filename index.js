import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000


// <- -- when we send data to the client according to request url -- ->

app.get("/", (req, res) => {
    res.send("Hello Express!")
})

app.get("/ice-tea", (req, res) => {
    res.send("What is ice tea, would you prefer?")
})

app.get("/twitter", (req, res) => {
    res.send("sankhadip.com")
})


// middleware
// any data that comes up in json format, we except that
app.use(express.json())

let teaData = []
let nextId = 1


// save the data in database
app.post('/teas', (req, res) => {
    const {name, price} = req.body  // destructuring the body for extract the data
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

// get a tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))  // in the find method it goes back to every single entity of the array
    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea)
})

// update tea
app.put('/teas/:id', (req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// delete tea
app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(index, 1)
    return res.status(200).send('deleted')
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}...`)
})