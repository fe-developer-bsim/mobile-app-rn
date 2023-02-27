import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';
import {theme} from '../../styles/core.styles';
import ScrollableViewOverlay from '../ScrollableViewOverlay/ScrollableViewOverlay.component';

class OverlaySpinner extends React.Component {
  render () {
    const {showSpinner} = this.props;
    return (
      <ScrollableViewOverlay visible={showSpinner}>
        <ActivityIndicator
          color={theme.white}
          size={theme.spinnerSizeLarge}/>
      </ScrollableViewOverlay>
    );
  }
}

OverlaySpinner.propTypes = {
  showSpinner: PropTypes.bool
};


export default OverlaySpinner;
