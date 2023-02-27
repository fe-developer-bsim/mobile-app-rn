import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IdentityFourthForm from '../../components/NewToBankOnboarding/IdentityFifthForm.component';
import {language} from '../../config/language';
import {Toast} from '../../utils/RNHelpers.util';
import {Linking} from 'react-native';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {}))
});

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (rootName) => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: rootName})
      ]
    }));
  }
});

class IdentityFourthFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    onButtonPress: PropTypes.func,
    isLogin: PropTypes.bool
  }

  onCustomerCall = (telephone) => () => {
    Linking.canOpenURL(telephone).then((supported) => {
      if (supported) {
        Linking.openURL(telephone);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  backToHome = () => {
    const {isLogin, onButtonPress} = this.props;
    onButtonPress(isLogin ? 'HomeScreen' : 'Login');
  }

  render () {
    const {navigation, goToForgotPassword, isLogin} = this.props;
    const smartfrenAmount = result(navigation, 'state.params.smartfrenAmount', '');
    return (
      <IdentityFourthForm forgotPassword={goToForgotPassword} backToHome={this.backToHome} smartfrenAmount={smartfrenAmount} navigation={navigation} isLogin={isLogin} onPrimaryCustomerCall={this.onCustomerCall('tel:1500153')}/>
    );
  }
}
const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(IdentityFourthFormPage);
export default ConnectedIntroductionPage;
