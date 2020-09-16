import React from 'react';
import {
  render,
  getAllByTestId,
  fireEvent,
  getByText,
  queryByText
} from '@testing-library/react';

import GameBoard from './GameBoard';
import { StateProvider } from '../context/StateProvider';
import reducer, { initialState } from '../context/reducer';
import { act } from 'react-dom/test-utils';

describe('GameBoard', () => {
  it('renders without crashing', () => {
    render(
      <StateProvider reducer={reducer} initialState={initialState}>
        <GameBoard />
      </StateProvider>
    );
  });

  it('succesfully reveal the clicked tile', () => {
    let boardOptions = {
      rows: 2,
      cols: 2,
      length: 30,
      totalBombs: 0
    };
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, boardOptions, isGameActive: true }}
      >
        <GameBoard />
      </StateProvider>
    );

    fireEvent.click(getAllByTestId(container, 'hidden')[0]);
    expect(getAllByTestId(container, 'revealed')[0]).toBeInTheDocument();
  });

  it('succesfully flag the right-clicked tile', () => {
    let boardOptions = {
      rows: 2,
      cols: 2,
      length: 30,
      totalBombs: 1
    };
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, boardOptions, isGameActive: true }}
      >
        <GameBoard />
      </StateProvider>
    );
    act(() => {
      fireEvent.contextMenu(getAllByTestId(container, 'hidden')[0]);
      return;
    });
    expect(getByText(container, '🚩')).toBeInTheDocument();
  });

  it('succesfully unflag the flagged tile', () => {
    let boardOptions = {
      rows: 2,
      cols: 2,
      length: 30,
      totalBombs: 1
    };
    const { container } = render(
      <StateProvider
        reducer={reducer}
        initialState={{ ...initialState, boardOptions, isGameActive: true }}
      >
        <GameBoard />
      </StateProvider>
    );
    fireEvent.contextMenu(getAllByTestId(container, 'hidden')[0]);
    expect(getByText(container, '🚩')).toBeInTheDocument();
    fireEvent.contextMenu(getByText(container, '🚩'));
    expect(queryByText(container, '🚩')).not.toBeInTheDocument();
  });
});
