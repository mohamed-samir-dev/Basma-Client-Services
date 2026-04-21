"use client";

import { useRef, useLayoutEffect } from "react";
import { Icon } from "@iconify/react";
import { detectCardType } from "./CreditCard";

function formatCard(raw: string) {
  return raw.replace(/(.{4})(?=.)/g, "$1 ");
}

export default function CardNumberInput({ value, onChange, onBlur, hasError }: {
  value: string;
  onChange: (raw: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const nextCursor = useRef<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorBefore = input.selectionStart ?? 0;
    const prevValue = input.value;
    const raw = prevValue.replace(/\D/g, "").slice(0, 16);
    const newFormatted = formatCard(raw);
    const deletedSpace = prevValue[cursorBefore] === " " && raw.length < value.length;
    const rawDigitsBefore = prevValue.slice(0, cursorBefore).replace(/\D/g, "").length;
    let digits = 0, pos = 0;
    for (pos = 0; pos <= newFormatted.length; pos++) {
      if (digits === rawDigitsBefore) break;
      if (pos < newFormatted.length && newFormatted[pos] !== " ") digits++;
    }
    nextCursor.current = deletedSpace ? Math.max(0, pos - 1) : pos;
    onChange(raw);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 16);
    onChange(pasted);
    nextCursor.current = formatCard(pasted).length;
  };

  useLayoutEffect(() => {
    if (nextCursor.current !== null && inputRef.current) {
      inputRef.current.setSelectionRange(nextCursor.current, nextCursor.current);
      nextCursor.current = null;
    }
  });

  const cardType = detectCardType(value);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className={`w-full bg-surface-container-low border-none rounded-xl px-5 py-4 pr-14 text-base text-on-surface focus:ring-2 focus:bg-white transition-all outline-none font-mono tracking-widest ${
          hasError ? "ring-2 ring-error/40" : "focus:ring-primary/20"
        }`}
        dir="ltr"
        style={{ textAlign: "left", unicodeBidi: "plaintext" }}
        value={formatCard(value)}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={onBlur}
        placeholder="•••• •••• •••• ••••"
        maxLength={19}
        inputMode="numeric"
        autoComplete="cc-number"
        required
      />
      {cardType !== "unknown" && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon
            icon={cardType === "visa" ? "logos:visa" : "logos:mastercard"}
            width={36}
            height={24}
          />
        </div>
      )}
    </div>
  );
}
