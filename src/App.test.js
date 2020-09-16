import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer';

test('App component renders', () => {
  const { getByText } = render(
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  );
  const header = getByText(/minesweeper/i);
  expect(header).toBeInTheDocument();
});
