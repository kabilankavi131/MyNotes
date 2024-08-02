// Import SweetAlert directly into your component or layout file
"use server";
import { client } from "@/lib/db";
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
  const storedPassword = await client.hGet(`user:${name}`, 'password');  // Assuming 'password' is the field name
  if (storedPassword && storedPassword === password) {
    return 7;
  } else {
    return 0;
  }
}
