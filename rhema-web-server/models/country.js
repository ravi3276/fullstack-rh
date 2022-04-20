import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
    country: {type: 'string'},
    regionId: {type: mongoose.Types.ObjectId, ref: 'Region'},
})

export default mongoose.model('Country',countrySchema)