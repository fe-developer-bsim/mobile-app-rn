import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionIndigo from '../../components/ProductOptions/IndigoTnC.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {openCreditCard} from '../../state/thunks/ccEform.thunks';

const mapStateToProps = (state) => ({
  indigoTncUrlEn: result(state, 'config.attention.urlSimobiTnCIndigoEn', ''),
  indigoTncUrlId: result(state, 'config.attention.urlSimobiTnCIndigoIn', ''),
  platinumTncUrlEn: result(state, 'config.attention.urlSimobiTnCPlatinumEn', ''),
  platinumTncUrlId: result(state, 'config.attention.urlSimobiTnCPlatinumIn', ''),
  oramiTncUrlEn: result(state, 'config.attention.urlSimobiTnCOramiEn', ''),
  oramiTncUrlId: result(state, 'config.attention.urlSimobiTnCOramiIn', ''),
  alfamartTncUrlEn: result(state, 'config.attention.urlSimobiTnCCCAlfamartEn', ''),
  alfamartTncUrlId: result(state, 'config.attention.urlSimobiTnCCCAlfamartIn', ''),
  travelokaTncUrlEn: result(state, 'config.attention.urlSimobiTnCTravelokaEn', ''),
  travelokaTncUrlId: result(state, 'config.attention.urlSimobiTnCTravelokaIn', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  ccCode: result(state, 'ccCode', ''),
  nav: result(state, 'nav', {})
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (referralCodeOrami, nav) => dispatch(openCreditCard(referralCodeOrami, nav)),
});


class TermIndigoPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    indigoTncUrlEn: PropTypes.string,
    indigoTncUrlId: PropTypes.string,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    platinumTncUrlEn: PropTypes.string,
    platinumTncUrlId: PropTypes.string,
    oramiTncUrlEn: PropTypes.string,
    oramiTncUrlId: PropTypes.string,
    alfamartTncUrlEn: PropTypes.string,
    alfamartTncUrlId: PropTypes.string,
    travelokaTncUrlEn: PropTypes.string,
    travelokaTncUrlId: PropTypes.string,
    ccCode: PropTypes.string,
    nav: PropTypes.object
  }

  goToNextPage = (nav) => () => {
    const {navigation, goToNextPage} = this.props;
    const referralCodeOrami = result(navigation, 'state.params.referralCodeOrami', '');
    goToNextPage(referralCodeOrami, nav);
  }

  render () {
    const {indigoTncUrlEn, indigoTncUrlId, currentLanguage, platinumTncUrlEn, platinumTncUrlId, ccCode, 
      oramiTncUrlEn, oramiTncUrlId, alfamartTncUrlEn, alfamartTncUrlId, nav,
      travelokaTncUrlEn, travelokaTncUrlId} = this.props;
    const urlPlatinum = currentLanguage === 'en' ? platinumTncUrlEn : platinumTncUrlId;
    const urlIndigo = currentLanguage === 'en' ? indigoTncUrlEn : indigoTncUrlId;
    const urlOrami = currentLanguage === 'en' ? oramiTncUrlEn : oramiTncUrlId;
    const urlAlfamart = currentLanguage === 'en' ? alfamartTncUrlEn : alfamartTncUrlId;
    const urlTraveloka = currentLanguage === 'en' ? travelokaTncUrlEn : travelokaTncUrlId;

    let url = '';
    
    if (ccCode === 'CCI-SIMOBI-002') {
      url = urlIndigo;
    } else if (ccCode === 'CCP-SIMOBI-002') {
      url = urlPlatinum; 
    } else if (ccCode === 'CCO-SIMOBI-002') {
      url = urlOrami;
    } else if (ccCode === 'CCT-SIMOBI-002') {
      url = urlTraveloka;
    } else {
      url = urlAlfamart;
    }
    
    return (
      <TermConditionIndigo
        onFinalizeForm={this.onFinalizeForm}
        url={url}
        currentLanguage={currentLanguage}
        goToNextPage={this.goToNextPage}
        nav={nav}
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(TermIndigoPage);
export default ConnectedForm;