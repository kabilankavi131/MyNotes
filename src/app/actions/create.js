"use server";
import { client } from "@/lib/db";
import { redirect } from "next/navigation";
export async function createBook(formData) {
  const { name, password, mail } = Object.fromEntries(formData);
  await client.hSet(`mynotes:${name}`, {
    name,
    password,
    mail,
  });
  const passwordExists = await client.hExists(`mynotes:${name}`, "password");
  if (passwordExists) {
    return 7;
  }
  redirect("/");
}
