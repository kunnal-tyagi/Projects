const mongoose=require("mongoose")

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    },
{timestamps:true}
)

const Notes=mongoose.model("Notes",noteSchema);
export default Notes;