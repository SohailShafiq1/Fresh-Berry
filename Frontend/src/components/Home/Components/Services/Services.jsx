import React from 'react';
import style from './Services.module.css';
const s = style;

import orchardImg from '../../../../Products/Orchard.png';
import businessImg from '../../../../Products/Business.png';
import logisticsImg from '../../../../Products/Logistics.png';

export const Services = () => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.heading}>Our Services</h2>
      <div className={s.contentRow}>
        <div className={s.left}>
          <p className={s.intro}>
            From orchard to outlet, Fresh Berry fuels Dubai’s freshest kitchens. Whether you run a five-star hotel, a cozy café, or a fast-moving grocery, we’re your behind-the-scenes produce powerhouse. Custom-picked, swiftly packed and delivered.
          </p>
          <p className={s.intro}>
            We handle everything from sourcing and quality checks to packaging and chilled transport, so you can focus on creating unforgettable dining experiences.
          </p>
        </div>
        <div className={s.right}>
          <div className={s.serviceCard}>
            <img src={orchardImg} alt="Orchard to Outlet" className={s.serviceImg} />
            <div>
              <div className={s.serviceTitle}>Orchard to Outlet</div>
              <div className={s.serviceDesc}>From orchard to outlet, Fresh Berry fuels Dubai’s freshest kitchens.</div>
            </div>
          </div>
          <div className={s.serviceCard}>
            <img src={businessImg} alt="For Every Business" className={s.serviceImg} />
            <div>
              <div className={s.serviceTitle}>For Every Business</div>
              <div className={s.serviceDesc}>Whether you run a five-star hotel, a cozy café, or a fast-moving grocery…</div>
            </div>
          </div>
          <div className={s.serviceCard}>
            <img src={logisticsImg} alt="End-to-End Logistics" className={s.serviceImg} />
            <div>
              <div className={s.serviceTitle}>End-to-End Logistics</div>
              <div className={s.serviceDesc}>Custom-picked, quality-checked, expertly packed, and delivered fresh with chilled transport.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
