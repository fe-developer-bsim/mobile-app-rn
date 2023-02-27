import React from 'react';
import PropTypes from 'prop-types';
import LuckyDrawTnC from '../../components/LuckyDraw/LuckyDipInformationDetail.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {luckyDipSendDataAddress} from '../../state/thunks/luckyDip.thunks';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  sendingDataAddress: (pathRoute, reward, transRefNum) => {
    dispatch(luckyDipSendDataAddress(pathRoute, reward, transRefNum));
  },
  backButton: () => {
    dispatch(NavigationActions.back());
  }
});

const mapStateToProps = () => ({
});

class LuckyDipInformationDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    sendingDataAddress: PropTypes.func,
    backButton: PropTypes.func
  }

  submitAddressform=() => {
    const {sendingDataAddress, navigation} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const reward = result(navigation, 'state.params.reward', '');
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
    sendingDataAddress(pathRoute, reward, transRefNum);
  }

  render () {
    const {navigation, backButton} = this.props;
    const buttonSubmit = result(navigation, 'state.params.buttonOff', false);
    const detailAddress = result(navigation, 'state.params.values', '');
    const reward = result(navigation, 'state.params.reward', '');
    const trackingNumber = result(navigation, 'state.params.trackingNumber', '');
    return <LuckyDrawTnC buttonSubmit={buttonSubmit} reward={reward} backButton={backButton} submitAddressform={this.submitAddressform} addressDetail={detailAddress}
      trackingNumber={trackingNumber}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuckyDipInformationDetailPage);
