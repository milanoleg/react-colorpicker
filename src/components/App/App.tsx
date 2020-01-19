import React, { useState } from 'react';

import ColorPicker from 'components/ColorPicker';
import { colorsMock as colors } from 'mocks/colorsMock';
import { DEFAULT_COLOR } from 'constants/general';

import './App.module.scss';

const App: React.FC = (): React.ReactElement => {
  const [colorValue, setColor] = useState(DEFAULT_COLOR);

  return <ColorPicker value={colorValue} colors={colors} onChange={setColor} />;
};

export default App;
