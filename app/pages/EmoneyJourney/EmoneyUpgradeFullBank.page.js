import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyUpgradeFullBank from '../../components/EmoneyJourney/EmoneyUpgradeFullBank.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'HomeScreen'})]
  })),
  onBackPress: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'HomeScreen'})]
  })),
});
const mapStateToProps = () => ({

});

class EmoneyFinalize extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
    onButtonPress: PropTypes.func,
    name: PropTypes.string,
    onBackPress: PropTypes.func,
    mockImageLocation: PropTypes.bool
  }

  render () {
    const {onButtonPress, onBackPress, mockImageLocation = false} = this.props;
    return (
      <EmoneyUpgradeFullBank onButtonPress={onButtonPress}  onBackPress={onBackPress}  mockImageLocation={mockImageLocation }/>
    );
  }
}
const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(EmoneyFinalize);
export default ConnectedIntroductionPage;
