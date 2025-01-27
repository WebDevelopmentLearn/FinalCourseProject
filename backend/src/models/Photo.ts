import mongoose, {Expression, Model} from "mongoose";
import {IPhotoDoc} from "../entitys/interfaces";

const PhotoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: { // добавляем поле для public_id
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
});

const Photo: Model<IPhotoDoc> = mongoose.model<IPhotoDoc>("Photo", PhotoSchema);

export default Photo;