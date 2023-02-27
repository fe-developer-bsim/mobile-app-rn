import {getViewWidth, viewportWidth} from '../../utils/device.util';

const slideWidth = getViewWidth(0.85);
const sliderWidth = viewportWidth;
const itemHorizontalMargin = getViewWidth(0.01);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default {
  containerCustomStyle: {
    marginHorizontal: -20,
    paddingVertical: 10,
  },
  sliderWidth,
  itemWidth,
  slideStyle: {
    width: itemWidth,
    paddingHorizontal: 5
  }
};
