import { useState } from 'react';
import addButton from './pngs/plus.png'
import minusButton from './pngs/minus.png'


const addToBar = ({product}) => {
    console.log(product.volume);
    /*
    setCount(count+1);
    return volume;
    */
};

const subtractFromBar = ({product}) => {
    console.log(product.volume);
    /*
    setCount(Math.max(count-1, 0));
    return volume;
    */
};


const LiquidCard = ({product}) => {

    return (
        <div className = "d-inline-flex flex-column align-items-center">
            <h5 style={{marginTop: "4px"}}>{product.name}</h5>
            <img src={product.icon} style={{height: "100px"}} alt="new"></img>
            <h5 style={{marginTop: "4px"}}>Volume: {product.volume} mL</h5>
            <h5 style={{marginTop: "4px"}}>Quantity: {product.quantity}</h5>
            <h5 style={{marginTop: "4px"}}>Category: {product.category}</h5>
            <div className = "d-flex justify-content-around column g-5">
                <input type="image" src={minusButton} style={{height: "30px"}}  onClick={() => subtractFromBar({product})} />
                <div style={{width: "35px", display: "flex", justifyContent: "center"}}>
                    <h5>{product.quantity}</h5>
                </div>
                <input type="image" src={addButton} style={{height: "30px"}}  onClick={() => addToBar({product})} />
            </div>
        </div>
    )
};

export default LiquidCard;