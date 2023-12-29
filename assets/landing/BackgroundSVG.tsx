import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const BackgroundSVG = (props: any) => (
  <Svg
    viewBox="0 0 585 833"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...props}
  >
    <Path
      d="M43 86.5C43 134.273 23.7482 173 0 173C-2.95639e-05 167 0 137.273 0 89.5C0 41.7274 0 15 2.95639e-05 0C23.7483 0 43 38.7274 43 86.5Z"
      fill="url(#paint0_linear_0_1)"
    />
    <Path
      d="M585 749.5C585 797.273 585 798 585 833C561.252 833 542 794.273 542 746.5C542 698.727 561.252 660 585 660C585 667 585 701.727 585 749.5Z"
      fill="url(#paint1_linear_0_1)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_0_1"
        x1={0}
        y1={0}
        x2={0}
        y2={173}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#383838" />
        <Stop offset={1} stopColor="#FDDD80" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_0_1"
        x1={585}
        y1={660}
        x2={585}
        y2={833}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FDDD80" />
        <Stop offset={1} stopColor="#383838" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default BackgroundSVG;
