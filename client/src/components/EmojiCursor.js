import { useCursorify } from "@cursorify/react";
import React from "react";
import clickSVG from "../theme/cursor-click-svgrepo-com.svg";
import altSVG from "../theme/cursor-alt-svgrepo-com.svg";

const CustomCursor = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: "32px", height: "32px" }} />
);

export const EmojiCursor = (props) => {
  const { disabled } = props;
  const { mouseState, style } = useCursorify();

  return (
    <div
      data-hover={style}
      style={{
        width: 40,
        height: 40,
        fontSize: 30,
      }}
    >
      {(() => {
        if (disabled) return <CustomCursor src={altSVG} alt="pointer" />;

        if (mouseState === "mouseDown")
          return <CustomCursor src={clickSVG} alt="pointer" />;

        if (style === "pointer")
          return <CustomCursor src={altSVG} alt="pointer" />;
        if (style === "text") return "🤏";
        return <CustomCursor src={altSVG} alt="pointer" />;
      })()}
    </div>
  );
};
