import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";
const SplashScreenSVG = (props: any) => (
  <Svg
    width={360}
    height={800}
    viewBox="0 0 360 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={360} height={800} fill="url(#paint0_linear_1_4)" />
    <Path
      d="M182.233 481.869C182.233 473.152 188.481 466.611 198.74 466.611C214.863 466.611 229.086 488.606 245.464 488.606C251.006 488.606 253.507 482.248 251.698 477.25C249.7 471.735 243.519 470.023 245.097 468.786C247.423 466.972 254.69 468.147 259.599 475.414C261.045 477.552 264.857 485.652 260.22 495.7C255.058 506.887 243.232 511 231.539 511C198.192 511 182.233 492.967 182.233 481.869Z"
      fill="white"
    />
    <Path
      d="M176.771 481.869C176.771 473.152 170.524 466.611 160.265 466.611C144.141 466.611 129.919 488.606 113.543 488.606C107.999 488.606 105.497 482.248 107.307 477.25C109.305 471.735 115.486 470.023 113.907 468.786C111.582 466.972 104.317 468.147 99.4055 475.414C97.9599 477.552 94.1478 485.652 98.7847 495.7C103.946 506.887 115.774 511 127.468 511C160.815 511 176.771 492.967 176.771 481.869Z"
      fill="white"
    />
    <Path
      d="M215.567 379.606C205.809 389.406 192.868 394.956 179.502 394.956C166.137 394.956 153.195 389.403 143.438 379.606C135.823 387.525 125.653 391.995 115.009 391.995C112.684 391.995 110.409 391.774 108.189 391.373C114.407 401.747 120.643 417.714 122.46 441.315C122.565 442.678 123.626 443.498 124.856 443.183C131.472 441.493 152.27 436.805 179.505 436.805C206.74 436.805 227.537 441.493 234.153 443.183C235.383 443.498 236.444 442.678 236.55 441.315C238.366 417.714 244.6 401.745 250.82 391.373C248.6 391.777 246.325 391.995 244 391.995C233.351 391.995 223.184 387.525 215.567 379.606Z"
      fill="white"
    />
    <Path
      d="M243.995 310.828C237.422 310.828 231.04 312.867 225.532 316.727L222.249 319.029L220.483 315.256C212.602 298.444 196.902 288 179.502 288C162.105 288 146.402 298.444 138.522 315.256L136.753 319.029L133.47 316.727C127.965 312.867 121.58 310.828 115.007 310.828C96.2555 310.828 81 327.327 81 347.605C81 367.886 96.2555 384.386 115.007 384.386C124.867 384.386 134.237 379.75 140.712 371.67L143.271 368.473L145.94 371.566C154.73 381.742 166.648 387.347 179.5 387.347C192.352 387.347 204.272 381.742 213.06 371.566L215.729 368.473L218.288 371.67C224.763 379.75 234.13 384.386 243.993 384.386C262.744 384.386 278 367.886 278 347.605C278.002 327.327 262.747 310.828 243.995 310.828Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1_4"
        x1={180}
        y1={0}
        x2={180}
        y2={800}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FBB240" />
        <Stop offset={0.42056} stopColor="#FAD139" />
        <Stop offset={1} stopColor="#F9EA33" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SplashScreenSVG;
