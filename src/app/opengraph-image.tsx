import { ImageResponse } from "next/og";

// Branded card shown when the site is shared on Facebook, Messenger, etc.
export const alt = "Team Zion Lipa — A Christ-centered church in Lipa City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #192cad 0%, #141c52 100%)",
          color: "white",
          fontFamily: "serif",
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#f3c969",
            marginBottom: 24,
          }}
        >
          Welcome to
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.1 }}>
          Team Zion Lipa
        </div>
        <div style={{ fontSize: 36, color: "#bcd2ff", marginTop: 28 }}>
          Connect to God. Connect to people.
        </div>
        <div style={{ fontSize: 26, color: "#8eb4ff", marginTop: 40 }}>
          A Christ-centered church in Lipa City
        </div>
      </div>
    ),
    { ...size },
  );
}
