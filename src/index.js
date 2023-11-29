import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import routes from "./routes.js";

const app = express();
const staticPathPublic = path.resolve("public");

app.set("view engine", "ejs");

app.use(express.static(staticPathPublic));
app.use(expressLayouts);

app.use("/", routes);

app.listen(3000, () => {
	console.log(`>> Server is running on http://localhost:${3000}`);
});
