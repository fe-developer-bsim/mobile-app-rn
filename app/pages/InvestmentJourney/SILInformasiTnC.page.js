import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SmartInvestaLinkPolisTnCComponent from '../../components/InvestmentJourney/SILInformasiTnC.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';


const mapStateToProps = (state) => ({
  ccCode: result(state, 'ccCode', ''),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  urlSuratPemahamanId: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SURATPEMAHAMANUNITLINK_ID', ''),
  urlSuratPemahamanEn: result(state, 'config.attention.URLSIMOBIPLUS_TNC_SURATPEMAHAMANUNITLINK_EN', ''),
  isSilIdrUsd: result(state, 'silIdrUsd', '')
});

const mapDispatchToProps = (dispatch) => ({
  backClose: () => {
    dispatch(NavigationActions.back());
  }
});

class SmartInvestaLinkPolisTnCPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    goToNextPage: PropTypes.func,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    urlSuratPemahamanId: PropTypes.string,
    urlSuratPemahamanEn: PropTypes.string,
    ccCode: PropTypes.string,
    isSilIdrUsd: PropTypes.string
  }
  onBackPage = () => {
    this.props.backClose();
  }

  render () {
    const {navigation = {}, goToNextPage, urlSuratPemahamanEn, urlSuratPemahamanId,
      currentLanguage, ccCode, isSilIdrUsd} = this.props;
    const items = result(navigation, 'state.params.data.code');
    const urlSilIdr = currentLanguage === 'en' ? urlSuratPemahamanEn : urlSuratPemahamanId;
    const urlSilUsd = currentLanguage === 'en' ? urlSuratPemahamanEn : urlSuratPemahamanId;

    let url = '';

    if (ccCode === 'SILINFOIDR_SIMOBI-002') {
      url = urlSilIdr;
    } else {
      url = urlSilUsd;
    }

    return <SmartInvestaLinkPolisTnCComponent
      items={items}
      goToNextPage={goToNextPage}
      urlSuratPemahamanEn={urlSuratPemahamanEn}
      urlSuratPemahamanId={urlSuratPemahamanId}
      onBackPage={this.onBackPage}
      currentLanguage={currentLanguage}
      url={url}
      isSilIdrUsd={isSilIdrUsd}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkPolisTnCPage);