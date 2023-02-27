import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftCart.styles';
import {goToCart} from '../../state/thunks/common.thunks';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {goToOfflineMain} from '../../state/thunks/generateCode.thunks';

class NavLeftCart extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    egiftCart: PropTypes.array,
    simasPoin: PropTypes.object,
    generateCodeOnboard: PropTypes.object,
    config: PropTypes.object,
  }

  goToCart = () => {
    const {dispatch} = this.props;
    dispatch(goToCart());
  }

  goToOfflineMain = () => {
    const {dispatch} = this.props;
    dispatch(goToOfflineMain());
  }

  render () {
    const {egiftCart = [], simasPoin = {}, generateCodeOnboard = {}, config = {}} = this.props;
    const isLockdown = result(simasPoin, 'isLockdown', true);
    const flagLKDPurchase = String(result(config, 'flag.flagLKDPurchase', 'INACTIVE')).toUpperCase() === 'ACTIVE';
    const flagLKDCashOut = String(result(config, 'flag.flagLKDCashOut', 'INACTIVE')).toUpperCase() === 'ACTIVE';
    const accOffline = result(generateCodeOnboard, 'data.accountOffline', []).length > 0;
    const showQrLdkGenerator = false && (accOffline) && (flagLKDPurchase || flagLKDCashOut);

    return (
      <View style={styles.container}>
        {
          isLockdown ?
            <View style={styles.rowIcon}>
              {showQrLdkGenerator ?
                <Touchable onPress={this.goToOfflineMain} style={styles.iconQr}>
                  <SimasIcon name={'pay-by-qr'} size={32} style={styles.burger}/>
                </Touchable>
                :
                null
              }
              <Touchable onPress={this.goToCart}>
                <SimasIcon name={'cart'} size={32} style={styles.burger}/>
                {egiftCart.length === 0 ?
                  null
                  :
                  <View style={styles.cartRed}/>
                }
              </Touchable>
            </View>
            :
            null
        }

      </View>);
  }
}

export default NavLeftCart;
