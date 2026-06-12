"use client";

import { useEffect, useState } from "react";

const INTRO_MS = 3700;

const INK = "#5F5849";
const PAPER = "#F0EAD6";

// Vintage-sketch intro: the page starts as aged paper tied with a
// pencil-drawn ribbon at the center seam. A little dove flies in, grips
// the ribbon end, unties the bow and carries it away — then the paper
// opens along the seam to reveal the site.
export function GiftIntro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    document.body.classList.add("intro-lock");
    const t = setTimeout(() => setShow(false), INTRO_MS);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("intro-lock");
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="gift-intro" onClick={() => setShow(false)}>
      <div className="gi-panel gi-panel-left" aria-hidden="true" />
      <div className="gi-panel gi-panel-right" aria-hidden="true" />

      {/* Bow tied around the seam */}
      <svg
        className="gi-bow"
        viewBox="0 0 300 260"
        fill="none"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <filter id="giRoughBow" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" />
          </filter>
        </defs>
        <g filter="url(#giRoughBow)">
          {/* Hanging tails */}
          <g className="gi-tail gi-tail-1">
            <path d="M146 72 C 138 104 148 130 132 162 C 122 182 108 198 100 220" />
            <path d="M152 74 C 146 106 156 132 140 164 C 130 184 116 200 108 224" />
            <path d="M100 220 L108 224" />
          </g>
          <g className="gi-tail gi-tail-2">
            <path d="M148 74 C 152 108 142 134 152 166 C 158 186 168 198 172 212" />
            <path d="M154 72 C 158 106 148 132 158 164 C 164 184 174 196 178 208" />
            <path d="M172 212 L178 208" />
          </g>
          {/* Free end the bird grabs */}
          <g className="gi-grab-tail">
            <path d="M158 60 C 196 72 244 80 292 74" />
            <path d="M158 68 C 196 80 244 88 292 84" />
            <path d="M292 74 L292 84" />
          </g>
          {/* Loops */}
          <g className="gi-loop gi-loop-l">
            <path d="M150 62 C 118 18 58 14 60 48 C 62 78 116 82 150 62" />
            <path d="M147 59 C 120 28 76 26 78 48 C 80 66 118 70 147 59" />
          </g>
          <g className="gi-loop gi-loop-r">
            <path d="M150 62 C 182 18 242 14 240 48 C 238 78 184 82 150 62" />
            <path d="M153 59 C 180 28 224 26 222 48 C 220 66 182 70 153 59" />
          </g>
          {/* Knot */}
          <path
            className="gi-knot"
            fill={PAPER}
            d="M143 54 C 138 60 138 68 144 72 C 150 76 158 74 161 68 C 164 61 161 54 155 51 C 150 49 146 50 143 54 Z"
          />
        </g>
      </svg>

      {/* Dove (faces left, grips the ribbon end) */}
      <svg
        className="gi-bird"
        viewBox="0 0 120 100"
        fill="none"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <filter id="giRoughBird" x="-200%" y="-50%" width="500%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
        <g filter="url(#giRoughBird)">
          {/* Ribbon carried in the beak (appears at the grab) */}
          <g className="gi-trail">
            <path d="M19 33 C -6 40 -34 36 -60 46 C -78 53 -90 50 -100 58" />
            <path d="M19 36 C -6 43 -34 39 -60 49 C -78 56 -90 53 -100 61" />
            <path d="M-100 58 L-100 61" />
          </g>
          {/* Wings raised */}
          <g className="gi-wings">
            <path d="M60 42 C 60 26 76 10 96 12 C 84 20 84 32 72 44 C 68 46 63 45 60 42 Z" fill={PAPER} />
            <path d="M52 40 C 48 24 60 6 82 4 C 72 14 72 28 64 40 C 60 44 55 43 52 40 Z" fill={PAPER} />
            <path d="M62 34 C 62 24 70 12 80 8" />
            <path d="M58 36 C 56 26 62 16 68 10" />
          </g>
          {/* Tail feathers */}
          <path d="M80 58 L110 48" />
          <path d="M81 62 L114 58" />
          <path d="M80 65 L110 68" />
          {/* Body */}
          <path
            d="M32 60 C 28 48 40 40 54 41 C 70 42 80 50 81 61 C 82 70 73 78 58 78 C 44 78 35 70 32 60 Z"
            fill={PAPER}
          />
          {/* Head */}
          <path
            d="M44 47 C 35 46 28 39 31 30 C 34 22 45 20 51 25 C 56 30 56 39 52 45 C 49 47 46 47 44 47 Z"
            fill={PAPER}
          />
          {/* Beak gripping ribbon */}
          <path d="M32 28 L19 33" />
          <path d="M19 33 L33 36" />
          <circle cx="39" cy="32" r="1.5" fill={INK} stroke="none" />
        </g>
      </svg>

      <button type="button" className="gi-skip" onClick={() => setShow(false)}>
        Skip intro
      </button>
    </div>
  );
}
