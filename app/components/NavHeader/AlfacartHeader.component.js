import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './AlfacartHeader.styles';
import {goToCart} from '../../state/thunks/digitalStore.thunks';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class AlfacartHeader extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    goToCart: PropTypes.func,
    merchantCart: PropTypes.array,
    simasPoin: PropTypes.object,
    egiftList: PropTypes.array,
  }

  goToCart = () => {
    const {dispatch} = this.props;
    dispatch(goToCart());
  }

  render () {
    const {merchantCart = []} = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={this.goToCart}>
          <SimasIcon name={'cart'} size={32} style={styles.burger}/>
          {merchantCart.length === 0 ?
            null
            :
            <View style={styles.cartRed}/>
          }
        </Touchable>
      </View>);
  }
}

export default AlfacartHeader;