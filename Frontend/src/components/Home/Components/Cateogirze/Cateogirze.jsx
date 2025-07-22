import React from 'react';
import style from './Cateogirze.module.css';

import Fruits from '../../../../Products/Strawberry.png'; // Replace with actual path to the image
import Vegetables from '../../../../Products/15.png';
import Egg from '../../../../Products/egg.png';
import Leaf from '../../../../Products/Leaf.png';
import Bag from '../../../../Products/bag.jpeg';

const s = style;

const categories = [
	{
		name: 'Fresh Fruits',
		image: Fruits,
		color: '#016327',
	},
	{
		name: 'Vegetables',
		image: Vegetables,
		color: '#FFA928',
	},
	{
		name: 'Egg & Poultry',
		image: Egg,
		color: '#D72323',
	},
	{
		name: 'Seasonal Picks',
		image: Leaf,
		color: '#A1D70A',
	},
	{
		name: 'Custom Orders',
		image: Bag,
		color: '#5C128B',
	},
];

export const Cateogirze = () => {
	return (
		<div className={s.wrapper}>
			<h2 className={s.heading}>Categories</h2>
			<div className={s.grid}>
				{categories.map((cat, idx) => (
					<div
						className={s.card}
						style={{ background: cat.color }}
						key={cat.name}
					>
						<div className={s.imageWrapper}>
							<img src={cat.image} alt={cat.name} className={s.image} />
						</div>
						<div className={s.label}>{cat.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Cateogirze;
