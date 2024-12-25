import React from 'react';

const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
      <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Cercles concentriques avec rotations opposées */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#0D9488" 
          strokeWidth="2"
          opacity="0.1"
        />
        
        {/* Premier cercle rotatif */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#0D9488" 
          strokeWidth="4" 
          strokeDasharray="280" 
          strokeDashoffset="280"
          transform="rotate(0 50 50)"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="3s"
            values="280;0"
            repeatCount="indefinite"
            calcMode="ease-in-out"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="3s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </circle>

        {/* Deuxième cercle rotatif */}
        <circle 
          cx="50" 
          cy="50" 
          r="38" 
          fill="none" 
          stroke="#0F766E" 
          strokeWidth="4" 
          strokeDasharray="240" 
          strokeDashoffset="240"
          transform="rotate(0 50 50)"
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="240;0"
            repeatCount="indefinite"
            calcMode="ease-in-out"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 50 50"
            to="0 50 50"
            dur="2s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </circle>

        {/* Cercle central pulsant */}
        <circle 
          cx="50" 
          cy="50" 
          r="31" 
          fill="none" 
          stroke="#134E4A" 
          strokeWidth="4"
          opacity="0.8"
        >
          <animate
            attributeName="r"
            dur="1.5s"
            values="31;33;31"
            repeatCount="indefinite"
            calcMode="ease-in-out"
          />
          <animate
            attributeName="stroke-width"
            dur="1.5s"
            values="4;6;4"
            repeatCount="indefinite"
            calcMode="ease-in-out"
          />
        </circle>

        {/* Points décoratifs orbitants */}
        {[0, 90, 180, 270].map((angle, index) => (
          <circle
            key={index}
            cx={50 + 45 * Math.cos((angle * Math.PI) / 180)}
            cy={50 + 45 * Math.sin((angle * Math.PI) / 180)}
            r="3"
            fill="#0D9488"
          >
            <animate
              attributeName="r"
              dur="1.5s"
              values="3;4;3"
              repeatCount="indefinite"
              calcMode="ease-in-out"
              begin={`${index * 0.4}s`}
            />
            <animate
              attributeName="fill-opacity"
              dur="1.5s"
              values="1;0.5;1"
              repeatCount="indefinite"
              calcMode="ease-in-out"
              begin={`${index * 0.4}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default Loader;