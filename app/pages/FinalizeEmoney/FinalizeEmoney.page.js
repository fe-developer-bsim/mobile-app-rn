import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FinalizeEmoney from '../../components/FinalizeEmoney/FinalizeEmoney.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {logout} from '../../state/thunks/onboarding.thunks';
import capitalize from 'lodash/capitalize';
import {StackActions, NavigationActions} from 'react-navigation';

const mapDispatchToProps = dispatch => ({
  onButtonPress: () => dispatch(logout()),
  onBackPress: () =>
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
      }),
    ),
});
const mapStateToProps = state => ({
  name: capitalize(result(state, 'user.profile.name', '')),
});

class FinalizeEmoneyPageForm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    onButtonPress: PropTypes.func,
    name: PropTypes.string,
    onBackPress: PropTypes.func,
  };

  render() {
    const {onButtonPress, name, onBackPress} = this.props;
    return (
      <FinalizeEmoney
        name={name}
        onButtonPress={onButtonPress}
        onBackPress={onBackPress}
      />
    );
  }
}
const ConnectedIntroductionPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinalizeEmoneyPageForm);
export default ConnectedIntroductionPage;
