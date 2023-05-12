import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import 'dotenv/config'

//mongoose connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})


//npm start
const app = express()
const PORT = 3000
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))


//bodyParser setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
)

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
)