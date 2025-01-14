import {model, Schema, Types} from "mongoose";
import {IRefreshToken} from "../entitys/interfaces";
import bcrypt from "bcrypt";
import {hashPassword} from "../utils/utils";
import {logDebug} from "../utils/Logger";


const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
});

// Автоматическое удаление просроченных токенов
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

refreshTokenSchema.pre<IRefreshToken>("save", async function (next) {

    try {

        const salt = await bcrypt.genSalt(10);
        this.token = await bcrypt.hash(this.token, salt);
        await logDebug(`[RefreshToken] Hashed token: ${this.token}`);
        next();
    } catch (error: any) {
        next(error);
    }
})

const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema);

export default RefreshToken;