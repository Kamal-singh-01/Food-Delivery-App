import Order from "../models/Order.js";

//Place new Order
// POST  /api/orders
export const placeOrder = async (req , res)=>{
    const {items , totalAmount , address} = req.body;

    try {
        const order = await Order.create({
            userId:req.user._id || req.user.id,
            items,
            totalAmount,
            address
        })  
        res.status(201).json({success:true , message:"Order palced successfully" , order})  ;
    } catch (error) {
        res.status(500).json({success:false , message:error.message});
    }
}

// get logged-in user's order
//GET /api/orders/me
export const getMyOrders = async (req,res)=>{
    try {
        const orders = await Order.find({userId:req.user._id}).sort({createdAt:-1})
        res.status(200).json({success:true , data:orders});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// get all orders(admin only)
// GET /api/orders
export const getAllOrders = async (req ,res)=>{
    try {
        const orders = await Order.find({}).populate('userId' , 'name email').sort({createdAt:-1});
        res.status(200).json({success:true , data:orders});
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}

// update order status(admin only)
// POST /api/orders/:id
export const updateOrderStatus = async (req,res)=>{
    const {status} = req.body;
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,{status},{ new:true})
        if(!order) return res.status(404).json({success:false , message:"order not found"});
        res.status(200).json({success:true , message:"order status updated" , order});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}