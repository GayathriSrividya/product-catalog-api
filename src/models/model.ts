import mongoose, {Schema} from "mongoose"
import Iproduct from '../interfaces/product'

const ProdSchema:Schema=new Schema({
    pid:{type:Number, required:true, unique:true},
    name:{type:String, required:true},
    price:{type:Number, required:true}
})


export default mongoose.model<Iproduct>('Product', ProdSchema)