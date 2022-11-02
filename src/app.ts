import express, {Application} from 'express'
import {router} from './routes/router'
import mongoose from 'mongoose'
import config from './config/config.json'
const port:Number = config.port

const options:object={
    useNewUrlParser:true
}

mongoose.connect(config.dbUri, options)


let app: Application = express()

app.use(express.json())


app.use('/', router)


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

export default app