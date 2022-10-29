import React, { useState } from 'react';
import LiquidCard from './LiquidCard';


const LiquidCardList = ({ products }) => {
  return (
    <>
    <div className="btn-toolbar justify-content-between">
        { 
            Object.values(products).map(product => <LiquidCard product = {product} ></LiquidCard>)
        } 
      </div>
    </>
  );
};

export default LiquidCardList;