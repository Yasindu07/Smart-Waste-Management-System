import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    wasteType: {
        type: String,
        required: true,
        enum: ["recyclable", "non-recyclable", "organic"],
    },
    wasteLevel: {
        type: Number,
        required: true,
    },
    user: {
        type: Object, 
        required: true,
    },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

export default Device;