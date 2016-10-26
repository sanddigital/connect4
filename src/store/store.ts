export enum Token {
    Empty,
    Red,
    Yellow
}

export interface GameHistory{
    gameBoard: Token[][];
    id: number;
    turn: Token;
}

export interface Store {
    gameBoard: Token[][];
    turn: Token;
    turnNumber: number;
    winner?: Token;
    history: GameHistory[],
    timeLeft: number,
    lastMoveTime: number
}
