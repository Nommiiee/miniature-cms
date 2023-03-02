import React from "react";
import Popup from "../../components/Popup";
import { useState } from "react";
import { compareSync } from "bcrypt";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    const URL = "http://localhost:3000/auth/login";
    const response = fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    if (response.status === 200) {
      console.log(response);
      console.log("success");
    } else {
      console.log("error");
    }
  };
  return (
    <>
      <div className="w-full h-screen bg-blue-200 flex justify-center items-center ">
        <div className="w-96 h-5/6 max-h-[700px] bg-blue-100 p-4 rounded-md shadow-2xl flex items-center justify-center relative">
          <div className="w-11/12 flex items-center justify-center h-full py-10">
            <div className="w-full h-full flex flex-col items-center justify-between gap-4 ">
              <div className="w-full text-center">
                <h1 className="text-3xl font-semibold text-center">
                  Miniature CMS
                </h1>
                <p className="pt-4 text-xl">Welcome Back!</p>
              </div>
              <div className="w-full">
                <form return="false">
                  <div className="w-full flex flex-col">
                    <label
                      className="pb-2 font-medium text-gray-800"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="flex w-full relative items-center justify-end">
                      <input
                        type="text"
                        className="py-2 pl-2 pr-10 w-full outline-none    rounded-md shadow-md "
                        name="username"
                      />
                      <svg
                        className="w-8 h-8 absolute right-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex flex-col pt-4">
                    <label
                      className="pb-2 font-medium text-gray-800"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="flex w-full relative items-center justify-end ">
                      <input
                        type="password"
                        className="p-2 w-full outline-none  rounded-md shadow-md "
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center pt-4">
                    <div className="flex items-center">
                      <input type="checkbox" name="remember" />
                      <label className="pl-2 text-md" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <p>
                        <a href="">
                          <span className="text-md underline text-blue-500">
                            Forgot Password?
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-4 pt-8">
                    <button className="w-full rounded-md border-2 border-black p-2 text-lg hover:bg-blue-200 ">
                      Login
                    </button>
                    <button className="w-full rounded-md  p-2 text-lg text-white bg-blue-500 hover:bg-blue-600 font-medium ">
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center w-full">
                <span>Privacy Policy </span> | <span> Terms & Condition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
