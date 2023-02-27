import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Touchable from './../../components/Touchable.component';
import styles from './NavHeader.styles';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';

export default class LoginSwitch extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    isBrandColor: PropTypes.bool,
    resetToLanding: PropTypes.bool,
    navigateTo: PropTypes.string,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    withParams: PropTypes.bool,
    resetLoginOrCreate: PropTypes.bool,
    isLogin: PropTypes.bool,
    text2: PropTypes.string,
    isCreate: PropTypes.bool
  }

  onPress = () => {
    const {dispatch, navigateTo, resetToLanding = false, withParams = false, resetLoginOrCreate = false} = this.props;
    if (resetToLanding) {
      dispatch(NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({routeName: 'Login'}),
          NavigationActions.navigate({routeName: navigateTo})
        ]
      }));
    } else if (resetLoginOrCreate) {
      dispatch(NavigationActions.navigate({routeName: 'ChooseRegistration'}));
    } else if (withParams) {
      dispatch(NavigationActions.navigate({routeName: navigateTo, params: {regisATM: true}}));
    } else {
      dispatch(NavigationActions.navigate({routeName: navigateTo}));
    }
  }

  render () {
    const {text, isBrandColor = true, isCreate = false, isLogin = false} = this.props;
    return (
      <Touchable style={styles.navContainer} onPress={this.onPress} >
        {isCreate ?
          <Text>
            <Text style={styles.blackColor}>
              {language.LOGIN__DONT_HAVE_ACCOUNT}
            </Text>
            <Text style={styles.primaryColor}>
              {language.INTRODUCTION__REVAMP_REGISTER}
            </Text>
          </Text>
          : isLogin ?
            <Text>
              <Text style={styles.blackColor}>
                {language.IDENTITYFORM__HAVE_AN_ACCOUNT}
              </Text>
              <Text style={styles.primaryColor}>
                {language.IDENTITYFORM__HAVE_AN_ACCOUNT_LOG_IN}
              </Text>
            </Text>
            :
            <Text style={isBrandColor ? styles.primaryColor : styles.contrastColor}>
              {text}
            </Text>
        }
      </Touchable>
    );
  }
}
