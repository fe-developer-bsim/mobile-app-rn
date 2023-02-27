import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendTrackingFourPointSeven} from '../../state/thunks/loan.thunks';
import SelfieComponent from '../../components/Loan/CameraSelfieRetake.component';
import result from 'lodash/result';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: () => dispatch(sendTrackingFourPointSeven()),
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class SelfieComponentPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func,
    dataDisplay: PropTypes.object,
  }
  state = {
    isDisabled: true
  }

  render () {
    const {goCheckSign, navigation = [], dataDisplay} = this.props;
    const dataAccount = result(navigation, 'state.params.data', {});
    return (
      <SelfieComponent goCheckSign = {goCheckSign} dataAccount={dataAccount} {...navigation} isDisabled={this.state.isDisabled} dataDisplay={dataDisplay}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SelfieComponentPage);
