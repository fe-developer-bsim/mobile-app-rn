import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NewAlfacartHeader.styles';
import {goToCartAlfacart, goToWishlistAlfacart, goToSearchAlfacart} from '../../state/thunks/common.thunks';
import Touchable from '../Touchable.component';
import {result, size} from 'lodash';
import SimasIcon from '../../assets/fonts/SimasIcon';

class DigitalStoreHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    goToWishlist: PropTypes.func,
    cartAlfacart: PropTypes.array,
    wishlistAlfacart: PropTypes.array,
    cartCMI: PropTypes.array,
    wishlistCMI: PropTypes.array,
    simasPoin: PropTypes.object,
    egiftList: PropTypes.array,
    currentMerchant: PropTypes.array,

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
    const {cartAlfacart = [], wishlistAlfacart = [], cartCMI = [], wishlistCMI = [], currentMerchant = []} = this.props;
    const merchant = result(currentMerchant, 'name', '');
    return (
      <View style={styles.container}>
        
        <Touchable onPress={this.goToSearchAlfacart}>
          <SimasIcon name={'search'} size={20} style={styles.burger}/>
        </Touchable>
        {
          merchant === 'ALFACART' ?
            <Touchable onPress={this.goToCart}>
              <SimasIcon name={'cart'} size={32} style={styles.burger}/>
              {size(cartAlfacart) === 0 ?
                <View style={styles.wishlistBlack}/>
                : 
                <View style={styles.cartRed}/>
              }
            </Touchable>
            :
            <Touchable onPress={this.goToCart}>
              <SimasIcon name={'cart'} size={32} style={styles.burger}/>
              {size(cartCMI) === 0 ?
                <View style={styles.wishlistBlack}/>
                : 
                <View style={styles.cartRed}/>
              }
            </Touchable>
        }
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
      </View>
    );
  }
}

export default DigitalStoreHeader;