import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TermConditionProgram from '../../components/OnboardingJourney/AlfacartTnc.component';
import {result} from 'lodash';
import {connect} from 'react-redux';
import {shouldGiveChecklist} from '../../state/thunks/digitalStore.thunks';
import {storageKeys, set, get} from '../../utils/storage.util';

const mapStateToProps = (state) => ({
  alfacartTncUrlEn: result(state, 'config.attention.urlSimobiTnCAlfacartEn', ''),
  alfacartTnCUrlId: result(state, 'config.attention.urlSimobiTnCAlfacartIn', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  isLockedDevice: Boolean(result(state, 'appInitKeys', {}) && result(state, 'appInitKeys.username', {}) && result(state, 'appInitKeys.tokenClient', {}) && result(state, 'appInitKeys.tokenServer', {})),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  getAlfacartTnc: () => get(storageKeys['FEEDBACK_CHECKLIST']),
  goToNextPage: () => () => {
    const feedbackChecklist = false;
    const navigation = result(ownProps, 'navigation', {});
    set(storageKeys['FEEDBACK_CHECKLIST'], feedbackChecklist);
    dispatch(shouldGiveChecklist(true, navigation));
  }
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
    getAlfacartTnc: PropTypes.func,
  }

  state = {
    feedbackChecklist: false
  }

  componentWillMount () {
    const {getAlfacartTnc} = this.props;
    set(storageKeys['FEEDBACK_CHECKLIST'], true);
    getAlfacartTnc().then((res) => {
      this.setState({
        feedbackChecklist: res,
      });
    });
  }

  render () {
    const {currentLanguage, nav, alfacartTncUrlEn, alfacartTnCUrlId, isLockedDevice, goToNextPage} = this.props;
    const url = currentLanguage === 'en' ? alfacartTncUrlEn : alfacartTnCUrlId;
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