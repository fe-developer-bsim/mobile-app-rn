import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IdentityFourthForm from '../../components/NewToBankOnboarding/IdentityFourthForm.component';
import result from 'lodash/result';

class IdentityFourthFormPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setUsername: PropTypes.func,
    goToForgotPassword: PropTypes.func,
  }

  onFinalizeForm = () => {
    const {navigation} = this.props;
    const smartfrenAmount = result(navigation, 'state.params.smartfrenAmount', '');
    navigation.navigate('IdentityFifthForm', {smartfrenAmount});
  }

  onHowToTransferPress = () => {
    const {navigation} = this.props;
    const smartfrenAmount = result(navigation, 'state.params.smartfrenAmount', '');
    navigation.navigate('HowToTransferPage', {smartfrenAmount});
  }


  render () {
    const {navigation} = this.props;
    const vaNumber = result(navigation, 'state.params.vaNumber', '');
    const vaName = result(navigation, 'state.params.vaName', '');
    const smartfrenAmount = result(navigation, 'state.params.smartfrenAmount', '');
    return (
      <IdentityFourthForm navigation={navigation} smartfrenAmount={smartfrenAmount} onFinalizeForm={this.onFinalizeForm} onHowToTransferPress={this.onHowToTransferPress} vaNumber={vaNumber} vaName={vaName}/>
    );
  }
}

export default IdentityFourthFormPage;
