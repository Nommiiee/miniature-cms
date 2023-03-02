import React from "react";
import { useState } from "react";

export default function Popup(props) {
  const { data } = props;
  const success = "bg-green-200 text-green-500";
  const error = "bg-red-200 text-red-500";

  if (data.type === "success") {
  }

  return (
    <>
      <div
        className={`w-96 flex items-center justify-center p-4 absolute top-0`}
      >
        <div className="">{data.message}</div>
      </div>
    </>
  );
}
