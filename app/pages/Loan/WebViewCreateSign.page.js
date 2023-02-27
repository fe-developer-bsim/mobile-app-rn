import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {sendTrackingFourPointFour} from '../../state/thunks/loan.thunks';
import WebCreateSignComponent from '../../components/Loan/WebViewCreateSign.component';
import result from 'lodash/result';

const mapDispatchToProps = (dispatch) => ({
  goCheckSign: () => dispatch(sendTrackingFourPointFour()),
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

class WebCreateSignPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goCheckSign: PropTypes.func,
    dataDisplay: PropTypes.object,
  }
  state = {
    isDisabled: true
  }

  render () {
    const {goCheckSign, navigation = []} = this.props;
    const urlCreate = result(navigation, 'state.params.url', '');
    return (
      <WebCreateSignComponent goCheckSign = {goCheckSign} urlCreate={urlCreate}/>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(WebCreateSignPage);
