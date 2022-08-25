import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express()
dotenv.config();


// ............. connection to mongobd ............

const connetToMongo = async () => {
    try {
         mongoose.connect(process.env.MONGO, () => {
            console.log(" connected to MongoDb")
        })
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconneted', () => {
    console.log("mongoDb disconnected ")
  });
mongoose.connection.on('conneted', () => {
    console.log("mongoDb connected ")
  });


// ............. Middlewares .........

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth" , authRoute)
app.use("/api/hotels" , hotelsRoute)
app.use("/api/rooms" , roomsRoute)
app.use("/api/users" , usersRoute)




//  .......... server .........

app.listen(process.env.PORT, () => {
    connetToMongo();
    console.log(`connected to backend http://localhost:${process.env.PORT}` )
});

// ............................