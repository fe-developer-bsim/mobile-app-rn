import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionProgram from '../../components/OnboardingJourney/UltraVoucherTnc.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {checklistUnipin} from '../../state/thunks/digitalStore.thunks';
import {storageKeys, set, get} from '../../utils/storage.util';

const mapStateToProps = (state) => ({
  unipinTncUrlEn: result(state, 'config.attention.urlSimobiTnCUnipinEn', ''),
  unipinTncUrlId: result(state, 'config.attention.urlSimobiTnCUnipinIn', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  isLockedDevice: Boolean(result(state, 'appInitKeys', {}) && result(state, 'appInitKeys.username', {}) && result(state, 'appInitKeys.tokenClient', {}) && result(state, 'appInitKeys.tokenServer', {})),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getUnipinTncStatus: () => get(storageKeys['TNC_UNIPIN']),
  goToNextPage: () => () => {
    const tncChecklist = false;
    const navigation = result(ownProps, 'navigation', {});
    set(storageKeys['TNC_UNIPIN'], tncChecklist);
    dispatch(checklistUnipin(true, navigation));
  },
});


class TermProgramPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    nav: PropTypes.object,
    isLockedDevice: PropTypes.bool,
    getUnipinTncStatus: PropTypes.func,
    unipinTncUrlId: PropTypes.string,
    unipinTncUrlEn: PropTypes.string,
  }

  state = {
    feedbackChecklist: false
  }

  componentWillMount () {
    const {getUnipinTncStatus} = this.props;
    set(storageKeys['TNC_UNIPIN'], true);
    getUnipinTncStatus().then((res) => {
      this.setState({
        feedbackChecklist: res,
      });
    });
  }

  render () {
    const {currentLanguage, nav, unipinTncUrlEn, unipinTncUrlId, isLockedDevice, goToNextPage} = this.props;
    const url = currentLanguage === 'en' ? unipinTncUrlEn : unipinTncUrlId;
    const {feedbackChecklist} = this.state;
    return (
      <TermConditionProgram
        onFinalizeForm={this.onFinalizeForm}
        goToNextPage={goToNextPage}
        nav={nav}
        url={url}
        feedbackChecklist={feedbackChecklist}
        isLockedDevice={isLockedDevice}
      />
    );
  }
}
const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(TermProgramPage);
export default ConnectedForm;