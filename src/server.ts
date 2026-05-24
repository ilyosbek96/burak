// Architectura pattern(naqsh): MVC, DI(Dependency Injection ), MVP

// MVC = MODEL VIEW CONTROLLER
// Design(dizayn) pattern(naqsh): Middleware, Decotar
// // CLUSTER => DATABASE => COLLECTION => DOCUMENT

import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function() {
      console.log(`belgilangan portda yurgazildi: ${PORT}`);
    })
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));

