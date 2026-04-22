const mongoose=require('mongoose')

const noteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:[{type:String}],
    pinned:{
        type:Boolean,
        default:false
    },
    color:{
        type:String,
        default:'#ffffff'
    }
},{timestamps:true})

