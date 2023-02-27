import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileHeader.styles';
import {View, ImageBackground, Text} from 'react-native';
import Touchable from '../Touchable.component';
import {luckyDipGetHistory} from '../../state/thunks/luckyDip.thunks.js';
import result from 'lodash/result';
import CloseBox from '../../assets/images/closeBox.png';

class LuckyDipHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    goToMyVoucher: PropTypes.func,
    egiftCart: PropTypes.array,
    simasPoin: PropTypes.object,
    navigation: PropTypes.object,
    openInbox: PropTypes.func,
    inboxCounter: PropTypes.array,
    generateCodeOnboard: PropTypes.object,
    config: PropTypes.object,
  }

  goToLuckyDipHistory = () => {
    const {dispatch, navigation} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    dispatch(luckyDipGetHistory(pathRoute));
  }

  render () {

    return (
      <View style={styles.container}>
        <Touchable onPress={this.goToLuckyDipHistory} style={styles.iconInbox}>
          <ImageBackground source={CloseBox} style={styles.burgerLuckyDip}>
            <View style={styles.tagLuckyDipHeader}>
              <Text style={styles.LuckydipPrizeText}>My Prize</Text>
            </View>
          </ImageBackground>
        </Touchable>
        <View style={styles.additionalPadding}/>
      </View>
    );
  }
}

export default LuckyDipHeader;
