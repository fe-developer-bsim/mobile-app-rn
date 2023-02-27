import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionSaving from '../../components/ProductOptions/SavingTnC.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {openSavingAccount} from '../../state/thunks/savingAccount.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  nav: result(state, 'nav', {}),
  ccCode: result(state, 'ccCode', ''),
  urlTNCID: result(state, 'savingData.productTnCID', ''),
  urlTNCEN: result(state, 'savingData.productTnCEN', ''),
  urlOramiEN: result(state, 'config.attention.urlSimobiTnCSavingOramiEn', ''),
  urlOramiID: result(state, 'config.attention.urlSimobiTnCSavingOramiIn', ''),
});

const mapDispatchToProps = (dispatch) => ({
  goToNextPage: (nav) => () => dispatch(openSavingAccount(nav)),
});


class TermIndigoPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    nav: PropTypes.object,
    ccCode: PropTypes.string,
    urlTNCID: PropTypes.string,
    urlTNCEN: PropTypes.string,
    urlOramiEN: PropTypes.string,
    urlOramiID: PropTypes.string
  }

  render () {
    const {currentLanguage, goToNextPage, nav, ccCode, urlOramiEN, urlOramiID, urlTNCID, urlTNCEN} = this.props;
    const urlID = ccCode === 'SAO-SIMOBI-002' ? urlOramiID : urlTNCID;
    const urlEN = ccCode === 'SAO-SIMOBI-002' ? urlOramiEN : urlTNCEN;

    return (
      <TermConditionSaving
        onFinalizeForm={this.onFinalizeForm}
        urlTNCID={urlID}
        urlTNCEN={urlEN}
        currentLanguage={currentLanguage}
        goToNextPage={goToNextPage}
        nav={nav}
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(TermIndigoPage);
export default ConnectedForm;
