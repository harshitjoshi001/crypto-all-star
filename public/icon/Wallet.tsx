import React, { SVGProps } from "react";

function WalletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_0_3)">
        <path
          d="M1.57568 4.60616C1.57568 2.69827 3.12234 1.15161 5.03023 1.15161H15.3939C17.3018 1.15161 18.8484 2.69826 18.8484 4.60616V10.3637C18.8484 12.2716 17.3018 13.8183 15.3939 13.8183H5.03023C3.12234 13.8183 1.57568 12.2716 1.57568 10.3637V4.60616Z"
          stroke="white"
          stroke-width="2"
        />
        <path
          d="M1 4.79293C1 2.435 3.31004 0.770015 5.54697 1.51566L12.4561 3.81869C13.8667 4.2889 14.8182 5.60901 14.8182 7.09596V13.6313C14.8182 15.9892 12.5081 17.6542 10.2712 16.9086L3.36212 14.6056C1.95149 14.1353 1 12.8152 1 11.3283V4.79293Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
        />
        <path
          d="M14.3257 8.65148C15.0579 8.65148 15.6515 8.05793 15.6515 7.32574C15.6515 6.59355 15.0579 6 14.3257 6C13.5936 6 13 6.59355 13 7.32574C13 8.05793 13.5936 8.65148 14.3257 8.65148Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_3">
          <rect width="20" height="19" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default WalletIcon;
