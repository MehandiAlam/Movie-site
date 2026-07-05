import mongoose, { mongo } from "mongoose";

const connectedDB =async ()=>{
    try {
        await mongoose.connect("mongodb+srv://Prince96255:rockcena@cluster0.ehmfjc.mongodb.net/?appName=Cluster0");
        console.log("mongoose connected");
    }
    catch(error){
        console.log(error);
        }
};

export default  connectedDB;