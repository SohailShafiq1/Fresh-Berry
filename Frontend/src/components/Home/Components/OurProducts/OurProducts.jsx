import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './OurProducts.module.css';

const imageModules = import.meta.glob('../../../../Products/*.{png,jpg,jpeg}', { eager: true });
const productImageFiles = Object.keys(imageModules);

// Take only first 4-5 products for one row display
const products = productImageFiles.slice(0, 5).map((file) => {
  const fileName = file.split('/').pop();
  return {
    country: "Kenya",
    name: fileName.replace(/\.[^/.]+$/, ""),
    desc: "Fresh and premium quality.",
    price: "Dhs. 20",
    image: imageModules[file].default || imageModules[file],
  };
});

const OurProducts = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div></div>
        <h2 className={style.title}>Our Products</h2>
        <NavLink to="/products" className={style.seeAll}>
          See all
        </NavLink>
      </div>
      <div className={style.grid}>
        {products.map((product, index) => (
          <div className={style.card} key={index}>
            <span className={style.country}>{product.country}</span>
            <div className={style.imageWrapper}>
              <img src={product.image} alt="product" className={style.image} />
            </div>
            <h4 className={style.name}>{product.name}</h4>
            <p className={style.desc}>{product.desc}</p>
            <p className={style.price}>{product.price}</p>
            <a
              href="https://wa.me/"
              className={style.orderBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/color/24/000000/whatsapp--v1.png"
                alt="whatsapp"
              />
              Order Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );

};

export default OurProducts;
