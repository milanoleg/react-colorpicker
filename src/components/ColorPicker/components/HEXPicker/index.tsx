import React from 'react';

import styles from './HEXPicker.module.scss';

interface IProps {
  colors: IColors[];
  onChange: (value: string) => void;
  afterPickColorHandler: () => void;
}

export const HEXPicker = ({
  colors,
  onChange,
  afterPickColorHandler
}: IProps) => {
  const {
    hexContainer,
    colorsList,
    colorListItem,
    colorLabel,
    colorPreview
  } = styles;
  const onSelectValue = (value: string) => {
    onChange(value);
    afterPickColorHandler();
  };

  return (
    <div className={hexContainer}>
      <ul className={colorsList}>
        {colors.map(({ key, value, label }: IColors) => {
          return (
            <li
              className={colorListItem}
              key={key}
              onClick={() => onSelectValue(value)}
            >
              <p className={colorLabel}>{label}</p>
              <div>
                <div
                  style={{ backgroundColor: value }}
                  className={colorPreview}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HEXPicker;
