import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#332A27",
          fontSize: 96,
        }}
      >
        <span style={{ color: "#F3D9D7" }}>✨</span>
      </div>
    ),
    { ...size }
  );
}
