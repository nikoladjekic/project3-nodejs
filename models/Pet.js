const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String
    }
});


const PetSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: CategorySchema
    },
    status: {
        type: String,
        uppercase: true,
        enum: ["AVAILABLE", "PENDING", "SOLD"],
        default: "AVAILABLE"
    },

});

let PetModel = mongoose.model('Pet', PetSchema);

module.exports = PetModel;