const HoverIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="126"
      height="62"
      viewBox="0 0 126 62"
      fill="none"
    >
      <g filter="url(#filter0_f_365_1077)">
        <line
          x1="45.3618"
          y1="32"
          x2="80.6418"
          y2="32"
          stroke="url(#paint0_linear_365_1077)"
          stroke-width="4"
          style="mix-blend-mode:overlay"
        />
      </g>
      <g filter="url(#filter1_f_365_1077)">
        <ellipse
          cx="62.9978"
          cy="31"
          rx="9.45"
          ry="15"
          fill="#E6B1FF"
          fill-opacity="0.3"
        />
      </g>
      <line
        y1="31.5"
        x2="126"
        y2="31.5"
        stroke="url(#paint1_linear_365_1077)"
        style="mix-blend-mode:overlay"
      />
      <defs>
        <filter
          id="filter0_f_365_1077"
          x="41.3618"
          y="26"
          width="43.2798"
          height="12"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_365_1077"
          />
        </filter>
        <filter
          id="filter1_f_365_1077"
          x="37.5479"
          y="0"
          width="50.8999"
          height="62"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8"
            result="effect1_foregroundBlur_365_1077"
          />
        </filter>
        <linearGradient
          id="paint0_linear_365_1077"
          x1="80.6418"
          y1="36.501"
          x2="45.3618"
          y2="36.501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#7744FA" stop-opacity="0" />
          <stop offset="0.244792" stop-color="#8E37E6" />
          <stop offset="0.4475" stop-color="#DCC1F9" />
          <stop offset="0.677083" stop-color="#8E37E6" />
          <stop offset="1" stop-color="#7744FA" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_365_1077"
          x1="126"
          y1="34.501"
          x2="1.4218e-10"
          y2="34.501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.4475" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HoverIcon;
