"use client";
import { useEffect } from "react";
import { useState } from "react";
import { createBook } from "@/app/actions/create";
import { LoginBook } from "@/app/actions/login";
import Swal from "sweetalert2";
export default function Home() {
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    const result = await createBook(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  const HandleSuccess = () => {
    Swal.fire({
      title: "Login Successfull",
      type: "success",
      icon: "success",
      text: "Enjoy (My Notes)",
    });
  };
  const HandlError = () => {
    Swal.fire({
      title: "Username Not Found!",
      type: "Error",
      icon: "error",
      text: "Signup First",
    });
  };
  async function handleLogin(formData) {
    const result = await LoginBook(formData);
    if (result?.error) {
      setError(result.error);
    }
    if (result == 7) {
      HandleSuccess();
    } else {
      HandlError();
    }
  }

  useEffect(() => {
    const loginButton = document.getElementById("login");
    const loginBar = document.getElementById("loginbar");
    const signup = document.getElementById("signup");
    const loginpage = document.getElementById("loginpage");
    const signups = document.getElementById("signups");
    const loginpages = document.getElementById("loginpages");
    const handleClick = () => {
      if (loginBar.style.visibility == "visible") {
        loginBar.style.visibility = "hidden";
      } else {
        loginBar.style.visibility = "visible";
      }
    };

    const handlesignup = () => {
      loginpages.style.transform = "translateY(-200%)";
      signups.style.transform = "translateY(0)";
    };
    const handlelogin = () => {
      signups.style.transform = "translateY(-200%)";
      loginpages.style.transform = "translateY(0)";
    };
    loginButton.addEventListener("click", handleClick);
    signup.addEventListener("click", handlesignup);
    loginpage.addEventListener("click", handlelogin);
    return () => {
      loginButton.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header>
        <h1>My Notes</h1>
        <img id="login" src="/Images/profile.png" alt="Profile" />
        <div id="loginbar" className="loginbar">
          <ul>
            <li id="signup">Sign up</li>
            <li id="loginpage">Login</li>
          </ul>
        </div>
      </header>
      <form action={handleSubmit}>
        <div id="signups" className="signup">
          <input type="text" name="name" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <input type="mail" name="mail" placeholder="Mail ID" />
          <button type="submit" className="btn">
            Sign Up
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
      <form action={handleLogin}>
        <div id="loginpages" className="login">
          <input type="text" name="name" placeholder="User Name"></input>
          <input type="text" name="password" placeholder="Password"></input>
          <button type="submit">Login</button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </main>
  );
}
