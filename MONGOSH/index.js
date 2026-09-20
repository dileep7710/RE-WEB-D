const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
} 


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", userSchema);



User.deleteMany({name: "Eve"}).then((res) => {
    console.log(res);
});

// User.updateMany({age: {$gt: 48} }, {age: 55})
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
// User.findOne({ age: { $gt: 47 } }).then((res) => {
//     console.log(res[0]);
// })
// .catch((err) => {
//     console.log(err);
// });

// User.insertMany([
//     {name: "Tony", email: "tony@gmail", age: 50},
//     {name: "Peter", email: "peter@gmail", age: 30},
//     {name: "Tony", bruce: "bruce@gmail", age: 47},

// ]);

// const user1 = new User({
//     name: "Adam",
//     email: "adam@yahoo.in",
//     age: 48
// });
// user1.save();

const user2 = new User({
    name: "Eve",
    email: "eve@yahoo.in",
    age: 48
});

user2
.save()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
});
