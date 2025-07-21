import { MdSort } from "react-icons/md"; 
import { AiFillFilter } from "react-icons/ai"; 
import React from 'react';
import style from './Products.module.css';
import potatoImg from '../../assets/logo.jpg'; // Replace with real images

const products = Array(12).fill({
  country: "Kenya",
  name: "Name of fruit",
  desc: "Something about pr...",
  price: "Dhs. 20",
  image: potatoImg,
});

export const Products = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <span className={style.filter}><AiFillFilter /> Filter</span>
        <h2 className={style.title}>Our Products</h2>
        <span className={style.sort}><MdSort /> Sort</span>
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
>>>>>>>>> Temporary merge branch 2
