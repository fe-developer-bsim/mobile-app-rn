import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CompletedOnboardingView from '../../components/OnboardingJourney/CompletedOnboarding.component';
import {connect} from 'react-redux';
import {prepareGoDashboard} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});
const mapDispatchToProps = (dispatch) => ({
  goDashboard: () => {
    dispatch(prepareGoDashboard());
  }
});

class CompletedOnboarding extends Component {
  static propTypes = {
    goDashboard: PropTypes.func
  }
  onPress = () => {
    this.props.goDashboard();
  }
  render () {
    return (
      <CompletedOnboardingView onPress={this.onPress} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOnboarding);
