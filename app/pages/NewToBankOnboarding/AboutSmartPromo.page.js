import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AboutSmartPromocomponent from '../../components/NewToBankOnboarding/AboutSmartPromo.component.js';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {cameraPermissionSelfie} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => ({
  imagePromoID: result(state, 'config.attention.urlSmartfrenPromo.url_id', 'http://www.banksinarmas.com/PersonalBanking/externalContent/SmartfrenPromo_id.html'),
  imagePromoEN: result(state, 'config.attention.urlSmartfrenPromo.url_en', 'http://www.banksinarmas.com/PersonalBanking/externalContent/SmartfrenPromo_en.html'),
  currentLanguage: result(state, 'currentLanguage.id', ''),
});
 
const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (route, params) => {
    dispatch(cameraPermissionSelfie(route, params));
  },
});

class TermSmartPromoPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    imagePromoID: PropTypes.string,
    imagePromoEN: PropTypes.string,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
  }

  onFinalizeForm = () => {
    const {goToNextPage} = this.props;
    goToNextPage('IdentityForm', {savingType: {value: 'Smartfren Promo'}});
  }

  render () {
    const {imagePromoID, imagePromoEN, currentLanguage} = this.props;
    return (
      <AboutSmartPromocomponent onFinalizeForm={this.onFinalizeForm}
        imagePromoEN={imagePromoEN} imagePromoID={imagePromoID} currentLanguage={currentLanguage}
      />
    );
  }
}

const ConnectedIntroductionPage = connect(mapStateToProps, mapDispatchToProps)(TermSmartPromoPage);
export default ConnectedIntroductionPage;
