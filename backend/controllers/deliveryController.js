import User from "../models/User.js";

// get all delivery boy

export const getDeliveryBoy = async (req, res) => {
  try {
    const deliveryBoys = await User.find({ role: "delivery" }, "-password");
    res.status(200).json({ success: true, data: deliveryBoys });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
