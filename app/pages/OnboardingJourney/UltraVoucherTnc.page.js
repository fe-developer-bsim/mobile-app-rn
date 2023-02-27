import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionProgram from '../../components/OnboardingJourney/UltraVoucherTnc.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {shouldGiveChecklistSimasCatalog} from '../../state/thunks/digitalStore.thunks';
import {storageKeys, set, get} from '../../utils/storage.util';

const mapStateToProps = (state) => ({
  ultraVoucherTncUrlEn: result(state, 'config.attention.urlSimobiTnCUltraVoucherIn', ''),
  ultraVoucherTncUrlId: result(state, 'config.attention.urlSimobiTnCUltraVoucherIn', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  isLockedDevice: Boolean(result(state, 'appInitKeys', {}) && result(state, 'appInitKeys.username', {}) && result(state, 'appInitKeys.tokenClient', {}) && result(state, 'appInitKeys.tokenServer', {})),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getUltraVoucherTnc: () => get(storageKeys['FEEDBACK_CHECKLIST_CATALOG']),
  goToNextPage: () => () => {
    const feedbackChecklist = false;
    const navigation = result(ownProps, 'navigation', {});
    set(storageKeys['FEEDBACK_CHECKLIST_CATALOG'], feedbackChecklist);
    dispatch(shouldGiveChecklistSimasCatalog(true, navigation));
  },
});


class TermProgramPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToNextPage: PropTypes.func,
    nav: PropTypes.object,
    item: PropTypes.string,
    alfacartTncUrlEn: PropTypes.string,
    alfacartTnCUrlId: PropTypes.string,
    isLockedDevice: PropTypes.bool,
    feedbackChecklist: PropTypes.bool,
    goToNextPageNLD: PropTypes.func,
    getUltraVoucherTnc: PropTypes.func,
    ultraVoucherTncUrlId: PropTypes.string,
    ultraVoucherTncUrlEn: PropTypes.string,
  }

  state = {
    feedbackChecklist: false
  }

  componentWillMount () {
    const {getUltraVoucherTnc} = this.props;
    set(storageKeys['FEEDBACK_CHECKLIST_CATALOG'], true);
    getUltraVoucherTnc().then((res) => {
      this.setState({
        feedbackChecklist: res,
      });
    });
  }

  render () {
    const {currentLanguage, nav, ultraVoucherTncUrlEn, ultraVoucherTncUrlId, isLockedDevice, goToNextPage} = this.props;
    const url = currentLanguage === 'en' ? ultraVoucherTncUrlEn : ultraVoucherTncUrlId;
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