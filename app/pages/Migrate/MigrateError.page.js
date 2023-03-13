import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MigrateErrorComponent from '../../components/Migrate/MigrateError.component';
import {connect} from 'react-redux';
import {goBackToLanding} from '../../state/thunks/onboarding.thunks';
import result from 'lodash/result';
import {StackActions, NavigationActions} from 'react-navigation';

const mapStateToProps = ({currentLanguage}) => ({currentLanguage});
const mapDispatchToProps = dispatch => ({
  goLanding: () => {
    dispatch(goBackToLanding());
  },
  goToHomeScreen: () => {
    dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
      }),
    );
  },
});

class ErrorOnboardingMigrate extends Component {
  static propTypes = {
    goLanding: PropTypes.func,
    navigation: PropTypes.object,
    goToHomeScreen: PropTypes.func,
  };
  onPress = () => {
    this.props.goLanding();
  };
  render() {
    const {navigation, goToHomeScreen} = this.props;
    const isPaydayLoan = result(
      navigation,
      'state.params.isPaydayLoan',
      'false',
    );
    return (
      <MigrateErrorComponent
        onPress={this.onPress}
        isPaydayLoan={isPaydayLoan}
        goToHomeScreen={goToHomeScreen}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorOnboardingMigrate);
