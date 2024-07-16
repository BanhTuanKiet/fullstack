import React from 'react';
import Header from '../component/header/Header';
import Sidebar from '../component/sidebar/Sidebar';
import Product from '../component/product/Product';

function Home() {
  return (
    <div className="main-container">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className='mainbar'>
        <Header />
        <Product />
      </div>
    </div>
  );
}

export default Home;
