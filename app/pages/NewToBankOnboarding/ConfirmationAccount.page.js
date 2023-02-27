import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationAccountComponent from '../../components/NewToBankOnboarding/ConfirmationAccount.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  goBackFromForm: () => {
    dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'Login'}),
        NavigationActions.navigate({routeName: 'IdentityForm'})
      ]
    }));
  },
  goBackFromRegistration: () => {
    dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({routeName: 'Login'}),
        NavigationActions.navigate({routeName: 'RegisterAtm'})
      ]
    }));
  }
});

class ConfirmationAccountPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goBackFromRegistration: PropTypes.func,
    goBackFromForm: PropTypes.func
  }
  onExistingAccountBankPress = () => {
    this.props.goBackFromRegistration();
  }

  onNewToBankPress = () => {
    this.props.goBackFromForm();
  }

  render () {
    return (
      <ConfirmationAccountComponent onExistingAccountBankPress={this.onExistingAccountBankPress} onNewToBankPress={this.onNewToBankPress}/>
    );
  }
}

const ConnectedIntroductionPage = connect(null, mapDispatchToProps)(ConfirmationAccountPage);
export default ConnectedIntroductionPage;
