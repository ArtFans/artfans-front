import React from 'react';
import cx from 'classnames';
import Lottie from 'react-lottie';

import animationData from 'src/assets/animations/Comp_0.json';
import animationData2 from 'src/assets/animations/Comp_1.json';
import animationData3 from 'src/assets/animations/Comp_2.json';
import animationData4 from 'src/assets/animations/Comp_3.json';

import './styles.scss';

const animationTypes: any = {
  1: animationData,
  2: animationData2,
  3: animationData3,
  4: animationData4
}

export const Loader = ({ isBig = true, type = 1 }: any) => {
  const loaderClass = cx('loader', { 'loader--big': isBig });

  return (
    <div className={loaderClass}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationTypes[type]
        }}
      />
    </div>
  );
};
