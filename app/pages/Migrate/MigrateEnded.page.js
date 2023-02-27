import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MigrateEndComponent from '../../components/Migrate/MigrateEnded.component';
import {prepareGoDashboardFromMigrate} from  '../../state/thunks/onboarding.thunks';
import {connect} from 'react-redux';

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});
const mapDispatchToProps = (dispatch) => ({
  goDashboard: () => {
    dispatch(prepareGoDashboardFromMigrate());
  }
});

class CompletedOnboardingMigrate extends Component {
  static propTypes = {
    goDashboard: PropTypes.func
  }
  onPress = () => {
    this.props.goDashboard();
  }
  render () {
    return (
      <MigrateEndComponent onPress={this.onPress} />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOnboardingMigrate);
