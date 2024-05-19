"use client";

import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";

export const GoogleMap = () => {
  const clientWidth = useWindowSize();
  const [mapWidth, setMapWidth] = useState(1200);
  useEffect(() => {
    if (clientWidth > 1200) {
      setMapWidth(1200)
    } else {
      setMapWidth(clientWidth - 30)
    }
  }, [clientWidth]);
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7837.221294986381!2d106.83208529083943!3d10.841078957246504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317521b878695a5f%3A0xfbf3c81aec30f27!2sVinhomes%20Grand%20Park!5e0!3m2!1sen!2s!4v1705561970260!5m2!1sen!2s"
      width={mapWidth}
      height="340"
      style={{
        border: 0,
      }}
      allowFullScreen={false}
      loading="lazy"
    ></iframe>
  );
};
