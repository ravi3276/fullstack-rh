import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    language: {type: 'string'},
    countryId: {type: mongoose.Types.ObjectId, ref: 'Country'},
})

export default mongoose.model('Language',languageSchema)