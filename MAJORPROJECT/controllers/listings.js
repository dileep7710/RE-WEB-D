const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.renderNewForm = (req, res) => {
        res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
        let {id} = req.params;
        const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author" }}).populate("owner");
        if(!listing){
            req.flash("error", "Listing you requested for does not exist!");
            return res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show.ejs", { listing });
    };

module.exports.createListing = async (req, res, next) => {
let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send();

    let url = req.file.path;
    let filename = req.file.filename;
  
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
    }

   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
        if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
 
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing =  async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing Deleted!");
    res.redirect("/listings");
};

// controllers/listings.js

module.exports.index = async (req, res) => {
    let { category } = req.query; // URL se query parameter read karega (e.g. ?category=mountains)
    
    let allListings;
    if (category) {
        // Agar category select ki hai, to sirf wahi category filter karo
        allListings = await Listing.find({ category: category.toLowerCase() });
    } else {
        // Agar koi filter nahi hai, to saari listings show karo
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings, category });
};