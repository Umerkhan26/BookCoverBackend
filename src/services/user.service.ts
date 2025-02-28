import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import ErrorHandler from "../utils//errorHandler";
import { sendVerificationEmail } from "../utils/email.util";
import mongoose from "mongoose";
export const registerUser = async (userData: Partial<IUser>) => {
  const { firstName, lastName, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorHandler(400, "Email already in use");
  }

  const verificationToken = jwt.sign(
    { email },
    process.env.JWT_SECRET as string,
    { expiresIn: "30m" }
  );

  const user = new User({
    userId: new mongoose.Types.ObjectId().toHexString(),
    firstName,
    lastName,
    email,
    password,
    role,
    verificationToken,
    verificationTokenExpiry: new Date(Date.now() + 30 * 60 * 1000), // Set expiry to 30 min
  });

  await user.save();

  await sendVerificationEmail(user.email, verificationToken);

  return user;
};

export const verifyUserEmail = async (token: string): Promise<IUser> => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
    console.log("Received token:", decoded);

    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      throw new ErrorHandler(404, "User not found or invalid token");
    }

    if (user.verificationTokenExpiry! < new Date()) {
      throw new ErrorHandler(400, "Verification token has expired");
    }

    user.isVerified = true;
    user.verificationToken = "";
    user.verificationTokenExpiry = undefined;

    await user.save();

    return user;
  } catch (error: any) {
    console.error("Error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      throw new ErrorHandler(400, "Invalid token format");
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw new ErrorHandler(400, "Token has expired");
    }

    if (error instanceof ErrorHandler) {
      throw error;
    }

    throw new ErrorHandler(500, "Failed to verify email");
  }
};
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler(400, "Invalid email or password");
  }

  if (!user.isVerified) {
    throw new ErrorHandler(
      400,
      "Account not verified. Please check your email."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorHandler(400, "Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
    token,
  };
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({}, "-password");
    return users;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

// export const updateUserStatusService = async (userId: string, blocked: boolean): Promise<IUser | null> => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { userId },
//       { blocked },
//       { new: true }
//     );

//     return updatedUser;
//   } catch (error) {
//     throw new Error('Error updating user status');
//   }
// };

export const updateUserStatusService = async (
  userId: string,
  status: "active" | "inactive"
): Promise<IUser | null> => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userId }, // Find user by userId
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user status");
  }
};

export const deleteUserService = async (
  userId: string
): Promise<IUser | null> => {
  try {
    const deletedUser = await User.findOneAndDelete({ userId });

    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user");
  }
};
