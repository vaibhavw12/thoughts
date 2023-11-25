const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

const Thoughts = mongoose.model('Thoughts',{
    title : String,
    data : String,
    date : String
})

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
    mongoose.connect('mongodb://localhost:27017')
    .then(()=>{
        console.log('db connected and server is running')
    }).catch((err)=>{
        console.log(err)
    })
    
})