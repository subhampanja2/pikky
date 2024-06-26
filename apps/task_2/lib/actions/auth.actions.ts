"use server";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { nextauthOptions } from "@/lib/nextauth-options";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/user.model";

export async function getUserSession() {
  const session = await getServerSession(nextauthOptions);
  return { session };
}

interface GetUserByEmailParams {
  email: string;
}

export async function getUserByEmail({ email }: GetUserByEmailParams) {
  connectDB();

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new Error("User does not exist!");
  }

  return { ...user._doc, _id: user._id.toString() };
}

export interface UpdateUserProfileParams {
  name: string;
}

export async function updateUserProfile({ name }: UpdateUserProfileParams) {
  const session = await getServerSession(nextauthOptions);

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const user = await User.findByIdAndUpdate(
      session?.user?._id,
      {
        name,
      },
      { new: true }
    ).select("-password");

    if (!user) {
      throw new Error("User does not exist!");
    }

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

export interface SignUpWithCredentialsParams {
  name: string;
  email: string;
  password: string;
}

export async function signUpWithCredentials({
  name,
  email,
  password,
}: SignUpWithCredentialsParams) {
  connectDB();

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}

interface SignInWithCredentialsParams {
  email: string;
  password: string;
}

export async function signInWithCredentials({
  email,
  password,
}: SignInWithCredentialsParams) {
  connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    throw new Error("Invalid email or password");
  }

  return { ...user._doc, _id: user._id.toString() };
}

export interface ChangeUserPasswordParams {
  oldPassword: string;
  newPassword: string;
}

export async function changeUserPassword({
  oldPassword,
  newPassword,
}: ChangeUserPasswordParams) {
  const session = await getServerSession(nextauthOptions);

  connectDB();

  try {
    if (!session) {
      throw new Error("Unauthorization!");
    }

    const user = await User.findById(session?.user?._id);

    if (!user) {
      throw new Error("User does not exist!");
    }

    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsValid) {
      throw new Error("Incorrect old password.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    return { success: true };
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`);
  }
}
