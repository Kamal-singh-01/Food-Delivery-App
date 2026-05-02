import Food from '../models/Food.js';
import  cloudinary from '../utils/cloudinary.js';

// get all food items get  /api/foods
export const getAllFood = async (req,res)=>{
    try{
        const foods = await Food.find({});
        res.status(200).json({success:true , data:foods});
    }catch(error){
        res.status(500).json({success:false,message:error.message})
    }
};

// get food by category  /api/foods/:category
export const getFoodsByCategory = async (req ,res)=>{
    try {
        const foods = await Food.find({category:req.params.category});
        res.status(200).json({success:true,data:foods});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//Post /api/foods (admin only)
export const addFood = async (req,res)=>{
    try {
        const {name ,description , price , category} = req.body;
        const image = req.file?.path;
        if(!image){
            return res.status(400).json({success:false , message:"image is required"});
        }
        const food = await Food.create({name , description , price , category , image});
        res.status(201).json({success:true , data:food});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//Delete /api/foods/:id (admin only)
export const deleteFood = async (req,res)=>{
    try{
        const food = await Food.findOneById(req.params.id);
    if(!food) {
        return res.status(404).json({success:false , message:"item not found"});
    }
     const publicId = food.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`food-delivery/${publicId}`);
    await food.deleteOne();
     res.status(200).json({ success: true, message: 'Food deleted' });
    }catch(error){
         res.status(500).json({ success: false, message: error.message });
    }
}