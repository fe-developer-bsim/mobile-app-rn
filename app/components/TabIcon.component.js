import React from 'react';
import PropTypes from 'prop-types';
import SimasIcon from '../assets/fonts/SimasIcon';

const TabIcon = ({
  name,
}) => (
  <SimasIcon name={name} style={{color: '#333333'}}/>
);
TabIcon.propTypes = {
  name: PropTypes.string
};
export default TabIcon;
