import express from "express";

import { home_page } from "./controllers/home-controller.js";
import { login_page } from "./controllers/login-controller.js";
import { trial_result_page } from "./controllers/trial-result-controller.js";
import { trial_result_overview_page } from "./controllers/trial-result-overview-controller.js";
import { trial_schedule_page } from "./controllers/trial-schedule-controller.js";
import { trial_schedule_management_page } from "./controllers/trial-schedule-management-controller.js";
import { trial_schedule_overview_page } from "./controllers/trial-schedule-overview-controller.js";
import { user_management_page } from "./controllers/user-management-controller.js";
import { bap_attachment_page } from "./controllers/bap-attachment-controller.js";

const router = express.Router();

// Get routes
router.get("/", home_page);
router.get("/home", home_page);
router.get("/login", login_page);
router.get("/trial-result", trial_result_page);
router.get("/trial-result-overview", trial_result_overview_page);
router.get("/trial-schedule", trial_schedule_page);
router.get("/trial-schedule-management", trial_schedule_management_page);
router.get("/trial-schedule-overview", trial_schedule_overview_page);
router.get("/user-management", user_management_page);
router.get("/bap-attachment", bap_attachment_page);

// Post routes

export default router;
