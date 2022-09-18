import React from 'react';
import {TailSpin} from 'react-loader-spinner';

export const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <TailSpin
            height="550"
            width="80"
            color="#00BFFF"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
        />
    </div>
  )
}
