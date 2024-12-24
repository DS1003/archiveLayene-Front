import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = ({ children }) => {
  return (
    <TooltipPrimitive.Provider>
      {children}
    </TooltipPrimitive.Provider>
  );
};

const Tooltip = ({ children }) => {
  return (
    <TooltipPrimitive.Root>
      {children}
    </TooltipPrimitive.Root>
  );
};

const TooltipTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref} {...props}>
    {children}
  </TooltipPrimitive.Trigger>
));
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      className={`
        z-50 overflow-hidden rounded-md 
        bg-gray-900 px-3 py-1.5 text-xs 
        text-white shadow-md animate-in 
        fade-in-0 zoom-in-95 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=closed]:zoom-out-95 
        data-[side=bottom]:slide-in-from-top-2 
        data-[side=left]:slide-in-from-right-2 
        data-[side=right]:slide-in-from-left-2 
        data-[side=top]:slide-in-from-bottom-2
        ${className || ''}
      `}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-gray-900" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = 'TooltipContent';

export { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
};