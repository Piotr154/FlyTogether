import { Slider } from '@mantine/core';

export const PriceRangeSlider = ({ value, setFunction }) => {
    
    const minValue = 10;
    const maxValue = 2000;
    const splitPoint = 300;

    const scaleValue = (percentage) => {
        let price;
        let step;
        if (percentage <= 50) {
            price = (percentage / 50) * splitPoint;
            step = 5;
        } else {
            const t = (percentage - 50) / 50; 
            price = splitPoint + (maxValue - splitPoint) * t;
            step = 20;
        }
        if (price < minValue) price = minValue;
        return Math.round(price / step) * step;
    };

    const unwrapValue = (price) => {
        if (price <= 0) return 0;
        if (price >= maxValue) return 100;
        if (price <= splitPoint) {
            return (price / splitPoint) * 50;
        }
        return 50 + ((price - splitPoint) / (maxValue - splitPoint)) * 50;
    };

    return (
        <div>
            <Slider
                step={0.1} 
                min={0}
                max={100}
                value={unwrapValue(value)}
                onChange={(val) => setFunction(scaleValue(val))}
                label={(val) => {
                    const price = scaleValue(val);
                    return price >= maxValue ? 'Unlimited' : `${price} $`;
                }}
                labelAlwaysOn={true}
                marks={[]}  
                styles={{
                    label: {
                        transform: 'translateZ(0)', 
                        willChange: 'left, transform',
                        top: 'auto',
                        bottom: "-38px",
                        backfaceVisibility: 'hidden',
                        color: 'var(--app-text-secondary)',
                        backgroundColor: 'var(--app-input-bg)',
                        outline: '0.5px solid var(--app-border-color)',
                        transition: 'background-color 0.3s ease-in-out, outline-color 0.3s ease-in-out',
                        pointerEvents: 'auto', 
                        cursor: 'grab',
                        userSelect: 'none',
                    },
                    bar: { background: "rgb(0, 160, 255)" },
                    thumb: { 
                        transition: 'border-color 0.3s ease-in-out',
                        border: "1px solid var(--app-border-color)",
                        backgroundColor: '#fff' ,
                        cursor: 'grab'
                    }
                }}
            />
        </div>
    );
}