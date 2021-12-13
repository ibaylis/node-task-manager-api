const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


// middleware

// to serve static files
app.use(express.static('./public'))

app.use(express.json())

// routes

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)
// Notes

// app.get('/', (req, res)=>{
//     res.send('Task Manager App')
// })
// app.get('/hello', (req, res)=>{
//     res.send('Hello Task Manager App')
// })
// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new tasks
// app.get('/api/v1/tasks/:id') - get single tasks
// app.patch('/api/v1/tasks/:id') - update tasks
// app.delete('/api/v1/tasks/:id') - delete tasks

const port = process.env.PORT || 3000;
//PORT=6000 node app.js to have our application run on port 6000.
// Set the port to what is set otherwise use port 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();