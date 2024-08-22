"use server";
import { createSession } from "@/app/lib/session";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

export async function signup(state, formData) {
  const errors = {};

  // Simple validation rules
  const email = formData.get("email");
  const password = formData.get("password");
  const isScouter = formData.get("isScouter") ? true : false;

  // Validate email (email regex)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Invalid email address";
  }

  // Validate password (minimum length requirement)
  if (!password || password.length < 6) {
    errors.password = "must be at least 6 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors: errors,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let user;

  try {
    user = await prisma.user.create({
      data: {
        isScouter,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.code == "P2002") {
      return { errors: { main: "User already exists" } };
    }
    return { errors: { main: "An error occurred" } };
  }

  if (!user) {
    return {
      main: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id, isScouter);
  redirect("/players");
}

export async function signin(state, formData) {
  // Simple validation rules
  const email = formData.get("email");
  const password = formData.get("password");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email) || !password || password.length < 6) {
    return {
      errors: {
        main: "Incorrect details.",
      },
    };
  }

  let user;

  try {
    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        isScouter: true,
        password: true,
      },
    });
  } catch (error) {
    console.error(error);
    return { errors: { main: "An error occurred" } };
  }

  if (user) {
    const match = await bcrypt.compare(formData.get("password"), user.password);
    if (match) {
      await createSession(user.id, user.isScouter);
      redirect("/players");
    }
  }

  return {
    errors: {
      main: "Incorrect details.",
    },
  };
}
