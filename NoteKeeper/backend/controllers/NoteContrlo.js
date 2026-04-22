const Note=require('../models/Notes')

exports.getNotes=async(req,res)=>{
    const notes=await Note.find({user:req.user._id}).sort({pinned:-1,updatedAt:-1});
    res.json(notes);
};

exports.createNote=async(req,res)=>{
    const {title,content,tags,color}=req.body;
    const note=await Note.create({user:req.user._id,title,content,tags,color});
    res.status(201).json(note);
};

exports.updateNote=async(req,res)=>{
    const note=await Node.findOneAndUpdate({
        _id:req.params.id;
        user:req.user._id
    },
req.body,
{new:true}
);
if(!note) return res.status(404).json({message:'Note not found'});
res.json(note);
}

exports.deleteNote=async(req,res)=>{
    await Note.findOneAndDelete({
        _id:req.params.id,
        user:req.user._id
    });
    res.json({message:'Note deleted'});
}