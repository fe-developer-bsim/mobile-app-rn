import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import Touchable from '../../components/Touchable.component';
import LayeredIcon from '../../components/LayeredIcon/LayeredIcon.component';
import styles from './ServiceBillpay.component.styles';
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
    toggleDisableBillerNKYC: PropTypes.string,
    dtActionName: PropTypes.string,
  };
  render () {
    const {onPress = noop, highlightColor = 'white', highlightOpacity = 0.5, text, toggleDisableBillerNKYC, iconName, disable = false, layers, dtActionName} = this.props;
    const enableStyles = (disable && toggleDisableBillerNKYC === 'YES') ? styles.disable : styles.enable;

    if (disable && toggleDisableBillerNKYC === 'YES') {
      return (
        <Touchable dtActionName={dtActionName} highlightColor={highlightColor} activeOpacity={highlightOpacity}>
          <View style={styles.itemContainer}>
            { iconName ?
              <View style={styles.icon}>
                <LayeredIcon layers={layers}/>
              </View>
              :
              <View style={styles.icon}>
                <Image source={layers} style={styles.pictureIcon}/>
              </View>
            }
            <View style={styles.textContainer}>
              <Text style={enableStyles}>{text}</Text>
            </View>
          </View>
        </Touchable>
      );
    } else {
      return (
        <Touchable dtActionName={dtActionName} onPress={onPress} highlightColor={highlightColor} activeOpacity={highlightOpacity}>
          <View style={styles.itemContainer}>
            { iconName ?
              <View style={styles.icon}>
                <LayeredIcon layers={layers}/>
              </View>
              :
              <View style={styles.icon}>
                <Image source={layers} style={styles.pictureIcon}/>
              </View>
            }
            <View style={styles.textContainer}>
              <Text style={enableStyles}>{text}</Text>
            </View>
          </View>
        </Touchable>
      );
    }
  }
}

export default ServiceNavItem;
