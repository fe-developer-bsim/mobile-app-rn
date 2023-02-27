import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Touchable from '../Touchable.component';
import {logout} from '../../state/thunks/onboarding.thunks';
import styles from './NavHeader.styles';
import {language} from '../../config/language';

class Logout extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  logOff = () => {
    this.props.dispatch(logout());
  }

  render () {
    return (
      <View>
        <Touchable style={styles.navContainer} onPress={this.logOff}>
          <Text style={styles.contrastColor}>
            {language.PROFILE__LOGOUT_BUTTON}
          </Text>
        </Touchable>
      </View>
    );
  }
}

export default Logout;
