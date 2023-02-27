import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, isEmpty} from 'lodash';
import styles from './LayeredIcon.styles';

class LayeredIcon extends React.Component {
  static propTypes = {
    layers: PropTypes.array,
  }

  renderIcon = (icon) => {
    const iconName = result(icon, 'iconName', '');
    const iconSize = result(icon, 'iconSize', 20);
    const iconStyle = result(icon, 'iconStyle', {});
    return (
      <View style={styles.absolute} key={iconName}>
        <SimasIcon size={iconSize} name={iconName} style={iconStyle}/>
      </View>
    );
  }

  render () {
    const {layers} = this.props;
    return (
      <View style={styles.iconContainer}>
        {isEmpty(layers) ? null :
          layers.map(this.renderIcon)}
      </View>

    );
  }
}

export default LayeredIcon;
