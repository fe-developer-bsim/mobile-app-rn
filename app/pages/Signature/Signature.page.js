import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Signature from '../../components/Signature/Signature.component';
import result from 'lodash/result';
import {triggerAuthNavigate, upgradeEmoneyKyc} from '../../state/thunks/common.thunks';
import {showSpinner, hideSpinner, saveSignature, clearSignature} from '../../state/actions/index.actions';

const mapDispatchToProps = (dispatch) => ({
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  saveSignature: (data) => dispatch(saveSignature(data)),
  clearSignature: () => dispatch(clearSignature()),
  triggerAuth: (params) => {
    dispatch(triggerAuthNavigate('UpgradeEmoney', null, false, 'AuthEmoney', params));
  },  
  upgradeKYC: (dataId) => {
    dispatch(upgradeEmoneyKyc(dataId));
  }
});

class CreditCardIndexPage extends Component {
  state = {
    signatureData: ''
  }

  setSignature = (data) => {
    this.setState({signatureData: data});
    this.props.saveSignature(data);
  }

  componentWillMount () {
    const {hideSpinner} = this.props;
    hideSpinner();
  }

  goKeepSign= (signatureData) => {
    const {navigation, goToCaptcha, triggerAuth, upgradeKYC} = this.props;
    const formFillData = result(navigation, 'state.params', {});
    const upgradeEmoney = result(navigation, 'state.params.emoneyUpgrade', false);
    const currentAmount = '0';
    const params = {onSubmit: upgradeKYC, currentAmount, isEasypin: true, shouldSendSmsOtp: false, isOtp: false};

    if (!upgradeEmoney) {
      goToCaptcha(formFillData, signatureData);
    } else {
      triggerAuth(params);
    }
  }

  static propTypes = {
    navigation: PropTypes.object,
    goToCaptcha: PropTypes.func,
    hideSpinner: PropTypes.func,
    showSpinner: PropTypes.func,
    saveSignature: PropTypes.func,
    clearSignature: PropTypes.func,
    upgradeKYC: PropTypes.func,
    triggerAuth: PropTypes.func
  }
  
  render () {
    const {navigation} = this.props;
    const upgradeEmoney = result(navigation, 'state.params.emoneyUpgrade', false);
    return <Signature setSignature={this.setSignature} onPress={this.goKeepSign} upgradeEmoney={upgradeEmoney}/>;
  }
}

export default connect(null, mapDispatchToProps)(CreditCardIndexPage);
