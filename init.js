
const mongoose = require("mongoose");

const Chat=require("./models/chat.js");
main()
.then(()=>{console.log("connection succesful");})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  };
let allchat=[
    {
        from:"gadha",
        to:"bhagvan",
        message:" ab thodi achi kripa bhi bna do",
        created_at:new Date()
    },
    {
        from:"me",
        to:"babaa",
        message:" ab hogya kharab kharab ab thoda acha bhi krado",
        created_at:new Date()
    },
    {
        from:"bhakt",
        to:"Mahadev",
        message:" ye sare kand mere hi jeevan me kyu likhe hote hae",
        created_at:new Date()
    }
];
Chat.insertMany(allchat);