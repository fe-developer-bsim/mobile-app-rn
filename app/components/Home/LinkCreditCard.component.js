import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground} from 'react-native';
import {language} from '../../config/language';
import styles from './LinkCreditCard.styles';
import linkCc from '../../assets/images/link-cc.png';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';

class LinkCreditCard extends React.Component {
  static propTypes = {
    onPress: PropTypes.func
  }

  render () {
    const {onPress = noop} = this.props;
    return (
      <View>
        <Touchable onPress={onPress} style={styles.imageContainer}>
          <ImageBackground source={linkCc} style={styles.backgroundImage}>
            <View style={styles.detail}>
              <View style={styles.iconContainer}/>
              <View style={styles.textContainer}>
                <Text style={styles.linkText}>{language.CREDITCARD__LINK}</Text>
              </View>
              <View style={styles.iconContainer}>
                <SimasIcon name='emoney-topup' style={styles.iconStyle} size={20}/>
              </View>
            </View>
          </ImageBackground>
        </Touchable>
      </View>
    );
  }
}

export default LinkCreditCard;
