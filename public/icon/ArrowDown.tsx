import React, { SVGProps } from "react";

function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.73145 3.91406L9.21716 9.39978L14.7029 3.91406"
        stroke="black"
        stroke-width="4.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.81543 3L8.30114 8.48571L13.7869 3"
        stroke="white"
        stroke-width="4.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.81543 3L8.30114 8.48571L13.7869 3"
        stroke="#147970"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ArrowDown;
