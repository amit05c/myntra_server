const mongoose= require("mongoose")

const dataSchema= new mongoose.Schema({
    category: {type: String, require:true},
    title: {type: String, require : true},
    item: { type: String, require: true},
    image_url: {type: [String]},
    price: {type: Number, require: true}
})

const DataModel = mongoose.model('data',dataSchema)
module.exports={
    DataModel
}

module.exports={
   DataModel
}