import React, { useState } from 'react';
import LiquidCard from './LiquidCard';


const LiquidCardList = ({ products }) => {
  return (
    <>
    <div className="btn-toolbar justify-content-between">
        { 
          Object.values(products).length > 0 ? Object.values(products).map(product => <LiquidCard product = {product} ></LiquidCard>) :  <h1>Oops, it seems that you have no items. Click on the 'Add Item' button to start tracking your water intake!</h1>
        } 
      </div>
    </>
  );
};

export default LiquidCardList;