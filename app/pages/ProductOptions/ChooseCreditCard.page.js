import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CreditCardComponent from '../../components/ProductOptions/ChooseCreditCard.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {saveCcCode} from '../../state/actions/index.actions.js';
import {result, isEmpty, startsWith, find} from 'lodash';

const mapStateToProps = (state) => ({currentLanguage, user, config}) => ({
  currentLanguage, config,
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  isLogin: !isEmpty(user)
});

const mapDispatchToProps = (dispatch) => ({
  goToIndigo: () => {
    dispatch(saveCcCode('CCI-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToPlatinum: () => {
    dispatch(saveCcCode('CCP-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToOrami: () => {
    dispatch(saveCcCode('CCO-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToAlfamart: () => {
    dispatch(saveCcCode('CCA-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  },
  goToTraveloka: () => {
    dispatch(saveCcCode('CCT-SIMOBI-002'));
    dispatch(NavigationActions.navigate({routeName: 'IndigoTnC'}));
  }
});

class ChooseCreditCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToIndigo: PropTypes.func,
    goToPlatinum: PropTypes.func,
    goToOrami: PropTypes.func,
    goToAlfamart: PropTypes.func,
    goToTraveloka: PropTypes.func,
    config: PropTypes.object,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    isLogin: PropTypes.bool
  }

  render () {
    const {goToIndigo, goToPlatinum, goToOrami, goToAlfamart, goToTraveloka, config, cifCode, accountList, isLogin} = this.props;
    const indigoEnabledNTB = result(config, 'flag.flagRegisterCCINTB', 'INACTIVE') === 'ACTIVE';
    const indigoEnabledETB = result(config, 'flag.flagRegisterCCIETB', 'INACTIVE') === 'ACTIVE';

    const platinumEnabledNTB = result(config, 'flag.flagRegisterCCPNTB', 'INACTIVE') === 'ACTIVE';
    const platinumEnabledETB = result(config, 'flag.flagRegisterCCPETB', 'INACTIVE') === 'ACTIVE';

    const oramiEnabledNTB = result(config, 'flag.flagRegisterCCONTB', 'INACTIVE') === 'ACTIVE';
    const oramiEnabledETB = result(config, 'flag.flagRegisterCCOETB', 'INACTIVE') === 'ACTIVE';

    const alfamartEnabledNTB = result(config, 'flag.flagRegisterCCANTB', 'INACTIVE') === 'ACTIVE';
    const alfamartEnabledETB = result(config, 'flag.flagRegisterCCAETB', 'INACTIVE') === 'ACTIVE';
    
    const travelokaEnabledNTB = result(config, 'flag.flagRegisterCCTNTB', 'INACTIVE') === 'ACTIVE';
    const travelokaEnabledETB = result(config, 'flag.flagRegisterCCTETB', 'INACTIVE') === 'ACTIVE';

    const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
    
    return (
      <CreditCardComponent
        goToIndigo={goToIndigo}
        goToPlatinum={goToPlatinum}
        goToOrami={goToOrami}
        goToAlfamart={goToAlfamart}
        goToTraveloka={goToTraveloka}
        indigoEnabledNTB={indigoEnabledNTB}
        indigoEnabledETB={indigoEnabledETB}
        platinumEnabledNTB={platinumEnabledNTB}
        platinumEnabledETB={platinumEnabledETB}
        oramiEnabledNTB={oramiEnabledNTB}
        oramiEnabledETB={oramiEnabledETB}
        alfamartEnabledNTB={alfamartEnabledNTB}
        alfamartEnabledETB={alfamartEnabledETB}
        travelokaEnabledNTB={travelokaEnabledNTB}
        travelokaEnabledETB={travelokaEnabledETB}
        isEmoneyKyc={isEmoneyKyc}
        isLogin={isLogin}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCreditCard);