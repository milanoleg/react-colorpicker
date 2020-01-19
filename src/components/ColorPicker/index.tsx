import React, { useRef, useState, RefObject } from 'react';

import HEXPicker from './components/HEXPicker';
import RGBPicker from './components/RGBPicker';
import Tooltip from 'components/Tooltip';

import styles from './ColorPicker.module.scss';

interface IProps {
  value: string;
  colors: IColors[];
  onChange: (color: string) => void;
}

export interface IPosition {
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
}

export type ITooltipPosition = IPosition | null;

const getTooltipPosition = (element: RefObject<HTMLDivElement>): ITooltipPosition => {
  if (!element) return null;

  const { top, right, height } = element.current!.getBoundingClientRect();

  return {
    top: top + height + 15,
    right: `calc(100% - ${right}px)`
  };
};

export const ColorPicker = (props: IProps) => {
  const { value, colors, onChange } = props;
  const {
    colorPickerWrapper,
    colorPickerContainer,
    colorPickerValue,
    colorPickerControls,
    rgbSelector,
    rgbColorPreview,
    hexSelector,
    rgbButton,
    hexButton
  } = styles;

  const [previewValue, setPreviewValue] = useState();
  const hexTooltipRef = useRef<HTMLElement>(null);
  const rgbTooltipRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderHEXPickerContent = () => (
    <HEXPicker
      colors={colors}
      onChange={onChange}
      // @ts-ignores
      afterPickColorHandler={() => hexTooltipRef.current.toggleTooltip()}
    />
  );
  const renderRGBPickerContent = () => (
    <RGBPicker
      value={value}
      onColorPreview={setPreviewValue}
      onChange={onChange}
      // @ts-ignores
      afterPickColorHandler={() => rgbTooltipRef.current.toggleTooltip()}
    />
  );

  return (
    <div className={colorPickerWrapper} ref={containerRef}>
      <div className={colorPickerContainer}>
        <div className={colorPickerValue}>{value}</div>
        <div className={colorPickerControls}>
          <div className={rgbSelector}>
            <Tooltip
              ref={rgbTooltipRef}
              content={renderRGBPickerContent()}
              getPositionStyles={() => getTooltipPosition(containerRef)}
              onOutClick={() => setPreviewValue(null)}
            >
              <button className={rgbButton}>
                <div
                  style={{ backgroundColor: previewValue || value }}
                  className={rgbColorPreview}
                />
              </button>
            </Tooltip>
          </div>
          <div className={hexSelector}>
            <Tooltip
              ref={hexTooltipRef}
              content={renderHEXPickerContent()}
              getPositionStyles={() => getTooltipPosition(containerRef)}
              onOutClick={() => setPreviewValue(null)}
            >
              <button className={hexButton} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
