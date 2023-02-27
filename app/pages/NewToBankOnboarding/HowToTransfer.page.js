import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HowToTransfercomponent from '../../components/NewToBankOnboarding/HowToTransfer.component.js';
import {withATMcontent, withInternetBankingcontent, withMobileBankingcontent} from '../../config/HowToTransfercontent.config';
import result from 'lodash/result';

export default class LearnMorePage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  onFinalizeForm = () => {
    const {navigation} = this.props;
    const smartfrenAmount = result(navigation, 'state.params.smartfrenAmount', '');
    this.props.navigation.navigate('IdentityFifthForm', {smartfrenAmount});
  }

  render () {
    return (
      <HowToTransfercomponent withATMcontent={withATMcontent} withMobileBankingcontent={withMobileBankingcontent} withInternetBankingcontent={withInternetBankingcontent} onFinalizeForm={this.onFinalizeForm}/>
    );
  }
}
