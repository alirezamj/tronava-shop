import mongoose from "mongoose";

export function isValidObject(id) {
    return mongoose.Types.ObjectId.isValid(id);
}