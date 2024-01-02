import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CustomBottomNavBar = (props: any) => (
  <Svg
    width="100%"
    height={65}
    viewBox="0 0 360 58"
    fill="none"
    preserveAspectRatio="xMinYMin slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ zIndex: 2 }} // Ajusta el zIndex para colocar el SVG debajo de los iconos
    {...props}
  >
    <Path d="m0 0 144.5 17.4H216L360 0v58H0V0Z" fill="#FDDD80" />
  </Svg>
);
export default CustomBottomNavBar;
