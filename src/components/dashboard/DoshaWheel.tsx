import { useMemo } from "react";

interface DoshaWheelProps {
  vata: number;  // 0-100
  pitta: number; // 0-100
  kapha: number; // 0-100
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DoshaWheel({ vata, pitta, kapha, size = "md", className = "" }: DoshaWheelProps) {
  const total = vata + pitta + kapha;
  
  const normalizedVata = (vata / total) * 100;
  const normalizedPitta = (pitta / total) * 100;
  const normalizedKapha = (kapha / total) * 100;

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const strokeWidth = {
    sm: 8,
    md: 12,
    lg: 16
  };

  const radius = {
    sm: 24,
    md: 36,
    lg: 48
  };

  const circumference = 2 * Math.PI * radius[size];
  
  const vataDasharray = (normalizedVata / 100) * circumference;
  const pittaDasharray = (normalizedPitta / 100) * circumference;
  const kaphaDasharray = (normalizedKapha / 100) * circumference;
  
  const vataDashoffset = 0;
  const pittaDashoffset = -vataDasharray;
  const kaphaDashoffset = -(vataDasharray + pittaDasharray);

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        className="transform -rotate-90 w-full h-full"
        width="100%"
        height="100%"
        viewBox={`0 0 ${radius[size] * 2 + strokeWidth[size]} ${radius[size] * 2 + strokeWidth[size]}`}
      >
        {/* Background circle */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth[size]}
          className="opacity-20"
        />
        
        {/* Vata segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke="hsl(var(--vata-color))"
          strokeWidth={strokeWidth[size]}
          strokeDasharray={`${vataDasharray} ${circumference - vataDasharray}`}
          strokeDashoffset={vataDashoffset}
          className="transition-all duration-700 ease-out drop-shadow-lg"
          strokeLinecap="round"
        />
        
        {/* Pitta segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke="hsl(var(--pitta-color))"
          strokeWidth={strokeWidth[size]}
          strokeDasharray={`${pittaDasharray} ${circumference - pittaDasharray}`}
          strokeDashoffset={pittaDashoffset}
          className="transition-all duration-700 ease-out drop-shadow-lg"
          strokeLinecap="round"
        />
        
        {/* Kapha segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke="hsl(var(--kapha-color))"
          strokeWidth={strokeWidth[size]}
          strokeDasharray={`${kaphaDasharray} ${circumference - kaphaDasharray}`}
          strokeDashoffset={kaphaDashoffset}
          className="transition-all duration-700 ease-out drop-shadow-lg"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs font-semibold text-muted-foreground">DOSHA</div>
          <div className="text-sm font-bold text-foreground">BALANCE</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-vata"></div>
          <span className="text-xs text-muted-foreground">V</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-pitta"></div>
          <span className="text-xs text-muted-foreground">P</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-kapha"></div>
          <span className="text-xs text-muted-foreground">K</span>
        </div>
      </div>
    </div>
  );
}