import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  MouseEvent,
  MutableRefObject, RefForwardingComponent,
} from 'react';
import ReactDOM from 'react-dom';

import useTooltip from 'hooks/useTooltip';
import useCheckOutClick from 'hooks/useCheckClickOutside';
import { DEFAULT_TOOLTIP_INDENT } from 'constants/general';
import { ITooltipPosition } from 'components/ColorPicker';

import styles from './Tooltip.module.scss';


interface IProps {
  ref: React.Ref<HTMLElement>;
  content: React.ReactElement;
  children: React.ReactElement;
  getPositionStyles: () => ITooltipPosition;
  onOutClick?: () => void;
}

interface ForwardCallBack {
  toggleTooltip: () => boolean;
}

export const Tooltip: RefForwardingComponent<ForwardCallBack, IProps> = forwardRef((props, ref: React.Ref<HTMLElement>) => {
  const { content, children, getPositionStyles, onOutClick } = props;
  const { tooltipContainer, arrowPointer } = styles;
  const { isTooltipOpen, toggleTooltip } = useTooltip();
  const selectedElementRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const handleTooltipOutClick = (event: MouseEvent) => {
    event.stopPropagation();
    toggleTooltip();

    if (onOutClick) {
      onOutClick();
    }
  };
  const getArrowPositionStyles = (
    selectedElementRef: MutableRefObject<HTMLElement | null>
  ) => {
    const {
      top,
      left,
      height
    } = selectedElementRef.current!.getBoundingClientRect();

    return {
      top: top + height + DEFAULT_TOOLTIP_INDENT,
      left: left + DEFAULT_TOOLTIP_INDENT
    };
  };

  const TooltipContent = () => {
    useCheckOutClick(
      tooltipRef,
      selectedElementRef,
      isTooltipOpen,
      handleTooltipOutClick
    );

    if (!isTooltipOpen) return null;

    const positionStyles = getPositionStyles() || {};

    return ReactDOM.createPortal(
      <>
        <div
          className={tooltipContainer}
          ref={tooltipRef}
          style={{ ...positionStyles }}
        >
          {React.cloneElement(content)}
        </div>
        <div
          className={arrowPointer}
          style={{ ...getArrowPositionStyles(selectedElementRef) }}
        />
      </>,
      document.getElementById('root') as HTMLElement
    );
  };

  // @ts-ignores
  useImperativeHandle(ref, () => ({
    toggleTooltip() {
      toggleTooltip();
    }
  }));

  return (
    <>
      { React.cloneElement(children, { onClick: toggleTooltip, ref: selectedElementRef }) }

      { TooltipContent() }
    </>
  );
});

export default Tooltip;
