import { useState } from "react";
import React from 'react'

const theme = darkMode
  ? {
      background:
        "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800",
      nav: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
      card: "bg-black/20 backdrop-blur-xl border-white/10 text-white",
      input: "bg-white/10 text-white border-white/20 placeholder-gray-300",
      button: "bg-gradient-to-r from-purple-600 to-pink-600 text-white",
      buttonSecondary:
        "bg-white/10 text-white hover:bg-white/20 border border-white/20",
      featureCard: "bg-white/5 text-white border-white/10",
      accent: "text-purple-400",
      glow: "shadow-2xl shadow-purple-500/20",
    }
  : {
      background: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
      nav: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
      card: "bg-white/40 backdrop-blur-xl border-white/20 text-gray-800",
      input: "bg-white/60 text-gray-800 border-white/30 placeholder-gray-500",
      button: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      buttonSecondary:
        "bg-white/60 text-gray-800 hover:bg-white/80 border border-white/30",
      featureCard: "bg-white/30 text-gray-800 border-white/20",
      accent: "text-indigo-600",
      glow: "shadow-2xl shadow-indigo-500/20",
    };
export default theme;
