import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "بصمة هاتفي المعتمد | بوابة العملاء";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 40%, #f8f9ff 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(0,110,47,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(34,197,94,0.1)",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #006e2f, #22c55e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
            boxShadow: "0 20px 60px rgba(0,110,47,0.3)",
          }}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="white">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.88-2.62 7.5-6 8.93C8.62 18.5 6 14.88 6 11V7.67L12 5z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "900",
            color: "#0b1c30",
            marginBottom: "16px",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          بصمة هاتفي المعتمد
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "30px",
            fontWeight: "600",
            color: "#006e2f",
            marginBottom: "40px",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          بوابة العملاء الرسمية
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "#546e7a",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: "1.6",
            direction: "rtl",
          }}
        >
          منظومة التحقق من مقدرتك على السداد الشهري
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(0,110,47,0.08)",
            borderRadius: "50px",
            padding: "12px 28px",
            border: "1px solid rgba(0,110,47,0.15)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span style={{ fontSize: "18px", color: "#006e2f", fontWeight: "700", direction: "rtl" }}>
            مرخص من البنك المركزي السعودي
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "48px",
            fontSize: "16px",
            color: "#94a3b8",
          }}
        >
          pasmthatfy-pay.com
        </div>
      </div>
    ),
    { ...size }
  );
}
