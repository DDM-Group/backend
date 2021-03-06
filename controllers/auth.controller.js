
const db = require("../models");
const { User, Role } = db.models;
const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    level: req.body.level || 1
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      const token = jwt.sign({id: user._id, level: user.level}, JWT_SECRET, {
        expiresIn: '1d' // 24 hours
      });

      const exp = await user.calculateExperience()
      const level = await user.calculateLevel()
      const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);
      res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        group: user.group,
        photo: user.photo,
        level,
        experience: exp,
        lives: user.lives,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.autoupdate = (req, res) => {
  User.findById(req.userId)
  .populate("roles", "-__v")
  .exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const exp = await user.calculateExperience()
    const level = await user.calculateLevel()
    const authorities = user.roles.map(role => `ROLE_${role.name.toUpperCase()}`);
    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      group: user.group,
      photo: user.photo,
      level,
      experience: exp,
      lives: user.lives,
      roles: authorities
    });
  })
};
