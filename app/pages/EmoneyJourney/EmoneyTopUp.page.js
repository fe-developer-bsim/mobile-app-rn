import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardComponent from '../../components/EmoneyJourney/EmoneyTopUp.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {saveCcCode} from '../../state/actions/index.actions.js';
import {result, isEmpty} from 'lodash';

const mapStateToProps = ({currentLanguage, config, user}) => ({currentLanguage, config, isLogin: !isEmpty(user)});

const mapDispatchToProps = (dispatch) => ({
  goToATM: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpATM'}));
  },
  goToPlatinum: () => {
    dispatch(saveCcCode('CCP-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToOrami: () => {
    dispatch(saveCcCode('CCO-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToBankBranch: () => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyTopUpBankBranch'}));
  }
});

class ChooseCreditCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToATM: PropTypes.func,
    goToPlatinum: PropTypes.func,
    goToOrami: PropTypes.func,
    goToBankBranch: PropTypes.func,
    config: PropTypes.object,
    mockImageLocation: PropTypes.bool,
    isLogin: PropTypes.bool,
  }

  render () {
    const {goToATM, goToPlatinum, goToOrami, goToBankBranch, config, isLogin, mockImageLocation = false} = this.props;
    const indigoEnabledNTB = result(config, 'flag.flagRegisterCCINTB', 'INACTIVE') === 'ACTIVE';
    const indigoEnabledETB = result(config, 'flag.flagRegisterCCIETB', 'INACTIVE') === 'ACTIVE';

    const platinumEnabledNTB = result(config, 'flag.flagRegisterCCPNTB', 'INACTIVE') === 'ACTIVE';
    const platinumEnabledETB = result(config, 'flag.flagRegisterCCPETB', 'INACTIVE') === 'ACTIVE';

    const oramiEnabledNTB = result(config, 'flag.flagRegisterCCONTB', 'INACTIVE') === 'ACTIVE';
    const oramiEnabledETB = result(config, 'flag.flagRegisterCCOETB', 'INACTIVE') === 'ACTIVE';

    const alfamartEnabledNTB = result(config, 'flag.flagRegisterCCANTB', 'INACTIVE') === 'ACTIVE';
    const alfamartEnabledETB = result(config, 'flag.flagRegisterCCAETB', 'INACTIVE') === 'ACTIVE';
    return (
      <CreditCardComponent
        goToATM={goToATM}
        goToPlatinum={goToPlatinum}
        goToOrami={goToOrami}
        goToBankBranch={goToBankBranch}
        indigoEnabledNTB={indigoEnabledNTB}
        indigoEnabledETB={indigoEnabledETB}
        platinumEnabledNTB={platinumEnabledNTB}
        platinumEnabledETB={platinumEnabledETB}
        oramiEnabledNTB={oramiEnabledNTB}
        oramiEnabledETB={oramiEnabledETB}
        alfamartEnabledNTB={alfamartEnabledNTB}
        alfamartEnabledETB={alfamartEnabledETB}
        mockImageLocation={mockImageLocation}
        isLogin={isLogin}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreditCard);