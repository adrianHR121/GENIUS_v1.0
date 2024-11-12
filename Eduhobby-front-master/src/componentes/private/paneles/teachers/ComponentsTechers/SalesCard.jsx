import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';

const SalesCard = ({ title, value, maxValue, colorVar }) => {
  const [percentage, setPercentage] = useState(0);
  const currentValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const finalPercentage = (currentValue / maxValue) * 100;

  useEffect(() => {
    setPercentage(finalPercentage);
  }, [finalPercentage]);

  return (
    <div style={{ backgroundColor: colorVar }} className="p-4 h-36 rounded-lg shadow-lg flex shadow-black ">
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl">
          <CountUp end={currentValue} duration={2.5} />
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar 
            value={percentage} 
            text={`${Math.round(percentage)}%`} 
            styles={buildStyles({
              pathColor: `rgba(255, 255, 255, 0.85)`,
              textColor: '#fff',
              trailColor: 'rgba(255, 255, 255, 0.2)',
            })}
            strokeWidth={10}
            pathTransitionDuration={2.5} // Duración de la transición
          />
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
