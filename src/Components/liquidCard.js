import { useState } from 'react';

import addButton from './pngs/plus.png'
import minusButton from './pngs/minus.png'
const LiquidCard = ({icon, volume}) => {
    const [count, setCount] = useState(0);

    const addToBar = ({volume}) => {
        console.log(volume);
        setCount(count+1);
        return volume;
    };
    
    const subtractFromBar = ({volume}) => {
        console.log(volume);
        setCount(Math.max(count-1, 0));
        return volume;
    };

    return (
        <div className = "d-inline-flex flex-column align-items-center">
            <img src={icon} style={{height: "100px"}}></img>
            <h5 style={{marginTop: "4px"}}>{volume} mL</h5>
            <div className = "d-flex justify-content-around column g-5">
                <input type="image" src={minusButton} style={{height: "30px"}}  onClick={() => subtractFromBar({volume})} />
                <div style={{width: "35px", display: "flex", justifyContent: "center"}}>
                    <h5>{count}</h5>
                </div>
                <input type="image" src={addButton} style={{height: "30px"}}  onClick={() => addToBar({volume})} />
            </div>
        </div>
    )
};

export default LiquidCard;