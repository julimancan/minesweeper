[![minesweeper build status](https://img.shields.io/circleci/build/github/letsandeepio/minesweeper)](https://github.com/letsandeepio/minesweeper) [![code coverage](https://badgen.net/badge/coverage/95%25/green)](https://github.com/letsandeepio/minesweeper)

# Minesweeper

Popular minesweeper game written in Pure React.

## Demo

The app is built using Continuous Integration Provided by Circle CI & is continously deployed on Netlify at:

## Feature Details

- Dynamically generate 16x16 board of tiles. Fully extensible in future to allow for Easy, Medium & Hard difficulties.
- Randomly hide 40 bombs behind the tiles. Again, fully customizable in future to support different game plays.
- Allows the user to flag a tile containing the bomb and remove it. User is able to track the number of flags remaining.
- Show number of ajacent tiles containing bomb for the revealed tiles.
- Reveal all empty tiles nearby if the user clicks an empty tile.
- Allow user to restart the game if they ever step on a bomb.
- Built in timer that starts & stops with the game play. Can be used as basis for calculation of High Scores in the future.

## Technical Details

Single-page App written using React. Uses React Context-API & a custom useReducer hook for managing the state ala Redux style. Extensive test coverage using Unit & Integration testing on top of Jest & react testing library (currently at 95%). Implements Flood Fill algorithm for recursively revealing of empty tiles if user ever clicks one. Uses NES.css framework for giving retro look to the game.

## Screenshot
