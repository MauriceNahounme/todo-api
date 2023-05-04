const ObjectID = require("mongoose").Types.ObjectId;
import dotenv from "dotenv";
dotenv.config();

const Task = require("../models/task");

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    task.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(404).json({ err });
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate([
      { path: "step" },
      { path: "assign" },
    ]);
    res.status(201).json(tasks);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const task = await Task.findOne({ _id: req.params.id });
      res.status(201).json(task);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      await Step.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Task bien supprimé" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.status(200).json(task);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};
