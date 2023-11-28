import express from "express";

import { home_page, import_data } from "./controllers/home-controller.js";
import { aggregate_page } from "./controllers/aggregate-controller.js";
import { bar_chart_page } from "./controllers/bar-chart-controller.js";
import { scatter_plot_page } from "./controllers/scatter-plot-controller.js";

const router = express.Router();

// Get routes
router.get("/", home_page);
router.get("/aggregate", aggregate_page);
router.get("/bar-chart", bar_chart_page);
router.get("/scatter-plot", scatter_plot_page);

// Post routes
router.post("/", import_data);


export default router;
