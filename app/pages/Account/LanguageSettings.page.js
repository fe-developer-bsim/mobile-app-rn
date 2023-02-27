import React from 'react';
import PropTypes from 'prop-types';
import AccountSettings from '../../components/Account/LanguageSettings.component.js';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {setCurrentLanguage, populateOffersPrivate, resetAndNavigate} from '../../state/thunks/common.thunks';


const mapStateToProps = (state) => ({
  profile: result(state, 'user.profile', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id')
});

const mapDispatchToProps = (dispatch) => ({
  resetAndNavigateTo: (destinationRoute, params) => () => {
    dispatch(resetAndNavigate(destinationRoute, params));
  },
  changeCurrentLanguage: (languageId) => () => {
    dispatch(setCurrentLanguage(languageId));
    const isReload = true;
    dispatch(populateOffersPrivate(isReload));
  },
});

class AccountSettingsPage extends React.Component {

  static propTypes = {
    profile: PropTypes.object,
    resetAndNavigateTo: PropTypes.func,
    changeCurrentLanguage: PropTypes.func,
    currentLanguage: PropTypes.string,
  }


  render () {
    const {profile, resetAndNavigateTo, changeCurrentLanguage, currentLanguage} = this.props;
    return <AccountSettings profile={profile} resetAndNavigate={resetAndNavigateTo} changeCurrentLanguage={changeCurrentLanguage}
      currentLanguage={currentLanguage} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsPage);
