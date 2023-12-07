import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { passwordHash, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customError.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
  req.body.password = await passwordHash(req.body.password);
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credentials");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  const token = createJWT({ userId: user._id, role: user.role });
  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  res.send(token);
};
