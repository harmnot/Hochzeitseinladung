require("dotenv").config();
const [express, cors, morgan, mongoose, Multer] = [
  require("express"),
  require("cors"),
  require("morgan"),
  require("mongoose"),
  require("multer")
];

const app = express();
const gscMiddlewares = require("./middleware/google-cloud-storage.js");
const gcpUpload = require("./routes/routesBride.js");

const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${
  process.env.MONGO_DB_PIN
}@cluster0-nktui.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`;

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`======> MongoDB connected <======`))
  .catch(err => console.log(err, "ini error"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

app.use("/", gcpUpload);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`you are connected http://localhost:4000`);
});
