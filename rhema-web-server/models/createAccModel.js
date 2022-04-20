import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    firstname: {type: 'string', required: true},
    lastname: {type: 'string', required: true},
    email: {type: 'string', required: true, unique: true},
    password: {type: 'string', required: true},
    role:{type: 'string', required: true},
    region: {type: 'string', required: true},
    country:{type: 'string', required: true},
    language:{type: 'string', required: true},
    mobile: {type: 'string', required: true},
},{collection: 'account',timestamps: true});

export default mongoose.model('Account',accountSchema)