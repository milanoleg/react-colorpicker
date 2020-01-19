import React, { useState, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';

import { RGB_PICKER } from 'constants/general';
import {
  convertHEXtoRGBColor,
  convertRGBtoHEXColor
} from 'utils/colorsConverter';

import styles from './RGBPicker.module.scss';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  onColorPreview: Dispatch<SetStateAction<string | null>>;
  afterPickColorHandler: () => void;
}

export const RGBPicker = ({
  value,
  onChange,
  onColorPreview,
  afterPickColorHandler
}: IProps) => {
  const { MIN_VALUE, MAX_VALUE, RED_COLOR, GREEN_COLOR, BLUE_COLOR } = RGB_PICKER;
  const {
    rgbContainer,
    rgbSliders,
    popupControls,
    sliderControlContainer,
    controlTitle,
    rgbControl,
    rgbControlCancel,
    rgbControlSubmit,
    redControl,
    greenControl,
    blueControl
  } = styles;
  const rgbColorsConfig: IRGBColorsConfig = convertHEXtoRGBColor(value);
  const [rgbColors, setColorsConfig] = useState(rgbColorsConfig);
  const [initialValue] = useState(value);

  const handleColorChange = (colorKey: string, e: any) => {
    setColorsConfig({ ...rgbColors, [colorKey]: +e.target.value });
    onColorPreview(convertRGBtoHEXColor(rgbColors));
  };

  const handleCancel = () => {
    onChange(initialValue);
    onColorPreview(null);
    afterPickColorHandler();
  };

  const handleSubmit = () => {
    onChange(convertRGBtoHEXColor(rgbColors));
    onColorPreview(null);
    afterPickColorHandler();
  };

  const handleColorInput = (colorKey: string) => handleColorChange.bind(null, colorKey);

  return (
    <div className={rgbContainer}>
      <div className={rgbSliders}>
        <div className={sliderControlContainer}>
          <span className={controlTitle}>R</span>
          <input
            type="range"
            min={MIN_VALUE}
            max={MAX_VALUE}
            value={rgbColors.red}
            className={redControl}
            onChange={handleColorInput(RED_COLOR)}
          />
        </div>
        <div className={sliderControlContainer}>
          <span className={controlTitle}>G</span>
          <input
            type="range"
            min={MIN_VALUE}
            max={MAX_VALUE}
            value={rgbColors.green}
            className={greenControl}
            onChange={handleColorInput(GREEN_COLOR)}
          />
        </div>
        <div className={sliderControlContainer}>
          <span className={controlTitle}>B</span>
          <input
            type="range"
            min={MIN_VALUE}
            max={MAX_VALUE}
            value={rgbColors.blue}
            className={blueControl}
            onChange={handleColorInput(BLUE_COLOR)}
          />
        </div>
      </div>
      <div className={popupControls}>
        <button
          className={classNames(rgbControl, rgbControlCancel)}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className={classNames(rgbControl, rgbControlSubmit)}
          onClick={handleSubmit}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default RGBPicker;
