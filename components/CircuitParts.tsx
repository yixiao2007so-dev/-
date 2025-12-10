import React from 'react';

// Battery Component
export const Battery = ({ x, y, voltage }: { x: number; y: number; voltage: number }) => (
  <g transform={`translate(${x}, ${y})`}>
    <text x="0" y="-35" textAnchor="middle" className="text-sm font-bold fill-blue-700">{voltage}V</text>
    {/* Wire connections */}
    <line x1="-30" y1="0" x2="-10" y2="0" stroke="black" strokeWidth="3" />
    <line x1="10" y1="0" x2="30" y2="0" stroke="black" strokeWidth="3" />
    {/* Battery plates */}
    <line x1="-10" y1="-15" x2="-10" y2="15" stroke="black" strokeWidth="3" />
    <line x1="10" y1="-25" x2="10" y2="25" stroke="black" strokeWidth="3" />
    <text x="-15" y="-20" className="text-lg font-bold">-</text>
    <text x="15" y="-20" className="text-lg font-bold fill-red-500">+</text>
  </g>
);

// Light Bulb Component
// brightness: 0 to 1 (1 is max brightness)
// resistance: displays the ohms
export const Bulb = ({ x, y, brightness, label, resistance }: { x: number; y: number; brightness: number; label?: string; resistance?: number }) => {
  // Clamp brightness between 0 and 1.5 for visual safety
  const intensity = Math.min(Math.max(brightness, 0), 1.5);
  
  // Calculate visual properties
  const glowOpacity = Math.min(intensity * 0.8, 0.9);
  const glowRadius = 25 + (intensity * 15);
  
  // Filament color: Gray (off) -> Red (dim) -> Orange -> Yellow -> White (very bright)
  let filamentColor = "#9CA3AF";
  let glassFill = "white";
  
  if (intensity > 0) {
    if (intensity < 0.2) {
       filamentColor = "#7f1d1d"; // Dark red
       glassFill = "#fef2f2"; 
    } else if (intensity < 0.5) {
       filamentColor = "#ea580c"; // Orange
       glassFill = "#fff7ed";
    } else {
       filamentColor = "#CA8A04"; // Yellow/Gold
       glassFill = "#FEF08A";
    }
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      {label && <text x="0" y="55" textAnchor="middle" className="text-xs font-medium fill-gray-600">{label}</text>}
      {resistance !== undefined && (
        <text x="0" y="-28" textAnchor="middle" className="text-xs font-bold fill-amber-700">{resistance}Ω</text>
      )}
      
      {/* Glow effect */}
      {intensity > 0.05 && (
        <circle cx="0" cy="0" r={glowRadius} fill="yellow" fillOpacity={glowOpacity}>
          <animate attributeName="r" values={`${glowRadius};${glowRadius + 3};${glowRadius}`} dur="1s" repeatCount="indefinite" />
        </circle>
      )}
      
      {/* Bulb Glass */}
      <circle cx="0" cy="0" r="20" fill={glassFill} stroke="black" strokeWidth="2" />
      
      {/* Filament */}
      <path d="M-10 0 Q-5 -10 0 0 Q5 -10 10 0" fill="none" stroke={filamentColor} strokeWidth="2" />
      
      {/* Base */}
      <rect x="-8" y="17" width="16" height="10" fill="#4B5563" />
      <path d="M-8 27 Q0 32 8 27" fill="none" stroke="black" strokeWidth="1" />
    </g>
  );
};

// Switch Component
export const Switch = ({ x, y, isOpen, onClick, label }: { x: number; y: number; isOpen: boolean; onClick: () => void; label?: string }) => (
  <g transform={`translate(${x}, ${y})`} onClick={onClick} className="cursor-pointer group">
    {label && <text x="0" y="-25" textAnchor="middle" className="text-xs font-medium fill-gray-600 group-hover:fill-blue-600">{label}</text>}
    
    {/* Terminals */}
    <circle cx="-20" cy="0" r="4" fill="black" />
    <circle cx="20" cy="0" r="4" fill="black" />
    
    {/* Switch Arm */}
    <line 
      x1="-20" 
      y1="0" 
      x2="18" 
      y2="0" 
      stroke="black" 
      strokeWidth="3" 
      transform={isOpen ? "rotate(-30, -20, 0)" : "rotate(0, -20, 0)"}
      className="transition-transform duration-300 origin-left"
    />
    
    {/* Click target area */}
    <rect x="-25" y="-20" width="50" height="40" fill="transparent" />
  </g>
);

// Electron Flow Path Component
// current: affects animation speed. 0 = no flow.
export const ElectronPath = ({ d, current }: { d: string; current: number }) => {
  if (current <= 0) return <path d={d} fill="none" stroke="black" strokeWidth="3" />;
  
  // Calculate animation duration. Higher current = faster (lower duration)
  // Base speed for 1A is approx 1s.
  // Clamp speed to avoid too fast or too slow.
  const duration = Math.max(0.2, Math.min(2 / current, 5));

  return (
    <g>
      {/* Base wire */}
      <path d={d} fill="none" stroke="#FDE047" strokeWidth="5" /> 
      {/* Moving dashes */}
      <path 
        d={d} 
        fill="none" 
        stroke="#EAB308" 
        strokeWidth="3" 
        strokeDasharray="10,10"
        className="current-flow"
        style={{ animationDuration: `${duration}s` }}
      />
    </g>
  );
};