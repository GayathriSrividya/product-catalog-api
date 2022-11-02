import express from 'express'
import Product from '../models/model'
let router=express.Router()


router.get('/', (req, res)=>{
    res.send('hello, welcome to our product catalog')
})

router.get('/products', async(req, res)=>{
    try{
        let prod  = await Product.find()
        res.status(200)
        res.json(prod)
         }
         catch(err){
            res.send(err)
         }
})

router.get('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await Product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
    }
    else{
    res.send(prod)
    }}
    catch(err)
    {   
        res.status(400).json(err)
    }})

router.post('/products', async(req, res)=>{
    try{
        const newEntry=new Product({
            pid:req.body.pid,
            name:req.body.name,
            price:req.body.price
        })
        await newEntry.save()
        res.status(200).send(newEntry)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
})

router.put('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await Product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
        return
    }
    Product.updateOne(req.body)
    res.status(200).send('entry updated successfully')
    
    }
    catch(err)
    {   
        res.status(400).json(err)
    }})

router.delete('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await Product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
        return
    }
    await Product.deleteOne({"pid":pid})
    res.status(200).send('entry deleted')
    }
    catch(err)
    {   
        res.status(400).json(err)
    }})

export {router}