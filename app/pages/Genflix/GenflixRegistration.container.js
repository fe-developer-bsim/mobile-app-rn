import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import result from 'lodash/result';
import EmailVerification from '../EmailVerification/EmailVerification.page';
import {View} from 'react-native';
import GenflixRegistrationPage from './GenflixRegistration.page';
import {GenflixInit} from '../../state/thunks/Genflix.thunk';
import {Toast} from '../../utils/RNHelpers.util.js';
import {goBack} from '../../state/thunks/common.thunks';
import {SinarmasButton} from '../../components/FormComponents';
import {language} from '../../config/language';
import {isEmptyOrNull} from '../../utils/transformer.util';
import styles from '../../components/Genflix/GenflixConfirmation.styles';
import ErrorTextIndicator from '../../components/ErrorTextIndicator/ErrorTextIndicator.component';

const mapStateToProps = (state) => ({
  initData: result(state, 'genflixData.initData', {}),
});

const mapDispatchToProps = (dispatch) => ({
  init: () => dispatch(GenflixInit()),
  goBack: () => dispatch(goBack()),
});

class GenflixRegistrationContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      renderedPage: null,
    };
  }

  componentWillMount = () => {
    this.pageInit();
  }

  pageInit = () => {
    const {init} = this.props;
    init().then(this.renderPage, this.renderErrorPage);
  }

  renderPage = (res) => {
    const {initData} = this.props;
    const email = result(initData, 'email', '');
    const params = result(res, 'params', {});
    const transactionId = result(res, 'transactionId', '');
    this.setState({renderedPage: 
      !isEmptyOrNull(email) ? 
        <GenflixRegistrationPage email={email}/> : 
        <EmailVerification params={params} transactionId={transactionId}/>});
  };
  
  renderErrorPage = (errorMsg) => {
    const {goBack} = this.props;
    Toast.show(errorMsg, Toast.LONG);
    this.setState({renderedPage: 
  <View style={styles.container}>
    <ErrorTextIndicator text={errorMsg}/>
    <View style={styles.labelSpacing}/>
    <View style={styles.row}>
      <View style={styles.buttonLeft}>
        <SinarmasButton text={language.DASHBOARD__RELOAD_ACCOUNTS} onPress={this.pageInit}/>
      </View>
      <View style={styles.buttonRight}>
        <SinarmasButton text={language.BUTTON__BACK_TO_HOME} onPress={goBack}/>
      </View>
    </View>
  </View>});
  }

  static propTypes = {
    initData: PropTypes.object,
    init: PropTypes.func,
    goBack: PropTypes.func,
  }

  render () {
    return (<View>{this.state.renderedPage}</View>); // (
  }
}

const ConnectedGenflixRegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(GenflixRegistrationContainer);

export default ConnectedGenflixRegistrationContainer;