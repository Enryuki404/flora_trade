"use client";
import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
};

// Reusable image with graceful fallback: emerald gradient + icon instead of broken image
export default function SafeImage({
  src,
  alt,
  fill = true,
  sizes,
  priority = false,
  className = "object-cover",
  wrapperClassName = "",
}: Props) {
  const [error, setError] = useState(false);
  const noSrc = !src || src.trim() === "";

  if (error || noSrc) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 transition-colors duration-300 ${wrapperClassName}`}
        style={{
          background: `linear-gradient(135deg, var(--brand-primary, #0F7A4B), var(--brand-primary-hover, #0D6A41))`,
        }}
        aria-label={alt}
        role="img"
      >
        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-xl shadow-inner">
          🌿
        </div>
        <span className="mt-2 text-[11px] font-semibold tracking-widest uppercase opacity-80 text-center line-clamp-2 px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes || "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
      className={className}
      onError={() => setError(true)}
    />
  );
}

// Variant for fixed small thumbnails (w-16 h-16 style) that still needs fallback but not absolute inset logic duplicated
export function SafeThumb({
  src,
  alt,
  sizeClass = "w-16 h-16",
  rounded = "rounded-xl",
}: {
  src: string;
  alt: string;
  sizeClass?: string;
  rounded?: string;
}) {
  const [error, setError] = useState(false);
  const noSrc = !src || src.trim() === "";
  return (
    <div className={`relative ${sizeClass} ${rounded} overflow-hidden shrink-0 bg-stone-100`}>
      {error || noSrc ? (
        <div
          className="absolute inset-0 flex items-center justify-center text-white text-lg transition-colors duration-300"
          style={{ background: `linear-gradient(135deg, var(--brand-primary, #0F7A4B), var(--brand-primary-hover, #0D6A41))` }}
        >
          🌿
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="64px"
          className="object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
