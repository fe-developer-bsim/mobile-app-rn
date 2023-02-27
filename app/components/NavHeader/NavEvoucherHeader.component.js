import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './NavEvoucherHeader.styles';
import {goToCart} from '../../state/thunks/common.thunks';
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';

class NavEvoucher extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    egiftCart: PropTypes.array,
    simasPoin: PropTypes.object,
    egiftList: PropTypes.array,
  }

  goToCart = () => {
    const {dispatch} = this.props;
    dispatch(goToCart());
  }

  render () {
    const {egiftCart = [], simasPoin = {}, egiftList = []} = this.props;
    const category = result(egiftList, 'category');
    const isLockdown = result(simasPoin, 'isLockdown', true);
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}><Text style={styles.styleText}>{category === '01' ? language.EGIFT__EVOUCHER_NAME_HNB : category === '02' ? language.EGIFT__EVOUCHER_NAME_FNG : category === '03' ? language.EGIFT__EVOUCHER_NAME_FNB : category === '04' ? language.EGIFT__EVOUCHER_NAME_SHOPPING : category === '05' ? language.EGIFT__EVOUCHER_NAME_TRANSPORTATION : language.EGIFT__EVOUCHER_NAME_MORE}</Text></View>
        {
          isLockdown ?
            <Touchable onPress={this.goToCart}>
              <SimasIcon name={'cart'} size={32} style={styles.burger}/>
              {egiftCart.length === 0 ?
                null
                :
                <View style={styles.cartRed}/>
              }
            </Touchable>
            :
            null
        }

      </View>);
  }
}

export default NavEvoucher;
