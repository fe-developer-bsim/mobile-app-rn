import React from 'react';
import PropTypes from 'prop-types';
import LoginPreference from '../../components/Profile/FingerPrintEULA.component';
import {connect} from 'react-redux';
import {changeFingerprint} from '../../state/thunks/profile.thunks';
import result from 'lodash/result';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  disclaimerFingerPrint: result(state, 'config.disclaimer.fingerPrintMessage', {}),
});
const mapDispatchToProps = (dispatch) => ({
  usingFingerprintUpdate: (usingFingerprint, isSearch) => dispatch(changeFingerprint(usingFingerprint, isSearch)),
});
class LoginPreferencePage extends React.Component {
  static propTypes = {
    usingFingerprintUpdate: PropTypes.func,
    navigation: PropTypes.object,
    disclaimerFingerPrint: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  updateFingerSetting = () => {
    const {usingFingerprintUpdate, navigation} = this.props;
    const usingFingerprint = result(navigation, 'state.params.usingFingerprint', '');
    const isSearch = result(navigation, 'state.params.isSearch', false);
    usingFingerprintUpdate(usingFingerprint, isSearch);
  }

  render () {
    const {currentLanguage, disclaimerFingerPrint, navigation} = this.props;
    const isSearch = result(navigation, 'state.params.isSearch', false);
    return <LoginPreference
      updateFingerSetting={this.updateFingerSetting}
      restartApp={this.restartApp}
      disclaimerFingerPrint={disclaimerFingerPrint}
      currentLanguage={currentLanguage}
      isSearch={isSearch}
      {...this.props}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPreferencePage);
