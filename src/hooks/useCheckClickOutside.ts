import { useEffect, RefObject } from 'react';

export const useCheckOutClick = (
  tooltipRef: RefObject<HTMLDivElement>,
  selectedElementRef: RefObject<HTMLElement>,
  isTooltipOpen: boolean,
  outsideClickHandler: any
) => {
  const getIsClickOutside = (event: any) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target) &&
      selectedElementRef.current &&
      !selectedElementRef.current.contains(event.target)
    ) {
      outsideClickHandler(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', getIsClickOutside);
    return () => {
      document.removeEventListener('mousedown', getIsClickOutside);
    };
  }, [isTooltipOpen]);
};

export default useCheckOutClick;
