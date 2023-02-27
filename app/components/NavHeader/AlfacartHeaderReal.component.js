import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './AlfacartHeader.styles';
import {goToCart, goToSearchAlfacart} from '../../state/thunks/digitalStore.thunks';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';

class AlfacartHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    merchantCart: PropTypes.array,
    simasPoin: PropTypes.object,
    egiftList: PropTypes.array,
    typeMerchant: PropTypes.string,
    goToSearchAlfacart: PropTypes.func,
  }

  goToCart = () => {
    const {dispatch} = this.props;
    dispatch(goToCart('alfacart'));
  }
  goToSearchAlfacart = () => {
    const {dispatch} = this.props;
    dispatch(goToSearchAlfacart());
  }

  render () {

    const {merchantCart = []} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}><Text style={styles.styleText}>{language.ALFACART_LANDING}</Text></View>
          <Touchable onPress={this.goToSearchAlfacart}>
            <SimasIcon name={'search'} size={20} style={styles.burger}/>
          </Touchable>
           
          <Touchable onPress={this.goToCart}>
            <SimasIcon name={'cart'} size={32} style={styles.burger}/>
            {merchantCart.length === 0 ?
              null
              :
              <View style={styles.cartRed}/>
            }
          </Touchable>
          
          
        
          <Touchable onPress={''}>
            <SimasIcon name={'love-stroke'} size={20} style={styles.burger}/>
          </Touchable>
        </View>
     
      </View>);
  }
}

export default AlfacartHeader;
