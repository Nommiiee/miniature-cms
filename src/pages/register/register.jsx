import React from "react";

export default function register() {
  return (
    <>
      <div className="w-full h-screen bg-blue-200 flex items-center justify-center">
        <div className="w-96 h-5/6 max-h-[800px] flex flex-col items-center bg-blue-100">
          <div className="w-11/12 flex items-center">
            <div className="w-full h-full flex flex-col jusitfy-between items-center gap-4 ">
              <div className="w-full">
                <div className="w-full text-center">
                  <h1 className="text-3xl font-semibold text-center">
                    Miniature CMS
                  </h1>
                  <p className="pt-4 text-xl">Welcome Back!</p>
                </div>
              </div>
              <div className="w-full">
                <form return="false" className="w-full flex flex-col gap-4 ">
                  <div className="w-full">
                    <label className="pb-2 text-xl" htmlFor="firstname">
                      First name
                    </label>
                    <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                      <input
                        type="text"
                        className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-300 "
                        name="firstname"
                        placeholder="First Name"
                        aria-placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="pb-2 text-xl" htmlFor="lastname">
                      Lastname
                    </label>
                    <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                      <input
                        type="text"
                        className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-300 "
                        name="lastname"
                        placeholder="Last Name"
                        aria-placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="pb-2 text-xl" htmlFor="username">
                      Username
                    </label>
                    <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                      <input
                        type="text"
                        className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-300 "
                        name="username"
                        placeholder="Username"
                        aria-placeholder="username"
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
                  <div className="w-full">
                    <label className="pb-2 text-xl" htmlFor="username">
                      Username
                    </label>
                    <div className="p-1 w-full flex bg-white items-center rounded-lg shadow-md">
                      <input
                        type="text"
                        className="p-2 w-full focus:outline-[0.5px] focus:outline-gray-300 "
                        name="username"
                        placeholder="Username"
                        aria-placeholder="username"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
