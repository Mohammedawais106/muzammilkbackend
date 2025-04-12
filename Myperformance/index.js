// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import cors from "cors"
// import dotenv from "dotenv";
// import express from "express";
// import connectDB from "./DBconnection/dbConnection.js";
// import userRoute from "./Routers/userRoute.js";
// import jobuser from "./Routers/jobRoute.js";
// import helmet from "helmet";
// import xss from "xss-clean";
// import ExpressMongoSanitize from "express-mongo-sanitize";
// dotenv.config();
// import multer from "multer"
// let app = express(); // for creating instance
//  app.use(cors())
// let port = process.env.PORT;
// connectDB(process.env.DBSTRING, process.env.DBNAME);

// //swagger api config
// let options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: 'Job Portal Application',
//       description: 'Node Expressjs Job Portal Application',
//     },
//     servers: [
//       {
//         url: "http://localhost:2000",
//       },
//     ],
//   },
//   apis: ['./Routers/*.js'], // Adjust path if needed to match your routes
// };

// let spec = swaggerJSDoc(options);

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json()); // Use built-in Express middleware instead of body-parser
// app.use(helmet()); // Uncomment this line if you want to use Helmet for security
// app.use(xss()); // Uncomment this line if you want to use xss-clean for XSS protection
// app.use(ExpressMongoSanitize());
// app.use("/user", userRoute);
// app.use("/job", jobuser);
// app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec)); // Corrected: 'swaggerUi.serve' to 'swaggerUi.serve'
// app.use("/multer",multerUser)

// // below code using for multer 
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {

//     cb(null,Date.now()+"-"+file.originalname )
//   }
// })

// const upload = multer({ storage })

// app.post('/single', upload.single('image'),(req, res)=>{
// console.log(req.file);
// })
// app.listen(port, () => {
//   console.log(`Hello Developer, Server is started at port Number http://localhost:${port}`);
// });




import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./DBconnection/dbConnection.js";
import userRoute from "./Routers/userRoute.js";
import jobuser from "./Routers/jobRoute.js";
import helmet from "helmet";
import xss from "xss-clean";
import expressMongoSanitize from "express-mongo-sanitize"; // Changed the import to match the correct package name
import multer from "multer";
// import ImageModel from "./Model/multerModel.js";
import multerRoute from "./Routers/multerRout.js";
import cookieParser from 'cookie-parser';

dotenv.config();

let app = express(); // for creating instance
app.use(cors());
let port = process.env.PORT || 2000; // Defaulting to 2000 if PORT is not defined
connectDB(process.env.DBSTRING, process.env.DBNAME);

// Swagger API config
let options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Job Portal Application',
      description: 'Node Expressjs Job Portal Application',
    },
    servers: [
      {
        url: `http://localhost:${port}`, // Use dynamic port
      },
    ],
  },
  apis: ['./Routers/*.js'], // Adjust path if needed to match your routes
};

let spec = swaggerJSDoc(options);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Use built-in Express middleware instead of body-parser
app.use(helmet()); // Use Helmet for security headers
app.use(xss()); // Use xss-clean for XSS protection
app.use(expressMongoSanitize()); // Corrected import name
app.use(cookieParser())
app.use("/user", userRoute);
app.use("/job", jobuser);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec)); // Serving Swagger UI

// Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads"); // Directory where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Add timestamp to avoid file name collision
//   }
// });

// const upload = multer({ storage });

// app.post('/single', upload.single('image'), (req, res) => {
//   console.log(req.file); // Log the uploaded file details
//   res.send({ message: "File uploaded successfully", file: req.file });
// });

app.use("/multer",multerRoute)

app.listen(port, () => {
  console.log(`Hello Developer, Server is started at port Number http://localhost:${port}`);
});
