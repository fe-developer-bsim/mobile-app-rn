import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CurrentSectionFormPage from '../../components/DigitalAccountOpening/CurrentSectionForm.component';
import {connect} from 'react-redux';
import {result} from 'lodash';
import {getChoosenPage, commitRegistrationData} from '../../state/thunks/digitalAccountOpening.thunks';
import {saveNewOnboarding} from '../../state/actions/index.actions';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  currentSection: result(state, 'currentSection', []),
  isNewOnboarding: result(state, 'newOnboarding', ''),
});

const mapDispatchToProps = (dispatch) => ({
  getChoosenPage: (item) => () => dispatch(getChoosenPage(item)),
  submitData: () => dispatch(commitRegistrationData()),
  clearOnboardingFlag: () => dispatch(saveNewOnboarding('no'))
});

class CurrentSectionForm extends Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    currentSection: PropTypes.array,
    getChoosenPage: PropTypes.func,
    submitData: PropTypes.func,
    clearOnboardingFlag: PropTypes.func,
    isNewOnboarding: PropTypes.string
  }

  componentWillMount () {
    const {isNewOnboarding, clearOnboardingFlag} = this.props;
    if (isNewOnboarding === 'yes') {
      clearOnboardingFlag();
    }
  }

  render () {
    const {currentLanguage, currentSection, getChoosenPage, submitData} = this.props;
    return (
      <CurrentSectionFormPage
        submitData={submitData}
        currentLanguage={currentLanguage}
        currentSection={currentSection}
        getChoosenPage={getChoosenPage}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSectionForm);