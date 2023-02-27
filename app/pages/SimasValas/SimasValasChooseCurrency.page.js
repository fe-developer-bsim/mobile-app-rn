import React from 'react';
import PropTypes from 'prop-types';
import SimasValasChooseCurrencyComponent from '../../components/SimasValas/SimasValasChooseCurrency.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {getSavingValasAUD, getSavingValasCNY, getSavingValasUSD, getSavingValasEUR, getSavingValasSGD, getSavingValasNZD} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  productItems: result(state, 'productItems', {}),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  config: result(state, 'config', {}),
});

const mapDispatchToProps = (dispatch) => ({
  goToTnCvalasAUD: () => dispatch(getSavingValasAUD()),
  goToTnCvalasCNY: () => dispatch(getSavingValasCNY()),
  goToTnCvalasUSD: () => dispatch(getSavingValasUSD()),
  goToTnCvalasEUR: () => dispatch(getSavingValasEUR()),
  goToTnCvalasSGD: () => dispatch(getSavingValasSGD()),
  goToTnCvalasNZD: () => dispatch(getSavingValasNZD()),
});

class SimasValasChooseCurrency extends React.Component {

  static propTypes = {
    goToTnCvalasAUD: PropTypes.func,
    goToTnCvalasCNY: PropTypes.func,
    goToTnCvalasUSD: PropTypes.func,
    goToTnCvalasEUR: PropTypes.func,
    goToTnCvalasSGD: PropTypes.func,
    navigation: PropTypes.object,
    goToTnCvalasNZD: PropTypes.func,
  }

  render () {
    const {navigation, goToTnCvalasAUD, goToTnCvalasCNY, goToTnCvalasUSD, goToTnCvalasEUR, goToTnCvalasSGD, goToTnCvalasNZD} = this.props;
    const cardInactive = result(navigation, 'state.params', {});
    const data = result(cardInactive, 'data', []);
    return <SimasValasChooseCurrencyComponent
      navigation={navigation}
      cardInactive={cardInactive}
      data={data}
      goToTnCvalasAUD={goToTnCvalasAUD}
      goToTnCvalasCNY={goToTnCvalasCNY}
      goToTnCvalasUSD={goToTnCvalasUSD}
      goToTnCvalasEUR={goToTnCvalasEUR}
      goToTnCvalasSGD={goToTnCvalasSGD}
      goToTnCvalasNZD={goToTnCvalasNZD}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SimasValasChooseCurrency);
