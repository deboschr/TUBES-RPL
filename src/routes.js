import express from "express";
import { isAuthenticated } from "./utils/authorization-util.js";

import { home_page } from "./controllers/home-controller.js";
import { login_page, login, logout } from "./controllers/login-controller.js";
import {
	bap_overview_page,
	bap_detail_page,
	bap_overview,
	bap_detail,
} from "./controllers/bap-controller.js";
import {
	grade_overview_page,
	grade_detail_page,
	grade_input_page,
	grade_overview,
	grade_detail,
	grade_input,
} from "./controllers/grade-controller.js";
import {
	schedule_overview_page,
	schedule_detail_page,
	schedule_overview,
	schedule_detail,
} from "./controllers/schedule-controller.js";
import {
	management_schedule_overview_page,
	management_schedule_detail_page,
	management_schedule_overview,
	management_schedule_detail,
} from "./controllers/management-schedule-controller.js";

import {
	management_user_overview_page,
	management_user_detail_page,
	management_user_overview,
	management_user_detail,
} from "./controllers/management-user-controller.js";

const router = express.Router();

// Get routes
router.get("/", isAuthenticated, home_page);
router.get("/home", isAuthenticated, home_page);
router.get("/login", login_page);

router.get("/bap-detail", isAuthenticated, bap_detail_page);
router.get("/bap-overview", isAuthenticated, bap_overview_page);

router.get("/schedule-detail", isAuthenticated, schedule_detail_page);
router.get("/schedule-overview", isAuthenticated, schedule_overview_page);

router.get("/grade-input", isAuthenticated, grade_input_page);
router.get("/grade-detail", isAuthenticated, grade_detail_page);
router.get("/grade-overview", isAuthenticated, grade_overview_page);

router.get(
	"/user-management-detail",
	isAuthenticated,
	management_user_detail_page
);
router.get(
	"/user-management-overview",
	isAuthenticated,
	management_user_overview_page
);

router.get(
	"/schedule-management-detail",
	isAuthenticated,
	management_schedule_detail_page
);
router.get(
	"/schedule-management-overview",
	isAuthenticated,
	management_schedule_overview_page
);

// Post routes
router.post("/login", login);
router.post("/logout", logout);

router.post("/bap-detail", bap_detail);
router.post("/bap-overview", bap_overview);

router.post("/grade-input", grade_input);
router.post("/grade-detail", grade_detail);
router.post("/grade-overview", grade_overview);

router.post("/schedule-detail", schedule_detail);
router.post("/schedule-overview", schedule_overview);

router.post("/user-management-detail", management_user_detail);
router.post("/user-management-overview", management_user_overview);

router.post("/schedule-management-detail", management_schedule_detail);
router.post("/schedule-management-overview", management_schedule_overview);

export default router;
