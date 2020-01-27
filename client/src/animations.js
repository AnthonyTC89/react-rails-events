import { fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight } from 'react-animations';
import Radium from 'radium';

const animations = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
  fadeInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInRight, 'fadeInRight'),
  },
  fadeInLeft: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft'),
  },
  fadeInDown: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInDown, 'fadeInDown'),
  },
  fadeInUp: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
  },
};

export default animations;
