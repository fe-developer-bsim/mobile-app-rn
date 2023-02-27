import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from './NavLeftBack.styles';
import Touchable from '../Touchable.component';
import {NavigationActions} from 'react-navigation';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {logout} from '../../state/thunks/onboarding.thunks';

class NavLeftBack extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    isBankAcc: PropTypes.bool
  }
  goToIntroduction = () => {
    const {dispatch, isBankAcc} = this.props;
    if (isBankAcc) {
      dispatch(logout());
    } else {
      dispatch(NavigationActions.back());
    }
  }
  render () {
    const {isBankAcc} = this.props;
    return (
      <View style={styles.container}>
        <Touchable onPress={this.goToIntroduction}>
          {
            isBankAcc ?
              <SimasIcon name={'arrow'} size={20} style={styles.arrowWhite}/>
              :
              <SimasIcon name={'arrow'} size={20} style={styles.arrow}/>

          }
          <View />
        </Touchable>
      </View>);
  }
}

export default NavLeftBack;
