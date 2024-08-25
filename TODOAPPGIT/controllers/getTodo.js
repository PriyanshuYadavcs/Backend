const Todo= require("../models/Todo");

exports.getTodos= async(req, res)=>{
    try{
        const todos= await Todo.find({});

        res.status(200).json({
            success:true,
            data:todos, 
            message:"ENTIRE TODO DATA BASE IS FETCHED",
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            error:err.message, 
            message: "server error",
        });
    };
};


exports.getTodobyId= async(req, res)=>{
    try{
        const id= req.params.id; 
        const todo= await Todo.findById({_id: id}); 
        if(!todo){
            return res.status(404).json({
                success:false, 
                message:" no data found with given id"
            })
        }
        res.status(200).json({
            success:true, 
            data: todo, 
            message:"success"
        })
    }
    catch (err){
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Server error",
        });

    }
};
