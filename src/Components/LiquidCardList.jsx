import React, { useState } from 'react';
import {liquidCard} from './LiquidCard';


const LiquidCardList = ({ products }) => {
  return (
    <>
      <div className="btn-toolbar justify-content-between">
        <div className="btn-group">
        </div>
        { 
            Object.values(products).map(product => <liquidCard product = {product} ></liquidCard>)
        } 
      </div>
    </>
  );
};

export default LiquidCardList;