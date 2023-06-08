import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./check.json";
export default function Check() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={100} width={200} />;
}
