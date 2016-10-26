import * as React from "react";
import { Dispatch, connect } from "react-redux";
import { Store, Token } from "store/store";

interface CountdownTimerProps {
    timeLeft: number;    
}

const CountdownTimer = (props: CountdownTimerProps) => {
    return <div style={containerStyle}>        
        <p style={timeLeftStyle}>{props.timeLeft}</p>                
    </div>;
};

const mapStateToProps = a => a.tokenReducer;
export default connect(mapStateToProps)(CountdownTimer);

const containerStyle = {
    textAlign : 'center'
}

const timeLeftStyle = {
    textAlign : 'center',
    fontSize: '3em'
}