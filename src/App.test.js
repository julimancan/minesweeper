import React from 'react';

import { screen } from '@testing-library/dom';

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
  queryByText
} from '@testing-library/react';
import App from './App';

import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';

afterEach(cleanup);

describe('Game', () => {
  it('renders the App component without crashing', async () => {
    const { getByText } = render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    );
    const header = getByText(/ready for challenge!/i);
    expect(header).toBeInTheDocument();
  });

  it('welcome message is displayed', async () => {
    const { container } = render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    );
    expect(queryByText(container, /ready for challenge!/i)).toBeInTheDocument();
  });

  it('successfully starts a new game', async () => {
    const { container } = render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    );
    await waitForElement(() => getByText(container, /start/i));
    fireEvent.click(getByText(container, /start/i));
    expect(
      queryByText(container, /ready for challenge!/i)
    ).not.toBeInTheDocument();
  });

  it('successfully reveal a tile on the board', async () => {
    const { container, debug } = render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    );
  });
});
