import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NewAlfacartHeader.styles';
import {goToCartAlfacart, goToWishlistAlfacart, goToSearchAlfacart} from '../../state/thunks/common.thunks';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, size} from 'lodash';


class DigitalStoreHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    goToWishlist: PropTypes.func,
    cartAlfacart: PropTypes.array,
    wishlistAlfacart: PropTypes.array,
    egiftList: PropTypes.array,
    goToSearchAlfacart: PropTypes.func,
    simasPoin: PropTypes.object,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,

  }

  goToCart = () => {
    const {dispatch} = this.props;
    dispatch(goToCartAlfacart());
  }
  goToWishlist = () => {
    const {dispatch} = this.props;
    dispatch(goToWishlistAlfacart());
  }
  goToSearchAlfacart = () => {
    const {dispatch} = this.props;
    dispatch(goToSearchAlfacart());
  }

  render () {
    const {wishlistAlfacart = [], wishlistCMI = [], currentMerchant = []} = this.props;
    const merchant = result(currentMerchant, 'name', '');

    return (
      <View style={styles.container}>
        {
          merchant === 'ALFACART' ?
            <Touchable onPress={this.goToWishlist}>
              <SimasIcon name={'love-stroke'} size={20} style={styles.burger}/>
              {size(wishlistAlfacart) === 0 ?
                <View style={styles.wishlistBlack}/>

                :
                <View style={styles.wishlistRed}/>
              }
            </Touchable>
            :
            <Touchable onPress={this.goToWishlist}>
              <SimasIcon name={'love-stroke'} size={20} style={styles.burger}/>
              {size(wishlistCMI) === 0 ?
                <View style={styles.wishlistBlack}/>

                :
                <View style={styles.wishlistRed}/>
              }
            </Touchable>
        }
      </View>);
  }
}

export default DigitalStoreHeader;
