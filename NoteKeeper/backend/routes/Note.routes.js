const express=require('express')
const router=express.Router()
const {CreateNote}=require('../controllers/NoteContrlo.js')
router.post("/CreateNote",CreateNote)

module.exports=router