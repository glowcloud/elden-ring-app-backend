const express = require("express");
const buildController = require("../controllers/buildController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all builds
router.get("/", buildController.getBuilds);

// GET a build
router.get("/:id", buildController.getBuild);

// require auth for all build routes except GET
router.use(requireAuth);

// POST a new build
router.post("/", buildController.createBuild);

// DELETE a build
router.delete("/:id", buildController.deleteBuild);

// UPDATE a build
router.post("/:id", buildController.updateBuild);

// CHECK ownership
router.get("/:id/owner", buildController.getOwner);

module.exports = router;
