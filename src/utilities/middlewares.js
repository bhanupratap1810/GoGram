const jwt = require("jsonwebtoken");
const Joi = require("joi");

// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};

const passwordValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(1024).required(),
  });
  const { error } = schema.validate({ password: req.body.password });
  if (error) return next(res.status(400).json({ error: error.details[0].message }));
  next();
};

const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  const { error } = schema.validate({
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password
  });
  if (error) return next(res.status(400).json({ error: error.details[0].message }));
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return next(res.status(400).json({ error: error.details[0].message }));
  next();
};

module.exports = { verifyToken, passwordValidation, registerValidation, loginValidation }