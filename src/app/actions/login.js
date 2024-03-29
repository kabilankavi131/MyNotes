// Import SweetAlert directly into your component or layout file
"use server";
import { client } from "@/lib/db";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

// Assume client and redirect functions are available here
function HandleClick() {
  Swal.fire({
    title: "Success",
    type: "success",
    text: "Bro it's working wow",
  });
}
export async function LoginBook(formData) {
  const { name, password } = Object.fromEntries(formData);
  const passwordExists = await client.hExists(`mynotes:${name}`, "password");
  if (passwordExists) {
    console.log(password);
    return 7;
  }
  // Handle redirecting in your component or page
  redirect("/");
}
