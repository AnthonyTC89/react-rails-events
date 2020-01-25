import { fadeIn } from 'react-animations';
import Radium from 'radium';

const animations = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
};

export default animations;
