export enum Token {
    Empty,
    Red,
    Yellow
}

export interface GameHistory{
    gameBoard: Token[][];
    id: number
}

export interface Store {
    gameBoard: Token[][];
    turn: Token;
    turnNumber: number;
    winner?: Token;
    history: GameHistory[]
}
