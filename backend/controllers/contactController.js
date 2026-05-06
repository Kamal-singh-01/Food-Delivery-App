import Contact from "../models/Contact.js";

// Create a new message - POST /api/contact
export const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    // validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }
    const contact = await Contact.create({ name, email, subject, message });
    res
      .status(201)
      .json({ success: true, message: "message sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all message(Admin) - GET /api/contact
export const getAllMessage = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// mark message as read(Admin) - POST /api/contact/:id
export const markAsRead = async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );
    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete message (Admin) - DELETE /api/contact/:id
export const deleteMessage = async (req ,res)=>{
    try {
        const message = await Contact.findByIdAndDelete(req.params.id );
        if(!message){
            return res.status(404).json({success:false , message:"Message not found" , data:message});
        }
        res.status(200).json({success:true , message:"Message deleted"});
    } catch (error) {
        res.status(500).json({success:false , message:error.message});
    }
}
