import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendTrackingFourPointFour, sendTrackingFourPointSix} from '../../state/thunks/loan.thunks';
import SignCreateComponent from '../../components/Loan/SignSignatureLoan.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: () => dispatch(sendTrackingFourPointFour()),
  goToTNC: () =>  dispatch(NavigationActions.navigate({routeName: 'TncLoanPage'})),
  goBackHome: (orderId) => {
    dispatch(sendTrackingFourPointSix(orderId));
  }
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class SignDigiPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func,
    dataDisplay: PropTypes.object,
    goToTNC: PropTypes.func,
    goBackHome: PropTypes.func
  }
  
  state = {
    isDisabled: true
  }

  goTobackHomeAndCheckDoc =() => {
    const orderId = result(this.props.navigation, 'state.params.orderId', '');
    this.props.goBackHome(orderId);
  }

  render () {
    const {goCheckSign, navigation = [], goToTNC} = this.props;
    const urlAndroid = result(navigation, 'state.params.urlAndroid', '');
    const urlIos = result(navigation, 'state.params.urlIos', '');
    return (
      <SignCreateComponent goCheckSign = {goCheckSign} goToTNC={goToTNC} urlAndroid={urlAndroid} urlIos={urlIos} goBackHome={this.goTobackHomeAndCheckDoc}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SignDigiPage);
