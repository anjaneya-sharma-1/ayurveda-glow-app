import { useMemo, useState } from "react";

interface DoshaWheelProps {
  vata: number;  // 0-100
  pitta: number; // 0-100
  kapha: number; // 0-100
  size?: "sm" | "md" | "lg";
  className?: string;
  interactive?: boolean;
}

export function DoshaWheel({ vata, pitta, kapha, size = "md", className = "", interactive = false }: DoshaWheelProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
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

  const getDoshaInterpretation = (vata: number, pitta: number, kapha: number) => {
    const dominant = Math.max(vata, pitta, kapha);
    if (dominant === vata) return { name: "Vata", description: "Air & Space - Movement, Creativity", color: "vata" };
    if (dominant === pitta) return { name: "Pitta", description: "Fire & Water - Transformation, Metabolism", color: "pitta" };
    return { name: "Kapha", description: "Earth & Water - Structure, Stability", color: "kapha" };
  };

  const interpretation = getDoshaInterpretation(vata, pitta, kapha);

  return (
    <div className={`relative ${sizeClasses[size]} ${className} group`}>
      <svg
        className="transform -rotate-90 w-full h-full filter drop-shadow-sm"
        width="100%"
        height="100%"
        viewBox={`0 0 ${radius[size] * 2 + strokeWidth[size]} ${radius[size] * 2 + strokeWidth[size]}`}
      >
        {/* Background circle with subtle pattern */}
        <defs>
          <linearGradient id={`bg-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`vata-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--vata-color))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(160 80% 35%)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`pitta-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--pitta-color))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(25 90% 45%)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`kapha-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--kapha-color))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(220 75% 45%)" stopOpacity="1" />
          </linearGradient>
        </defs>
        
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke={`url(#bg-gradient-${size})`}
          strokeWidth={strokeWidth[size]}
        />
        
        {/* Vata segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke={`url(#vata-gradient-${size})`}
          strokeWidth={hoveredSegment === 'vata' ? strokeWidth[size] + 2 : strokeWidth[size]}
          strokeDasharray={`${vataDasharray} ${circumference - vataDasharray}`}
          strokeDashoffset={vataDashoffset}
          className={`transition-all duration-700 ease-out ${interactive ? 'cursor-pointer' : ''}`}
          strokeLinecap="round"
          onMouseEnter={() => interactive && setHoveredSegment('vata')}
          onMouseLeave={() => interactive && setHoveredSegment(null)}
          style={{
            filter: hoveredSegment === 'vata' ? 'drop-shadow(0 0 8px hsl(var(--vata-color)))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            animation: 'draw-vata 2s ease-out'
          }}
        />
        
        {/* Pitta segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke={`url(#pitta-gradient-${size})`}
          strokeWidth={hoveredSegment === 'pitta' ? strokeWidth[size] + 2 : strokeWidth[size]}
          strokeDasharray={`${pittaDasharray} ${circumference - pittaDasharray}`}
          strokeDashoffset={pittaDashoffset}
          className={`transition-all duration-700 ease-out ${interactive ? 'cursor-pointer' : ''}`}
          strokeLinecap="round"
          onMouseEnter={() => interactive && setHoveredSegment('pitta')}
          onMouseLeave={() => interactive && setHoveredSegment(null)}
          style={{
            filter: hoveredSegment === 'pitta' ? 'drop-shadow(0 0 8px hsl(var(--pitta-color)))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            animation: 'draw-pitta 2s ease-out 0.3s both'
          }}
        />
        
        {/* Kapha segment */}
        <circle
          cx={radius[size] + strokeWidth[size] / 2}
          cy={radius[size] + strokeWidth[size] / 2}
          r={radius[size]}
          fill="none"
          stroke={`url(#kapha-gradient-${size})`}
          strokeWidth={hoveredSegment === 'kapha' ? strokeWidth[size] + 2 : strokeWidth[size]}
          strokeDasharray={`${kaphaDasharray} ${circumference - kaphaDasharray}`}
          strokeDashoffset={kaphaDashoffset}
          className={`transition-all duration-700 ease-out ${interactive ? 'cursor-pointer' : ''}`}
          strokeLinecap="round"
          onMouseEnter={() => interactive && setHoveredSegment('kapha')}
          onMouseLeave={() => interactive && setHoveredSegment(null)}
          style={{
            filter: hoveredSegment === 'kapha' ? 'drop-shadow(0 0 8px hsl(var(--kapha-color)))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            animation: 'draw-kapha 2s ease-out 0.6s both'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground tracking-wide">प्रकृति</div>
          <div className={`text-sm font-bold text-${interpretation.color} transition-colors duration-500`}>
            {interpretation.name.toUpperCase()}
          </div>
          {size === "lg" && (
            <div className="text-xs text-muted-foreground mt-1 max-w-20">
              {interpretation.description.split(' - ')[0]}
            </div>
          )}
        </div>
      </div>
      
      {/* Interactive tooltip */}
      {hoveredSegment && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-floating z-10 animate-fade-in">
          <div className="text-center">
            <div className={`text-sm font-semibold text-${hoveredSegment}`}>
              {hoveredSegment.charAt(0).toUpperCase() + hoveredSegment.slice(1)}: {
                hoveredSegment === 'vata' ? vata : 
                hoveredSegment === 'pitta' ? pitta : kapha
              }%
            </div>
            <div className="text-xs text-muted-foreground">
              {hoveredSegment === 'vata' && "Air & Space - Movement, Creativity"}
              {hoveredSegment === 'pitta' && "Fire & Water - Transformation, Metabolism"}  
              {hoveredSegment === 'kapha' && "Earth & Water - Structure, Stability"}
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Legend */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-6">
        <div className="flex flex-col items-center gap-1 group cursor-pointer"
             onMouseEnter={() => interactive && setHoveredSegment('vata')}
             onMouseLeave={() => interactive && setHoveredSegment(null)}>
          <div className="w-3 h-3 rounded-full bg-vata shadow-sm group-hover:scale-110 transition-transform"></div>
          <span className="text-xs text-muted-foreground font-medium">V</span>
          <span className="text-xs text-vata font-semibold">{vata}%</span>
        </div>
        <div className="flex flex-col items-center gap-1 group cursor-pointer"
             onMouseEnter={() => interactive && setHoveredSegment('pitta')}
             onMouseLeave={() => interactive && setHoveredSegment(null)}>
          <div className="w-3 h-3 rounded-full bg-pitta shadow-sm group-hover:scale-110 transition-transform"></div>
          <span className="text-xs text-muted-foreground font-medium">P</span>
          <span className="text-xs text-pitta font-semibold">{pitta}%</span>
        </div>
        <div className="flex flex-col items-center gap-1 group cursor-pointer"
             onMouseEnter={() => interactive && setHoveredSegment('kapha')}
             onMouseLeave={() => interactive && setHoveredSegment(null)}>
          <div className="w-3 h-3 rounded-full bg-kapha shadow-sm group-hover:scale-110 transition-transform"></div>
          <span className="text-xs text-muted-foreground font-medium">K</span>
          <span className="text-xs text-kapha font-semibold">{kapha}%</span>
        </div>
      </div>
    </div>
  );
}