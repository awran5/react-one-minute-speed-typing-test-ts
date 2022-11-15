import React, { memo } from "react";

interface Props {
  title: string;
  value: number | string;
  symbol?: string;
}

function Stats({ title, value, symbol }: Props) {
  return (
    <div className='col-md col-sm-6'>
      <div className='card text-center shadow-sm'>
        <div className='card-body'>
          <h5 className='text-uppercase text-muted fw-bold mb-2'>{title}</h5>
          <h2 className='mb-0'>
            <span className='state-value'>
              {value}
              {symbol && symbol}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default memo(Stats);
