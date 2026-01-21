import { useEffect, useState } from "react";

interface ForestSceneProps {
  growthLevel: number; // 0-100
  className?: string;
}

const ForestScene = ({ growthLevel, className = "" }: ForestSceneProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate what elements to show based on growth
  const treeCount = Math.floor(growthLevel / 10);
  const hasWater = growthLevel >= 30;
  const hasBirds = growthLevel >= 50;
  const hasAnimals = growthLevel >= 70;
  const hasFlowers = growthLevel >= 20;
  const hasBushes = growthLevel >= 15;

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl ${className}`}>
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-light via-sky-light to-transparent" />
      
      {/* Sun */}
      <div 
        className="absolute top-8 right-12 w-16 h-16 rounded-full bg-sun animate-pulse-glow"
        style={{ 
          boxShadow: '0 0 60px hsl(45 95% 60% / 0.5), 0 0 100px hsl(45 95% 60% / 0.3)',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease-out'
        }}
      />

      {/* Clouds */}
      <svg className="absolute top-12 left-8 w-24 h-12 animate-float" style={{ animationDelay: '0s' }}>
        <ellipse cx="40" cy="25" rx="35" ry="15" fill="white" opacity="0.8" />
        <ellipse cx="55" cy="20" rx="25" ry="12" fill="white" opacity="0.9" />
        <ellipse cx="25" cy="22" rx="20" ry="10" fill="white" opacity="0.7" />
      </svg>
      <svg className="absolute top-20 left-1/3 w-20 h-10 animate-float" style={{ animationDelay: '1s' }}>
        <ellipse cx="35" cy="20" rx="30" ry="12" fill="white" opacity="0.7" />
        <ellipse cx="50" cy="15" rx="20" ry="10" fill="white" opacity="0.8" />
      </svg>

      {/* Ground layers */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 800 200" preserveAspectRatio="none">
        {/* Far hills */}
        <path
          d="M0 150 Q100 100 200 130 Q350 80 500 120 Q650 70 800 100 L800 200 L0 200 Z"
          fill="hsl(142 35% 50%)"
          opacity="0.4"
        />
        {/* Middle hills */}
        <path
          d="M0 160 Q150 120 300 150 Q450 110 600 140 Q750 100 800 130 L800 200 L0 200 Z"
          fill="hsl(142 40% 40%)"
          opacity="0.6"
        />
        {/* Main ground */}
        <path
          d="M0 170 Q200 150 400 165 Q600 145 800 160 L800 200 L0 200 Z"
          fill="hsl(142 45% 32%)"
        />
        {/* Earth/dirt layer */}
        <path
          d="M0 190 Q400 180 800 190 L800 200 L0 200 Z"
          fill="hsl(30 35% 35%)"
        />
      </svg>

      {/* Water pond - appears at 30% growth */}
      {hasWater && (
        <svg 
          className="absolute bottom-8 left-1/4 w-40 h-16 animate-fade-in"
          viewBox="0 0 160 60"
        >
          <ellipse cx="80" cy="30" rx="75" ry="25" fill="hsl(195 70% 50%)" opacity="0.8" />
          <ellipse cx="80" cy="28" rx="60" ry="18" fill="hsl(195 75% 60%)" opacity="0.6" />
          <ellipse cx="75" cy="25" rx="40" ry="10" fill="hsl(195 80% 70%)" opacity="0.4" />
        </svg>
      )}

      {/* Trees container */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-around items-end px-4">
        {Array.from({ length: Math.min(treeCount, 8) }).map((_, i) => (
          <Tree 
            key={i} 
            index={i} 
            isNew={i === treeCount - 1 && mounted}
            size={0.6 + (i % 3) * 0.2}
          />
        ))}
      </div>

      {/* Bushes */}
      {hasBushes && (
        <>
          <Bush className="absolute bottom-10 left-8" delay="0.2s" />
          <Bush className="absolute bottom-12 right-16" delay="0.5s" />
          <Bush className="absolute bottom-10 left-1/2" delay="0.8s" />
        </>
      )}

      {/* Flowers */}
      {hasFlowers && (
        <div className="absolute bottom-14 left-0 right-0 flex justify-around px-12">
          {Array.from({ length: Math.floor(growthLevel / 20) }).map((_, i) => (
            <Flower key={i} color={i % 3} delay={`${i * 0.2}s`} />
          ))}
        </div>
      )}

      {/* Birds */}
      {hasBirds && (
        <>
          <Bird className="absolute top-24 left-1/3" delay="0s" />
          <Bird className="absolute top-32 right-1/4" delay="0.5s" />
        </>
      )}

      {/* Animals */}
      {hasAnimals && (
        <>
          <Rabbit className="absolute bottom-16 right-1/4" />
          {growthLevel >= 85 && <Deer className="absolute bottom-20 left-1/3" />}
        </>
      )}

      {/* Growth level indicator */}
      <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Forest Health</span>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${growthLevel}%` }}
            />
          </div>
          <span className="text-xs font-bold text-primary">{growthLevel}%</span>
        </div>
      </div>
    </div>
  );
};

