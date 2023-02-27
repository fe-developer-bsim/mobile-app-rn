import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './Card.styles';

class Card extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  render () {
    const {style, children, ...extraProps} = this.props;
    return (
      <View {...extraProps} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
}

export default Card;
