import * as React from "react";

import GameBoard from "components/GameBoard";
import GameOver from "components/GameOver";
import CountdownTimer from "components/CountdownTimer";

export default () => <div>       
    <GameBoard />
    <CountdownTimer />
    <GameOver />    
</div>;
