import React from 'react';

export const Logo = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 40"
    height="40"
    aria-label="thecueRoom logo with anchored blink"
  >
    <style>{`
      #blinkPath { transform-origin: 50% 50%; animation: blink 10s infinite; }
      @keyframes blink {
        0%,92%,100% { transform: scaleY(1); opacity:1; }
        94% { transform: scaleY(.14); opacity:.85; }
        96% { transform: scaleY(1); opacity:1; }
      }
      @media (prefers-reduced-motion: reduce) { #blinkPath { animation: none; } }
    `}</style>
    <rect id="blinkPath" width="100" height="40" fill="#b2ff00" />
  </svg>
);

export default Logo;
