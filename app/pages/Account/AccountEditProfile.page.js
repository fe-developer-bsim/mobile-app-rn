import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import AccountEditProfile from '../../components/Account/AccountEditProfile.component';
import {getChoosenPage, getConfirmFields} from '../../state/thunks/digitalAccountOpening.thunks';
import {generatePicture, deletePicture} from '../../state/thunks/dashboard.thunks';

const mapStateToProps = (state) => ({
  profile: result(state, 'user.profile', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  profilePicture: result(state, 'savePicture', ''),
  currentSection: result(state, 'currentSection', [])
});

const mapDispatchToProps = (dispatch) => ({
  setImageData: (data) => dispatch(generatePicture(data)),
  delImageData: () => dispatch(deletePicture()),
  getChoosenPage: (item) => () => dispatch(getChoosenPage(item)),
  getConfirmFields: () => {
    dispatch(getConfirmFields());
  }
});

class AccountEditProfilePage extends React.Component {
  static propTypes={
    profile: PropTypes.object,
    currentLanguage: PropTypes.string,
    setImageData: PropTypes.func,
    profilePicture: PropTypes.object,
    delImageData: PropTypes.func,
    getChoosenPage: PropTypes.func,
    currentSection: PropTypes.array,
    dispatch: PropTypes.func,
    getConfirmFields: PropTypes.func,
  }

  render () {
    const {profile, currentLanguage, setImageData, profilePicture, delImageData, currentSection, getChoosenPage, getConfirmFields} = this.props;
    return (
      <AccountEditProfile 
        profile={profile} 
        currentLanguage={currentLanguage} 
        setImageData={setImageData} 
        profilePicture={profilePicture} 
        delImageData={delImageData}
        getChoosenPage={getChoosenPage}
        currentSection={currentSection}
        getConfirmFields={getConfirmFields}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditProfilePage);