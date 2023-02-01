import React, { useState } from "react";

export default function Topbar() {
  const [info, setInfo] = useState({
    search: "",
    user: {
      name: "Kunal Kashyap",
      username: "kunal.kashyap",
    },
  });

  const handleSearch = async (target) => {
    setInfo({
      search: target.value,
    });
  };

  return (
    <>
      <div className="w-full sticky top-0">
        <div className="w-full bg-slate-900 text-slate-100 px-8 py-2 ">
          <div className="flex items-center justify-between">
            <div className="w-4/12 px-2 bg-gray-100 flex justify-between items-center min-w-96 border-2 boder-black rounded-full overflow-hidden text-slate-900">
              <div className="w-full">
                <input
                  onChange={handleSearch}
                  type="text"
                  value={info.search}
                  placeholder="Search Content"
                  className="focus:outline-none w-full bg-gray-100 px-2 py-1"
                />
              </div>
              <div>
                <button className="flex items-center">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex gap-x-4 items-center justify-center cursor-pointer">
              <div className="text-lg ">
                <p>{info.user.name}</p>
              </div>
              <div className="">
                <img
                  className="w-10 h-10 rounded-full border-white "
                  src="https://randomuser.me/api/portraits/women/33.jpg"
                  alt="User Picture"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
