// required packages for backend
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

// model for mongodb database
const Thoughts = mongoose.model('Thoughts',{
    title : String, 
    data : String,
    date : String
})

// home route for calling get request using api 
app.get('/', async (req , res)=>{
    try{
       const getData = await Thoughts.find() 
       res.json({
        status : 'SUCCESS',
        data : getData
    })
    }catch(err){
        res.json({
            status : 'FAILED'
        })
        console.log(err)
    }
})

// post request for sending data from client to server using api
app.post('/', async (req , res)=>{
    try{
        const {title, data, date} = req.body
        // console.log(req.body)
        await Thoughts.create({title, data, date,})
        res.json({
         status : 'SUCCESS',
        })
     }catch(err){
         res.json({
             status : 'FAILED'
         })
         console.log(err)
     }
})

// api for updating or modifying the info send by the client
app.put('/:id', async (req , res)=>{
    const cardId = req.params.id;
    // const updatedText = req.body.data;
    const updatedText = req.body.text;
    // console.log(cardId)
    // console.log(req.body)
    try{
        await Thoughts.findByIdAndUpdate(cardId, { data: updatedText })
        res.json({
            status : 'SUCCESS',
        })
     }catch(err){
         res.json({
            status : 'FAILED'
         })
         console.log(err)
     }
})

// deleting the card using delete request
app.delete('/:id', async (req , res)=>{
    const cardId = req.params.id;
    // console.log(cardId)
    try{
        await Thoughts.findByIdAndDelete(cardId)
        res.json({
            status : 'SUCCESS',
        })
     }catch(err){
         res.json({
            status : 'FAILED'
         })
         console.log(err)
     }
})

app.listen(process.env.PORT, ()=>{
    // mongodb connection using mongodb compass and mongoose package
    mongoose.connect('mongodb://localhost:27017')
    .then(()=>{
        console.log('db connected and server is running')
    }).catch((err)=>{
        console.log(err)
    })
    
})