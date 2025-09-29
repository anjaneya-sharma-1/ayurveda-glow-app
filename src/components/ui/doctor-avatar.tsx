import React from "react";

interface DoctorAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  isAnimated?: boolean;
}

export function DoctorAvatar({
  size = "md",
  className = "",
  isAnimated = true,
}: DoctorAvatarProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
    "2xl": "w-24 h-24",
  };

  const svgSize = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
    "2xl": 96,
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Background glow circle for larger sizes */}
      {(size === "lg" || size === "xl" || size === "2xl") && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-sm scale-110"></div>
      )}
      <svg
        width={svgSize[size]}
        height={svgSize[size]}
        viewBox="0 0 100 100"
        className={`w-full h-full ${
          isAnimated ? "animate-float" : ""
        } relative z-10`}
      >
        {/* Doctor's face */}
        <circle
          cx="50"
          cy="45"
          r="28"
          fill="#FDBCB4"
          stroke="#E8A298"
          strokeWidth="1"
        />

        {/* Face highlight for better dimension */}
        <ellipse cx="45" cy="42" rx="8" ry="6" fill="white" opacity="0.3" />

        {/* Hair */}
        <path
          d="M25 35 Q22 25 30 20 Q40 15 50 18 Q60 15 70 20 Q78 25 75 35 Q75 30 70 32 Q60 28 50 30 Q40 28 30 32 Q25 30 25 35"
          fill="#8B4513"
        />

        {/* Doctor's cap */}
        <ellipse
          cx="50"
          cy="22"
          rx="26"
          ry="8"
          fill="white"
          stroke="#E0E0E0"
          strokeWidth="1"
        />
        <rect x="47" y="18" width="6" height="8" fill="#FF6B6B" rx="1" />
        <rect x="45" y="20" width="10" height="4" fill="#FF6B6B" rx="1" />

        {/* Eyes */}
        <circle cx="42" cy="40" r="3" fill="white" />
        <circle cx="58" cy="40" r="3" fill="white" />
        <circle cx="42" cy="40" r="2" fill="#4A90E2" />
        <circle cx="58" cy="40" r="2" fill="#4A90E2" />
        <circle cx="42.5" cy="39.5" r="0.8" fill="white" />
        <circle cx="58.5" cy="39.5" r="0.8" fill="white" />

        {/* Eyebrows */}
        <path
          d="M38 36 Q42 34 46 36"
          stroke="#8B4513"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M54 36 Q58 34 62 36"
          stroke="#8B4513"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Nose */}
        <ellipse cx="50" cy="46" rx="2" ry="3" fill="#F5A7A1" />

        {/* Mouth - friendly smile */}
        <path
          d="M45 52 Q50 58 55 52"
          stroke="#D4849A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mustache */}
        <path
          d="M44 49 Q47 51 50 49 Q53 51 56 49"
          stroke="#8B4513"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Body/Coat */}
        <rect
          x="35"
          y="70"
          width="30"
          height="25"
          fill="white"
          stroke="#E0E0E0"
          strokeWidth="1"
          rx="3"
        />

        {/* Stethoscope */}
        <circle
          cx="40"
          cy="78"
          r="3"
          fill="#4A90E2"
          stroke="#2E5BBA"
          strokeWidth="1"
        />
        <path
          d="M43 78 Q48 75 52 78 Q55 82 58 78"
          stroke="#4A90E2"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="58" cy="78" r="1.5" fill="#4A90E2" />

        {/* Coat buttons */}
        <circle cx="50" cy="78" r="1" fill="#E0E0E0" />
        <circle cx="50" cy="85" r="1" fill="#E0E0E0" />

        {/* Pocket with pen */}
        <rect
          x="52"
          y="82"
          width="8"
          height="6"
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="0.8"
        />
        <rect x="55" y="80" width="1" height="6" fill="#FF6B6B" />
        <circle cx="55.5" cy="79" r="0.5" fill="#FF6B6B" />

        {/* Arms */}
        <ellipse
          cx="28"
          cy="80"
          rx="4"
          ry="12"
          fill="white"
          stroke="#E0E0E0"
          strokeWidth="1"
        />
        <ellipse
          cx="72"
          cy="80"
          rx="4"
          ry="12"
          fill="white"
          stroke="#E0E0E0"
          strokeWidth="1"
        />

        {/* Hands */}
        <circle cx="28" cy="92" r="3" fill="#FDBCB4" />
        <circle cx="72" cy="92" r="3" fill="#FDBCB4" />

        {/* Medical clipboard in left hand */}
        <rect
          x="23"
          y="88"
          width="8"
          height="6"
          fill="white"
          stroke="#D0D0D0"
          strokeWidth="0.8"
          rx="0.5"
        />
        <rect x="24" y="89" width="6" height="0.5" fill="#4A90E2" />
        <rect x="24" y="90" width="4" height="0.5" fill="#E0E0E0" />
        <rect x="24" y="91" width="5" height="0.5" fill="#E0E0E0" />

        {/* Waving gesture for right hand */}
        <g
          className={isAnimated ? "animate-wave" : ""}
          style={{ transformOrigin: "72px 92px" }}
        >
          <path
            d="M70 90 L74 88 M71 92 L75 90 M72 94 L76 92"
            stroke="#FDBCB4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Floating heart animation */}
      {isAnimated && (
        <div className="absolute -top-2 -right-2 animate-ping">
          <div className="w-3 h-3 bg-red-400 rounded-full opacity-75"></div>
        </div>
      )}
    </div>
  );
}

// CSS animations to add to the main CSS file
export const doctorAvatarStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  
  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    75% { transform: rotate(-10deg); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-wave {
    animation: wave 2s ease-in-out infinite;
  }
`;
