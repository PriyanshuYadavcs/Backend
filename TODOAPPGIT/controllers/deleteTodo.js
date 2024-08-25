const Todo= require("../models/Todo"); 

exports.deleteTodo= async (req, res)=>{
    try{
        const {id}= req.params; 
        await Todo.findByIdAndDelete({id});
        res.json({
            success:true, 
            message:"TODO DELETED SUCCESSFULLY"
        })
    }
    catch(err){
        res.status(500).json({
            success:false, 
            error:err.message, 
            message:"server error", 
        })
    }
}