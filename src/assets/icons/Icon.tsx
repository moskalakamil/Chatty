import React from "react";
import {SvgProps} from "react-native-svg";

import close from "./Svg/close.svg";
import phone from "./Svg/phone.svg";
import plus from "./Svg/plus.svg";
import profile from "./Svg/profile.svg";
import rooms from "./Svg/rooms.svg";
import search from "./Svg/search.svg";
import send from "./Svg/send.svg";
import videocall from "./Svg/videocall.svg";
import visionlow from "./Svg/vision-low.svg";
import vision from "./Svg/vision.svg";

const ICONS = {
  search,
  videocall,
  visionlow,
  vision,
  plus,
  close,
  send,
  rooms,
  phone,
  profile,
};

export type IconType = keyof typeof ICONS;

interface IconProps extends SvgProps {
  name: IconType;
}

const AppIcon = ({name, ...props}: IconProps) => {
  const CurrentIcon = ICONS[name];
  return <CurrentIcon {...props} />;
};

export const Icon = React.memo(AppIcon);
