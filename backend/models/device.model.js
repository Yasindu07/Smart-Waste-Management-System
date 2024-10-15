import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    wasteType: {
        type: String,
        required: true,
        enum: ["recyclable", "non-recyclable", "organic"],
    },
    wasteLevel: {
        organic: { type: Number, required: true },
        recycle: { type: Number, required: true },
        nonRecycle: { type: Number, required: true },
    },
    userId: {
        type: String, 
        required: true,
    },
}, { timestamps: true });

const Device = mongoose.model('Device', deviceSchema);

export default Device;