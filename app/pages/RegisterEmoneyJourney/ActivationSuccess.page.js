import React from 'react';
import PropTypes from 'prop-types';
import ActSuccess from '../../components/RegisterEmoneyJourney/ActivationSuccess.component';
import {connect} from 'react-redux';
import {prepareGoDashboard} from '../../state/thunks/onboarding.thunks';
import result from 'lodash/result';

const mapStateToProps = (state) => ({
  currentLanguage: result(state, 'currentLanguage.id', ''),
  fullName: result(state, 'regisTempName', ''),
});


const mapDispatchToProps = (dispatch) => ({
  backToDashboard: () => {
    dispatch(prepareGoDashboard());
  }
});

class ActivationSuccess extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.string,
    backToDashboard: PropTypes.func,
    fullName: PropTypes.string,
  }

  goToDashboard = () => {
    const {backToDashboard} = this.props;
    backToDashboard();
  }

  render () {
   
    const {currentLanguage, fullName} = this.props;
    return (
      <ActSuccess
        goToDashboard={this.goToDashboard}
        restartApp={this.restartApp}
        currentLanguage={currentLanguage}
        fullName={fullName}
        {...this.props}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivationSuccess);

