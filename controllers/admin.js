const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;
import dotenv from "dotenv";
dotenv.config();

const Admin = require("../models/admin");

exports.getAdmins = async (req, res, next) => {
  try {
    const users = await Admin.find().select("-password");
    res.status(201).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const admin = await Admin.findOne({ _id: req.params.id }).select(
        "-password"
      );
      res.status(201).json(admin);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      await Admin.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "Utilisateur bien supprimé" });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      res
        .status(400)
        .json({ message: "L'id " + req.params.id + " est inconnu" });
    } else {
      const admin = await Admin.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      res.status(200).json(admin);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.signUp = async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });
  try {
    if (!admin) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const admin = new Admin({ ...req.body, password: hash });
          admin
            .save()
            .then(() => {
              res.status(201).json({ message: "Utilisateur bien crée" });
            })
            .catch((err) => {
              return res.status(500).json({ err });
            });
        })
        .catch((err) => {
          return res.status(500).json({ err });
        });
    } else {
      return res
        .status(400)
        .json({ message: "Cette adresse mail appartient déjà à un compte" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

exports.login = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    const maxAge = 720 * 60 * 60 * 1000;
    if (!admin) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    bcrypt.compare(req.body.password, admin.password).then((valid) => {
      if (!valid) {
        return res.status(404).json({ message: "Mot de passe incorrect" });
      }

      const token = jwt.sign({ userID: admin._id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
      });
      res.cookie("tokenAdmin", token, { httpOnly: true, maxAge: maxAge });
      res.status(200).json({ admin: admin._id });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("tokenAdmin", "", { maxAge: 1 });
    res.redirect("/");
  } catch (err) {
    res.status(400).json({ err });
  }
};
