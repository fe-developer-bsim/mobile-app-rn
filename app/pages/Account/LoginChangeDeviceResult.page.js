import React from 'react';
import PropTypes from 'prop-types';
import LoginChangeDeviceResult from '../../components/Account/LoginChangeDeviceResult.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {finishLockDownDevice} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (data) => dispatch(data),
  finishLockDownDevice: (swag) => () => {
    dispatch(finishLockDownDevice(swag));
  }
});

class LoginChangeDeviceResultPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    finishLockDownDevice: PropTypes.func,
  }

  componentWillUnmount = () => {
    const {dispatch, finishLockDownDevice, navigation} = this.props;
    const swag = result(navigation, 'state.params.dataRelease.changeDeviceLockdownMap.swag', '');
    dispatch(finishLockDownDevice(swag));
  }

  render () {
    const {finishLockDownDevice, navigation} = this.props;
    const swag = result(navigation, 'state.params.dataRelease.changeDeviceLockdownMap.swag', '');
    return <LoginChangeDeviceResult finishLockDownDevice={finishLockDownDevice(swag)}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginChangeDeviceResultPage);
