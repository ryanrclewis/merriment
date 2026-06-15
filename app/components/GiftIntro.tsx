"use client";

import { useEffect, useState } from "react";

const INTRO_MS = 4800;

const INK = "#6F6759";
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
        strokeWidth="1.6"
        strokeOpacity="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <filter id="giRoughBow" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
        <g filter="url(#giRoughBow)">
          {/* Hanging tails — crossing S-curves with curled ends */}
          <g className="gi-tail gi-tail-1">
            <path d="M146 72 C 142 100 152 124 140 152 C 130 174 112 190 104 214" />
            <path d="M152 74 C 148 102 158 126 146 154 C 136 176 118 192 110 218" />
            <path d="M104 214 L110 218" />
            <path d="M107 216 C 101 224 103 232 111 233" />
          </g>
          <g className="gi-tail gi-tail-2">
            <path d="M150 74 C 156 104 144 130 154 158 C 160 178 170 190 172 204" />
            <path d="M156 72 C 162 102 150 128 160 156 C 166 176 176 188 178 202" />
            <path d="M172 204 L178 202" />
            <path d="M175 203 C 179 211 175 219 167 220" />
          </g>
          {/* Free end the bird grabs — long soft S-curve */}
          <g className="gi-grab-tail">
            <path d="M158 60 C 190 66 218 84 248 82 C 266 80 280 72 294 72" />
            <path d="M158 68 C 190 74 218 92 248 90 C 266 88 280 80 294 82" />
            <path d="M294 72 L294 82" />
          </g>
          {/* Loops — wide, gently drooping */}
          <g className="gi-loop gi-loop-l">
            <path d="M150 62 C 124 24 70 10 58 36 C 48 60 100 84 150 64" />
            <path d="M147 60 C 124 34 84 24 74 40 C 66 56 106 74 146 61" />
          </g>
          <g className="gi-loop gi-loop-r">
            <path d="M152 62 C 178 26 230 16 240 40 C 248 62 198 82 152 64" />
            <path d="M154 60 C 178 36 216 28 226 42 C 233 56 196 72 154 61" />
          </g>
          {/* Knot */}
          <path
            className="gi-knot"
            fill={PAPER}
            d="M142 54 C 137 60 137 68 143 72 C 149 76 158 74 161 68 C 164 61 161 53 154 51 C 149 49 145 50 142 54 Z"
          />
        </g>
      </svg>

      {/* Dove (faces left, grips the ribbon end) */}
      <svg
        className="gi-bird"
        viewBox="0 0 140 110"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeOpacity="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <filter id="giRoughBird" x="-200%" y="-50%" width="500%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" />
          </filter>
        </defs>
        <g filter="url(#giRoughBird)">
          <g className="gi-float">
            {/* Ribbon carried in the beak (appears at the grab) */}
            <g className="gi-trail">
              <path d="M14 38 C -8 50 -26 62 -48 62 C -72 62 -88 54 -104 58" />
              <path d="M14 41 C -8 53 -26 65 -48 65 C -72 65 -88 57 -104 61" />
              <path d="M-104 58 L-104 61" />
            </g>
            {/* Raised wings — two long smooth swept feathers */}
            <g className="gi-wings">
              <path
                d="M58 48 C 58 30 72 12 96 8 C 84 22 82 38 70 50 C 66 52 61 51 58 48 Z"
                fill={PAPER}
              />
              <path d="M68 44 C 70 30 78 18 90 11" />
              <path
                d="M50 46 C 48 30 60 14 82 8 C 70 22 70 36 62 47 C 58 50 53 49 50 46 Z"
                fill={PAPER}
              />
              <path d="M58 42 C 58 30 64 20 75 13" />
            </g>
            {/* Pointed tail — a few clean feather strokes */}
            <path
              d="M78 60 C 92 54 106 52 122 50 C 110 56 106 60 116 62 C 104 66 90 68 80 66 C 78 64 77 62 78 60 Z"
              fill={PAPER}
            />
            <path d="M82 61 C 96 58 108 56 120 53" />
            <path d="M82 64 C 94 63 104 63 114 62" />
            {/* Body — plump breast */}
            <path
              d="M34 52 C 32 42 42 36 54 38 C 70 40 82 50 82 62 C 82 72 72 79 58 78 C 46 77 36 68 34 52 Z"
              fill={PAPER}
            />
            <path d="M48 72 C 54 75 62 76 68 74" />
            {/* Tucked feet */}
            <path d="M54 78 C 55 82 58 84 61 84" />
            <path d="M60 78 C 61 82 64 83 67 83" />
            {/* Head — round, dove-like */}
            <path
              d="M24 42 C 22 34 28 27 37 28 C 45 29 49 37 46 44 C 44 49 38 52 32 50 C 28 49 25 46 24 42 Z"
              fill={PAPER}
            />
            {/* Beak gripping ribbon */}
            <path d="M25 33 L14 38" />
            <path d="M14 38 L26 40" />
            <circle cx="33" cy="36" r="1.4" fill={INK} stroke="none" />
          </g>
        </g>
      </svg>

      <button type="button" className="gi-skip" onClick={() => setShow(false)}>
        Skip intro
      </button>
    </div>
  );
}
