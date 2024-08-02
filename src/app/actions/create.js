"use server";
import { client } from "@/lib/db";
import { redirect } from "next/navigation";
export async function createBook(formData) {
  const { name, password, mail } = Object.fromEntries(formData);
  const result = await client.hSet(`user:${name}`, {
    name,
    password,
    mail,
  });

  if (result > 0) {
    return 1;
  } else {
    return 0;
  }
  redirect("/");
}