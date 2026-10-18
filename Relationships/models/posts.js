const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username: String,
    email: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const getData = async () => {
   let result = await Post.findOne({}).populate("user", "username");
   console.log(result);
   
};

getData();

// const del = async() => {
//     await Post.findByIdAndDelete("6ad446a6b821bbdd99d689a2");
//     await Post.findByIdAndDelete("6ad4441d245e8ad1667afa59");
// };

// del();