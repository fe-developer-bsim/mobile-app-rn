import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EFormLoanSuccessComp from '../../components/CreateNewAccount/EFormLoanSuccess.component';
import {connect} from 'react-redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {isEmpty, result} from 'lodash';
import {prepareGoDashboard} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = state => ({
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = dispatch => ({
  onButtonPress: rootName =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: rootName})],
      }),
    ),
  backToHome: () => dispatch(prepareGoDashboard()),
});

class EFormLoanSuccess extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    isLogin: PropTypes.object,
    onButtonPress: PropTypes.func,
  };

  backToHome = () => {
    const {isLogin, onButtonPress} = this.props;
    onButtonPress(isLogin ? 'Landing' : 'Login');
  };

  render() {
    return <EFormLoanSuccessComp backToHome={this.backToHome} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EFormLoanSuccess);
