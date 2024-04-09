import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim : true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,  // Changed to number
        required: true,
        trim : true
    },
    skills: {
        type: [String],
        required: true,
        trim : true
    },
    photos: {
        type: [{
          url: {
            type: String,
            required: true
          }
        }],
        validate: {
          validator: function (value) {
            return value.length <= 3;
          },
          message: 'Photos should not exceed 3'
        }
      },
      videos: {
        type: [
            {
                url: {
                    type: String,
                    required: true,
                },
                duration: {
                    type: Number,
                    required: true,
                    max: 25,
                },
            },
        ],
        validate: {
            validator: function (value) {
                return value.length <= 2;
            },
            message: 'Videos should not exceed 2',
        },
    },
    birthdate: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    description: {
        type: String,
        maxlength: 240
    }
});

// Calculate age before saving
userSchema.pre('save', function (next) {
    if (this.birthdate) {
        const today = new Date();
        const birthdate = new Date(this.birthdate);
        const age = today.getFullYear() - birthdate.getFullYear();
        this.age = age;
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
