import React, { useEffect, useState } from 'react';
import Header from '../component/header/Header';
import Product from '../component/product/Product';
import Data from '../database/data'

function Home() {
  const [data, setData] = useState(Data)

  return (
    <div className="main-container">
      <Header data={data} setData={setData} />
      <Product data={data} />
    </div>
  );
}

export default Home;
