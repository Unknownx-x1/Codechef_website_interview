"use client";

import { motion } from "framer-motion";

export function HeroMascot() {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[640px]"
      aria-label="CodeChef mascot logo"
    >
      <svg viewBox="0 0 920 320" role="img" className="h-auto w-full overflow-visible drop-shadow-[0_22px_40px_rgba(0,0,0,0.35)]">
        <title>CodeChef mascot logo</title>
        <defs>
          <linearGradient id="hatFill" x1="85" x2="255" y1="22" y2="172" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fffdf1" />
            <stop offset="0.52" stopColor="#efe6c5" />
            <stop offset="1" stopColor="#cdbb8e" />
          </linearGradient>
          <linearGradient id="plaqueFill" x1="270" x2="900" y1="120" y2="188" gradientUnits="userSpaceOnUse">
            <stop stopColor="#765034" />
            <stop offset="1" stopColor="#4c2e1f" />
          </linearGradient>
        </defs>

        <path
          d="M226 111 L875 84 Q900 83 904 108 L905 218 Q902 244 874 243 L227 231 Q205 229 202 208 L203 138 Q206 115 226 111Z"
          fill="#fffef4"
        />
        <path
          d="M244 127 L858 102 Q879 101 883 120 L884 207 Q881 226 858 225 L245 214 Q222 212 220 197 L221 147 Q224 130 244 127Z"
          fill="url(#plaqueFill)"
        />

        <text
          x="335"
          y="198"
          fill="#fffdf4"
          fontFamily="Arial Black, Space Grotesk, sans-serif"
          fontSize="76"
          fontWeight="900"
          letterSpacing="-2"
        >
          CODECHEF
        </text>

        <g transform="translate(18 -4)">
          <path
            d="M91 171 C78 167 63 172 54 183 C44 194 42 210 51 222 C61 235 80 236 94 241 C99 277 133 304 178 304 C223 304 257 277 262 241 C276 236 295 235 305 222 C314 210 312 194 302 183 C293 172 278 167 265 171 C261 147 250 124 232 103 C257 63 238 29 198 36 C176 13 139 15 123 43 C85 43 65 75 83 112 C72 132 66 151 69 171 C75 169 83 169 91 171Z"
            fill="#fffef4"
            stroke="#fffef4"
            strokeWidth="15"
            strokeLinejoin="round"
          />
          <path
            d="M83 119 C63 82 84 49 121 55 C133 22 168 16 194 43 C237 31 259 64 232 104 C246 126 253 149 250 174 C206 163 121 163 76 174 C75 150 77 135 83 119Z"
            fill="url(#hatFill)"
            stroke="#fffdf4"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          <path d="M79 173 C122 161 205 161 248 173 L245 194 C201 183 124 183 82 194Z" fill="#ded1a6" stroke="#bdaa80" strokeWidth="3" />
          <path d="M105 65 C96 101 102 133 122 164" fill="none" stroke="#b9a77b" strokeWidth="7" strokeLinecap="round" />
          <path d="M145 45 C137 91 140 128 153 164" fill="none" stroke="#b9a77b" strokeWidth="7" strokeLinecap="round" />
          <path d="M190 47 C177 86 173 126 174 164" fill="none" stroke="#b9a77b" strokeWidth="7" strokeLinecap="round" />
          <path d="M224 82 C207 109 198 136 197 164" fill="none" stroke="#b9a77b" strokeWidth="6" strokeLinecap="round" />

          <path d="M70 199 L37 216 L70 234" fill="none" stroke="#694d3d" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M256 199 L289 216 L256 234" fill="none" stroke="#694d3d" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M116 209 Q128 202 140 209" fill="none" stroke="#694d3d" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M194 209 Q206 202 218 209" fill="none" stroke="#694d3d" strokeWidth="4.5" strokeLinecap="round" />
          <ellipse cx="136" cy="227" rx="10" ry="11" fill="#694d3d" />
          <circle cx="132" cy="223" r="3" fill="#fffef4" />
          <ellipse cx="199" cy="227" rx="10" ry="11" fill="#694d3d" />
          <circle cx="195" cy="223" r="3" fill="#fffef4" />
          <path d="M161 243 Q168 250 174 243 Q180 250 187 243" fill="none" stroke="#694d3d" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M103 260 C118 293 165 296 178 267 C155 247 127 248 103 260Z" fill="#694d3d" />
          <path d="M192 267 C205 296 252 293 267 260 C243 248 215 247 192 267Z" fill="#694d3d" />
        </g>
      </svg>
    </motion.figure>
  );
}
