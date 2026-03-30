function formatCard(raw: string) {
  return raw.replace(/(.{4})(?=.)/g, "$1 ");
}

export function detectCardType(num: string): "visa" | "mastercard" | "unknown" {
  if (num.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return "mastercard";
  return "unknown";
}

export default function CreditCard({ cardNumber, cardHolderName, expiryDate, cvv, flipped, cardType }: {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  flipped: boolean;
  cardType: "visa" | "mastercard" | "unknown";
}) {
  const displayNumber = formatCard(cardNumber).padEnd(19, "•").split("");
  const groups = [displayNumber.slice(0, 4), displayNumber.slice(5, 9), displayNumber.slice(10, 14), displayNumber.slice(15, 19)];

  return (
    <div className="w-full flex justify-center mb-6 sm:mb-8 px-2 sm:px-0" style={{ perspective: "1000px" }}>
      <div
        className="relative w-full max-w-[240px] sm:max-w-sm transition-transform duration-700"
        style={{ aspectRatio: "1.586", transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div
          className="absolute inset-0 rounded-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}
        >
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
          <div className="flex justify-between items-start relative z-10">
            <div className="w-8 h-6 sm:w-10 sm:h-7 rounded-md" style={{ background: "linear-gradient(135deg, #d4af37, #f5d76e, #d4af37)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
              <div className="w-full h-full rounded-md grid grid-cols-2 gap-px p-1 opacity-60">
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
                <div className="bg-yellow-800/40 rounded-sm" /><div className="bg-yellow-800/40 rounded-sm" />
              </div>
            </div>
            <div className="text-white">
              {cardType === "visa" && <span className="font-black italic text-xl sm:text-2xl tracking-tight" style={{ fontFamily: "serif", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>VISA</span>}
              {cardType === "mastercard" && (
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full opacity-90" style={{ background: "#eb001b" }} />
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full -ml-3 opacity-80" style={{ background: "#f79e1b" }} />
                </div>
              )}
              {cardType === "unknown" && <div className="w-8 h-5 sm:w-10 sm:h-6 rounded bg-white/10" />}
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-center relative z-10" dir="ltr">
            {groups.map((g, i) => (
              <span key={i} className="font-mono text-white text-sm sm:text-lg tracking-widest" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)", letterSpacing: "0.12em" }}>
                {g.join("")}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-end relative z-10">
            <div className="min-w-0 flex-1 mr-3">
              <p className="text-white/50 text-[9px] sm:text-xs mb-0.5 uppercase tracking-widest">Card Holder</p>
              <p className="text-white font-semibold text-xs sm:text-sm uppercase tracking-wider truncate">{cardHolderName || "YOUR NAME"}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/50 text-[9px] sm:text-xs mb-0.5 uppercase tracking-widest">Expires</p>
              <p className="text-white font-semibold text-xs sm:text-sm font-mono" dir="ltr">{expiryDate || "MM/YY"}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)" }}
        >
          <div className="w-full h-8 sm:h-10 mt-5 sm:mt-6" style={{ background: "#1a1a1a" }} />
          <div className="px-4 sm:px-6 mt-3 sm:mt-4">
            <p className="text-white/50 text-[9px] sm:text-xs mb-1 uppercase tracking-widest">CVV</p>
            <div className="w-full h-8 sm:h-10 rounded-md flex items-center px-3 sm:px-4" style={{ background: "rgba(255,255,255,0.9)" }}>
              <span className="font-mono text-gray-800 tracking-widest text-sm sm:text-base ml-auto" dir="ltr">
                {cvv ? "•".repeat(cvv.length) : "•••"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
