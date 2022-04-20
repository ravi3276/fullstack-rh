import mongoose from "mongoose";

const RegionSchema= mongoose.Schema({
    region: {type: 'string'},
})

export default mongoose.model('Region',RegionSchema)