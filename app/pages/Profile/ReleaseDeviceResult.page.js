import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReleaseDeviceResult from '../../components/Profile/ReleaseDeviceResult.component';
import {connect} from 'react-redux';
import {resetAndNavigate} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  releaseQrResult: () => {
    dispatch(resetAndNavigate('ReleaseDeviceResult'));
  },
  dispatch: (data) => dispatch(data),
  back: () => dispatch(NavigationActions.back())
});

class ReleaseDeviceResultFormClass extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    releaseQrResult: PropTypes.func,
    clearDevices: PropTypes.func,
    back: PropTypes.func,
  }

  toReleaseQr = () => {
    const {back} = this.props;
    back();
  }

  render () {
    const {clearDevices} = this.props;
    return <ReleaseDeviceResult toReleaseQr={this.toReleaseQr} clearDevices={clearDevices}/>;
  }
}

export default connect(null, mapDispatchToProps)(ReleaseDeviceResultFormClass);
