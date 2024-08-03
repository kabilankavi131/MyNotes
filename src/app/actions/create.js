"use server";
import { client } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createBook(formData) {
  const { name, password, mail } = Object.fromEntries(formData);
  try {
    // Check if the user already exists
    const userExists = await client.hExists(`user:${name}`, 'name');
    if (userExists) {
      return -1; // User already exists
    }

    // Create a new user
    const result = await client.hSet(`user:${name}`, {
      name,
      password,
      mail,
    });

    if (result) {
      return 1; // Registration successful
    } else {
      return 0; // Error occurred during registration
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return 0; // Error occurred
  }
}
