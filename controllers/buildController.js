const Build = require("../models/buildModel");
const mongoose = require("mongoose");

const getOwner = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such build" });
  }
  
  const build = await Build.findById(id);
    
  if (build.user_id === user_id.toString()) {
	  return res.status(200).json(true);
  }
  
   res.status(200).json(false);  
};

// get all builds
const getBuilds = async (req, res) => {
  const builds = await Build.find().sort({ createdAt: -1 });

  if (builds.length > 0) {
    return res.status(200).json(builds);
  }
  res.status(200).json(null);
};

// get a single build
const getBuild = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such build" });
  }

  const build = await Build.findById(id);

  if (!build) {
    return res.status(404).json({ error: "No such build" });
  }

  res.status(200).json(build);
};

// create a new build
const createBuild = async (req, res) => {
  const {
    buildName,
    chosenClass,
    stats,
    items,
    ammos,
    leftWeapons,
    rightWeapons,
    talismans,
    spells,
  } = req.body;

  if (!buildName || !chosenClass) {
    return res
      .status(400)
      .json({ error: "Please fill in the name and class field" });
  }

  // add to db
  try {
    const user_id = req.user._id;
    const build = await Build.create({
      buildName,
      chosenClass,
      stats,
      items,
      ammos,
      leftWeapons,
      rightWeapons,
      talismans,
      spells,
      user_id,
    });
    res.status(200).json(build);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a build
const deleteBuild = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such build" });
  }

  const build = await Build.findByIdAndDelete(id);

  if (!build) {
    return res.status(404).json({ error: "No such build" });
  }

  res.status(200).json(build);
};

// update a build
const updateBuild = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such build" });
  }

  const build = await Build.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!build) {
    return res.status(404).json({ error: "No such build" });
  }

  res.status(200).json(build);
};

module.exports = {
  getBuilds,
  getBuild,
  createBuild,
  deleteBuild,
  updateBuild,
  getOwner
};
