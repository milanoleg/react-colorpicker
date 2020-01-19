import { useState } from 'react';

export const useTooltip = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return {
    isTooltipOpen,
    toggleTooltip
  };
};

export default useTooltip;
