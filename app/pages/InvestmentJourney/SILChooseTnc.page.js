import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkPolisTnCComponent from '../../components/InvestmentJourney/SILChooseTnC.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getUserDetailForNBPolis} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => ({
  ccCode: result(state, 'ccCode', ''),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  urlSmartInvestaLinkIdrId: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SMART_INVESTA_LINK_ID', ''),
  urlSmartInvestaLinkIdrEn: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SMART_INVESTA_LINK_EN', ''),
  urlSimasInvestaLinkUsdId: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SIMAS_INVESTA_LINK_ID', ''),
  urlSimasInvestaLinkUSDEn: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SIMAS_INVESTA_LINK_EN', '')
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: () => {
    dispatch(getUserDetailForNBPolis());
  },
});

class SmartInvestaLinkPolisTnCPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    goToNextPage: PropTypes.func,
    onGoNext: PropTypes.func,
    currentLanguage: PropTypes.string,
    urlSmartInvestaLinkIdrEn: PropTypes.string,
    urlSmartInvestaLinkIdrId: PropTypes.string,
    urlSimasInvestaLinkUSDEn: PropTypes.string,
    urlSimasInvestaLinkUsdId: PropTypes.string,
    ccCode: PropTypes.string,
    
  }
  onGoNext = () => {
    this.props.goToNextPage();
  }
  
  render () {
    const {navigation = {}, goToNextPage, urlSmartInvestaLinkIdrEn, urlSmartInvestaLinkIdrId, 
      urlSimasInvestaLinkUSDEn, urlSimasInvestaLinkUsdId, currentLanguage, ccCode} = this.props;
    const items = result(navigation, 'state.params.data.code');
    const urlSilIdr = currentLanguage === 'en' ? urlSmartInvestaLinkIdrEn : urlSmartInvestaLinkIdrId;
    const urlSilUsd = currentLanguage === 'en' ? urlSimasInvestaLinkUSDEn : urlSimasInvestaLinkUsdId;

    let url = '';
    
    if (ccCode === 'SILIDR_SIMOBI-002') {
      url = urlSilIdr;    
    } else {
      url = urlSilUsd;
    }
    
    return <SmartInvestaLinkPolisTnCComponent 
      items={items}
      goToNextPage={goToNextPage}
      urlSmartInvestaLinkIdrEn={urlSmartInvestaLinkIdrEn}
      urlSmartInvestaLinkIdrId={urlSmartInvestaLinkIdrId}
      urlSimasInvestaLinkUSDEn={urlSimasInvestaLinkUSDEn}
      urlSimasInvestaLinkUsdId={urlSimasInvestaLinkUsdId}
      onGoNext={this.onGoNext}
      currentLanguage={currentLanguage}
      url={url}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkPolisTnCPage);
