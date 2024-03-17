"use server";
import { client } from "@/lib/db";
import { redirect } from "next/navigation";
export async function createBook(formData) {
  const { name, password, mail } = Object.fromEntries(formData);
  await client.hSet(`notes: ${name}`, {
    name,
    password,
    mail,
  });
  redirect("/");
}