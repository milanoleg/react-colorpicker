export const convertHEXtoRGBColor = (hexColor: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16)
      }
    : { red: 0, green: 0, blue: 0 };
};

export const convertRGBtoHEXColor = ({
  red,
  green,
  blue
}: IRGBColorsConfig) => {
  return (
    '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
  );
};
