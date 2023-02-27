import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Touchable from '../../components/Touchable.component';
// import SimasIcon from '../../assets/fonts/SimasIcon';
import LayeredIcon from '../../components/LayeredIcon/LayeredIcon.component';
import styles from './ServiceNavItem.component.styles';
import noop from 'lodash/noop';

class ServiceNavItem extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    highlightColor: PropTypes.string,
    highlightOpacity: PropTypes.number,
    text: PropTypes.string,
    iconName: PropTypes.string,
    disable: PropTypes.bool,
    iconSize: PropTypes.number,
    layers: PropTypes.array,
  };
  render () {
    const {onPress = noop, highlightColor = 'white', highlightOpacity = 0.5, text, iconName, disable = false, layers} = this.props;
    const enableStyles = disable ? styles.disable : styles.enable;
    return (
      <Touchable onPress={onPress} highlightColor={highlightColor} activeOpacity={highlightOpacity}>
        {iconName ?
          <View style={styles.itemContainer}>
            <View style={styles.icon}>
              <LayeredIcon layers={layers}/>
            </View>
            <View style={styles.textContainer}>
              <Text style={enableStyles}>{text}</Text>
            </View>
          </View>
          :
          <View style={styles.itemContainer}/>
        }
      </Touchable>
    );
  }
}

export default ServiceNavItem;
