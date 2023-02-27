import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEditProfile from '../../components/Account/ConfirmEditProfile.component';
import {result} from 'lodash';
import {verificationPopUp, commitConfirmEditProfile} from '../../state/thunks/digitalAccountOpening.thunks';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  confirmFields: result(state, 'confirmFields.fields', []),
  isSensitive: result(state, 'confirmFields.isSensitive', false),
  isAdvanceAI: result(state, 'confirmFields.isAdvanceAI', false)
});

const mapDispatchToProps = (dispatch) => ({
  verificationPopUp: (isAdvanceAI) => {
    dispatch(verificationPopUp(isAdvanceAI));
  },
  triggerAuth: (params) => dispatch(triggerAuthNavigate('pengkinianData', 0, true, 'ConfirmationAuth', params)),
  commitData: () => {       
    dispatch(commitConfirmEditProfile());
  }
});

class ConfirmEditProfilePage extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    confirmFields: PropTypes.array,
    verificationPopUp: PropTypes.func,
    isSensitive: PropTypes.bool,
    triggerAuth: PropTypes.func,
    commitData: PropTypes.func,
    navigation: PropTypes.object,
    isAdvanceAI: PropTypes.bool
  }

  checkIsSensitive = () => {
    const {isSensitive, triggerAuth, commitData, verificationPopUp, isAdvanceAI} = this.props;
    if (isSensitive) {
      verificationPopUp(isAdvanceAI); 
    } else {
      const params = {onSubmit: commitData, amount: 0, isOtp: false};
      triggerAuth(params);
    }
  }

  render () {
    const {currentLanguage, confirmFields, verificationPopUp, isSensitive, navigation} = this.props;
    const status = result(navigation, 'state.params.status', '');

    return (
      <ConfirmEditProfile
        currentLanguage={currentLanguage}
        confirmFields={confirmFields}
        verificationPopUp={verificationPopUp}
        isSensitive={isSensitive}
        checkIsSensitive={this.checkIsSensitive}
        status = {status}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEditProfilePage);