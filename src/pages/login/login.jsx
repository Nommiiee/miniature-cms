import React from "react";
import { useState } from "react";

export default function login() {
  return (
    <>
      <div className="w-full h-screen bg-blue-200 flex justify-center items-center">
        <div className="w-96 h-[700px] bg-blue-100 p-4 rounded-lg shadow-2xl">
          <div className="w-full h-full flex flex-col items-center justify-between gap-4">
            <div className="w-full text-center">
              <h1 className="text-3xl font-semibold text-center">
                Miniature CMS
              </h1>
              <p className="pt-4 text-xl">Welcome Back!</p>
            </div>
            <div className="w-full">
              <form return="false">
                <div className="w-full flex flex-col">
                  <label className="pb-2 text-xl" htmlFor="username">
                    Username
                  </label>
                  <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                    <input
                      type="text"
                      className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-00 "
                      name="username"
                    />
                    <svg
                      className="w-8 h-8 m-1"
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
                  <label className="pb-2 text-xl" htmlFor="password">
                    Password
                  </label>
                  <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                    <input
                      type="password"
                      className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-00 "
                      name="password"
                    />
                    <svg
                      className="w-8 h-8 m-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>
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
                  <button className="w-full rounded-lg border-2 border-black p-2 text-lg hover:bg-blue-200 ">
                    Login
                  </button>
                  <button className="w-full rounded-lg  p-2 text-lg text-white bg-blue-500 hover:bg-blue-600 font-medium ">
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
    </>
  );
}
