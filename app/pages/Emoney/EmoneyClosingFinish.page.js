import React from 'react';
import PropTypes from 'prop-types';
import EmoneyClosingFinish from '../../components/EmoneyJourney/EmoneyClosingFinish.component';
import {connect} from 'react-redux';
import {closeEmoneyGoToLogin, closeEmoneyGoToIntro} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  accounts: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(closeEmoneyGoToLogin()),
  goToIntro: () => dispatch(closeEmoneyGoToIntro()),
});

class EmoneyClosingFinishPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
    goToLogin: PropTypes.func,
    goToIntro: PropTypes.func,
    accounts: PropTypes.array,
  }

  resetToLogin = () => {
    const {goToLogin} = this.props;
    goToLogin();
  }

  resetToIntro = () => {
    const {goToIntro} = this.props;
    goToIntro();
  }

  render () {
    const {accounts, currentLanguage} = this.props;
    return <EmoneyClosingFinish
      resetToLogin={this.resetToLogin}
      resetToIntro={this.resetToIntro}
      accounts={accounts}
      restartApp={this.restartApp}
      currentLanguage={currentLanguage}
      {...this.props}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyClosingFinishPage);
