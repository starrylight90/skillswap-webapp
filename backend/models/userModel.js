import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    skills: {
        type: [String],
        required: true
    },
    photos: {
        type: [{
            data: Buffer,
            contentType: String
        }],
        validate: {
            validator: function (value) {
                return value.length <= 3;
            },
            message: 'Photos should not exceed 3'
        }
    },
    videos: {
        type: [{
            data: Buffer,
            contentType: String
        }],
        validate: {
            validator: function (value) {
                return value.length <= 2;
            },
            message: 'Videos should not exceed 2'
        }
    },
    customSkill: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

export default User;
