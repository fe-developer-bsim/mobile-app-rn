import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardFinalize from '../../components/CreateNewAccount/CreditCardFinalizeForm.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {prepareGoDashboardFromMigrate} from '../../state/thunks/onboarding.thunks';

const mapDispatchToProps = (dispatch) => ({
  backToHome: () => dispatch(prepareGoDashboardFromMigrate()),
});
const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {}))
});

class CreditCardFinalizeForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    backToHome: PropTypes.func,
    name: PropTypes.string,
    onBackPress: PropTypes.func,
    isLogin: PropTypes.bool,
    mockImageLocation: PropTypes.bool,
  }

  render () {
    const {name, navigation, mockImageLocation = false, backToHome} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return (
      <CreditCardFinalize name={name} backToHome={backToHome} {...navParams}
        mockImageLocation={mockImageLocation}/>
    );
  }
}
const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardFinalizeForm);
export default ConnectedIntroductionPage;
