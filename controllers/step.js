const ObjectID = require("mongoose").Types.ObjectId;
import dotenv from "dotenv";
dotenv.config();

const Step = require("../models/step");

exports.createStep = async (req, res, next) => {
  try {
    const step = new Step(req.body);
    step.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.getSteps = async (req, res, next) => {
  try {
    const steps = await Step.find();
    res.status(201).json(steps);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getStep = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const step = await Step.findOne({ _id: req.params.id });
      res.status(201).json(step);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deleteStep = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      await Step.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Step bien supprimé" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.updateStep = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const step = await Step.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.status(200).json(step);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};