const Tree = ({ index, isNew, size }: { index: number; isNew: boolean; size: number }) => {
  const height = 60 + size * 40;
  const width = 40 + size * 20;
  
  return (
    <svg 
      className={`${isNew ? 'animate-grow' : ''} animate-sway`}
      style={{ 
        animationDelay: `${index * 0.3}s`,
        transformOrigin: 'bottom center',
        height: `${height}px`,
        width: `${width}px`
      }}
      viewBox="0 0 60 100"
    >
      {/* Trunk */}
      <rect x="25" y="60" width="10" height="40" fill="hsl(30 35% 35%)" rx="2" />
      {/* Foliage layers */}
      <ellipse cx="30" cy="50" rx="25" ry="20" fill="hsl(142 45% 32%)" />
      <ellipse cx="30" cy="40" rx="22" ry="18" fill="hsl(142 40% 38%)" />
      <ellipse cx="30" cy="32" rx="18" ry="15" fill="hsl(142 35% 45%)" />
      <ellipse cx="30" cy="25" rx="12" ry="12" fill="hsl(142 30% 50%)" />
    </svg>
  );
};

const Bush = ({ className, delay }: { className: string; delay: string }) => (
  <svg 
    className={`w-12 h-8 animate-fade-in ${className}`}
    style={{ animationDelay: delay }}
    viewBox="0 0 50 30"
  >
    <ellipse cx="15" cy="20" rx="12" ry="10" fill="hsl(142 40% 35%)" />
    <ellipse cx="35" cy="20" rx="12" ry="10" fill="hsl(142 40% 35%)" />
    <ellipse cx="25" cy="15" rx="15" ry="12" fill="hsl(142 35% 42%)" />
  </svg>
);

const Flower = ({ color, delay }: { color: number; delay: string }) => {
  const colors = ['hsl(350 70% 60%)', 'hsl(45 90% 60%)', 'hsl(280 60% 65%)'];
  return (
    <svg 
      className="w-4 h-6 animate-fade-in animate-sway"
      style={{ animationDelay: delay }}
      viewBox="0 0 20 30"
    >
      <line x1="10" y1="15" x2="10" y2="30" stroke="hsl(142 40% 35%)" strokeWidth="2" />
      <circle cx="10" cy="10" r="5" fill={colors[color]} />
      <circle cx="10" cy="10" r="2" fill="hsl(45 90% 60%)" />
    </svg>
  );
};

const Bird = ({ className, delay }: { className: string; delay: string }) => (
  <svg 
    className={`w-6 h-4 animate-float ${className}`}
    style={{ animationDelay: delay }}
    viewBox="0 0 30 20"
  >
    <path d="M5 10 Q10 5 15 10 Q20 5 25 10" stroke="hsl(30 25% 25%)" fill="none" strokeWidth="2" />
  </svg>
);

const Rabbit = ({ className }: { className: string }) => (
  <svg 
    className={`w-8 h-8 animate-fade-in ${className}`}
    viewBox="0 0 40 40"
  >
    <ellipse cx="20" cy="28" rx="10" ry="8" fill="hsl(30 20% 75%)" />
    <ellipse cx="20" cy="18" rx="8" ry="7" fill="hsl(30 20% 75%)" />
    <ellipse cx="15" cy="8" rx="3" ry="8" fill="hsl(30 25% 80%)" />
    <ellipse cx="25" cy="8" rx="3" ry="8" fill="hsl(30 25% 80%)" />
    <circle cx="17" cy="17" r="1.5" fill="hsl(30 30% 20%)" />
    <circle cx="23" cy="17" r="1.5" fill="hsl(30 30% 20%)" />
  </svg>
);

const Deer = ({ className }: { className: string }) => (
  <svg 
    className={`w-16 h-20 animate-fade-in ${className}`}
    viewBox="0 0 60 80"
  >
    {/* Body */}
    <ellipse cx="30" cy="50" rx="18" ry="12" fill="hsl(30 35% 50%)" />
    {/* Legs */}
    <rect x="18" y="55" width="4" height="20" fill="hsl(30 35% 45%)" rx="2" />
    <rect x="38" y="55" width="4" height="20" fill="hsl(30 35% 45%)" rx="2" />
    {/* Head */}
    <ellipse cx="30" cy="32" rx="8" ry="10" fill="hsl(30 35% 50%)" />
    {/* Ears */}
    <ellipse cx="22" cy="24" rx="3" ry="5" fill="hsl(30 30% 55%)" />
    <ellipse cx="38" cy="24" rx="3" ry="5" fill="hsl(30 30% 55%)" />
    {/* Antlers */}
    <path d="M24 20 L20 10 M22 14 L18 12" stroke="hsl(30 25% 35%)" strokeWidth="2" fill="none" />
    <path d="M36 20 L40 10 M38 14 L42 12" stroke="hsl(30 25% 35%)" strokeWidth="2" fill="none" />
    {/* Eyes */}
    <circle cx="27" cy="30" r="1.5" fill="hsl(30 30% 15%)" />
    <circle cx="33" cy="30" r="1.5" fill="hsl(30 30% 15%)" />
  </svg>
);

export default ForestScene;
