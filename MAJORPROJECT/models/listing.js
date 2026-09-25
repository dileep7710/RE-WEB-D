const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,
    image: {
        type: String,
        default:
            "https://unsplash.com/photos/a-vibrant-sunset-over-a-hazy-landscape-tGp2wneBC8c",
        set: (v) => 
            v === "" 
              ? "https://unsplash.com/photos/a-vibrant-sunset-over-a-hazy-landscape-tGp2wneBC8c"
              : v,
    },
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;