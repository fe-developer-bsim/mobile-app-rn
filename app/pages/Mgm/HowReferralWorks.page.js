import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HowReferralWorksComponent from '../../components/Mgm/HowReferralWorks.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';


const mapStateToProps = (state) => ({
  ccCode: result(state, 'ccCode', ''),
  config: result(state, 'config', {}),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  
});

const mapDispatchToProps = (dispatch) => ({
  backClose: () => {
    dispatch(NavigationActions.back());
  },
});

class HowReferralWorksPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    goToNextPage: PropTypes.func,
    backClose: PropTypes.func,
    currentLanguage: PropTypes.string,
    ccCode: PropTypes.string,
  }
  onBackPage = () => {
    this.props.backClose();
  }

  render () {
    const {goToNextPage, currentLanguage} = this.props;
  
    return <HowReferralWorksComponent
      goToNextPage={goToNextPage}
      onBackPage={this.onBackPage}
      currentLanguage={currentLanguage}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowReferralWorksPage);