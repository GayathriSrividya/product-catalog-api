import { Document } from "mongoose"
export default interface Iproduct extends Document{
    _id:String
    pid:Number,
    name:String,
    price:Number,
    __v:String
}