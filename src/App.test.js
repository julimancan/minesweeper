import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  getByText,
  fireEvent,
  queryByText,
  getAllByTestId
} from '@testing-library/react';
import App from './App';

import { StateProvider } from './context/StateProvider';
import reducer, { initialState } from './context/reducer';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

describe('Game', () => {
  it('renders the App component without crashing', async () => {
    const { getByText } = render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    );
    const header = getByText(/start/i);
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

  it('set the status to game over if user steps on a bomb', async () => {
    let boardOptions = {
      rows: 2,
      cols: 2,
      length: 30,
      totalBombs: 1
    };
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, boardOptions }}
      >
        <App />
      </StateProvider>
    );
    await waitForElement(() => getByText(container, /start/i));
    fireEvent.click(getByText(container, /start/i));
    fireEvent.click(getAllByTestId(container, 'bomb')[0]);
    expect(queryByText(container, /game is over!/i)).toBeInTheDocument();
  });

  it('set the status to game won if user flag all mines', async () => {
    let boardOptions = {
      rows: 2,
      cols: 2,
      length: 30,
      totalBombs: 1
    };
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, boardOptions }}
      >
        <App />
      </StateProvider>
    );
    await waitForElement(() => getByText(container, /start/i));
    fireEvent.click(getByText(container, /start/i));
    fireEvent.contextMenu(getAllByTestId(container, 'bomb')[0]);
    expect(queryByText(container, /you won!/i)).toBeInTheDocument();
  });

  it('successfully restart game once it is over', async () => {
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, isGameOver: true }}
      >
        <App />
      </StateProvider>
    );
    await waitForElement(() => getByText(container, /restart/i));
    act(() => {
      fireEvent.click(getByText(container, /restart/i));
      return;
    });
    expect(queryByText(container, /game is over!/i)).not.toBeInTheDocument();
  });
});
