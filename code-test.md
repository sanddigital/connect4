# Code test

To test your skills, please fork this project and implement the following features:

## Game over positions

Currently, the only game over position is a complete vertical line of four.

The game should end with:

* Horizontal line of four
* Diagonal line of four (any direction)
* No more moves (a draw)

Running `npm test` will show those three tests failing.  It's expected that those
tests will pass.

## Routing

Players may want to bookmark an in-progress game and come back to it later.
Furthermore, players might want to "undo" or "redo" a move by hitting "back"
and "forward" on their browser respectively.

The URL should contain the state of the game and update history.

## Timer

Nothing is more annoying than a player taking too long to make a move!  Implement
a 10 second timer that forfeits the player's turn if they take too long.

Of course, the players will want to see the timer ticking down as they play.

It's expected that you'll build a test of the saga to ensure that this works
consistently.
