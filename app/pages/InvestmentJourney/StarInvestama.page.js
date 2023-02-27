import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarInvestama from '../../components/InvestmentJourney/StarInvestama.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import find from 'lodash/find';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';
import * as actionCreators from '../../state/actions/index.actions';
import {goToTopupPageStarInvestama} from '../../state/thunks/dashboard.thunks';
import {reduxForm, change} from 'redux-form';

const formConfig = {
  form: 'PolicyNumberStar',
  destroyOnUnmount: false,
};

const StarInvestamaDetail = reduxForm(formConfig)(StarInvestama);

const mapStateToProps = (state) => ({
  inquiryData: result(state, 'inquiryStarInvestama', {}),
  nav: result(state, 'nav', {}),
  config: result(state, 'config', {})
});

const mapDispatchToProps = (dispatch) => ({
  goToEmF: (summaryDetail, infoPolis) => {
    dispatch(NavigationActions.navigate({routeName: 'InquirySilEmFundScreen', params: {summaryDetail, infoPolis}}));
  },
  showAlert: (infoPolis) => {
    const nick = infoPolis.pemegangPolis.split(' ', 1);
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: 'Hi ' + nick + ',',
      text: language.INQUIRY__SIL_EM_FUND_ERROR,
      button1: language.ONBOARDING__OKAY,
      onButton1Press: hideAlert,
      onClose: hideAlert,
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  },
  goToTopUp: (summaryDetail, infoPolis) => {
    dispatch(goToTopupPageStarInvestama(summaryDetail, infoPolis));
  },
  prefilledNoPolis: (noPolicy) => {
    dispatch(change('PolicyNumberStar', 'nomorPolis', noPolicy));
  },
  
});

class StarInvestamaPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    inquiryData: PropTypes.array,
    goToEmF: PropTypes.func,
    showAlert: PropTypes.func,
    config: PropTypes.object,
    goToTopUp: PropTypes.func,
    prefilledNoPolis: PropTypes.func
  }

  state = {
    infoPolis: {},
    summaryPolis: {},
    nomorPolis: {},
  }

  goToEmFund = (summaryDetail, infoPolis) => () => {
    if (infoPolis.maxWithdrawal > 1000000 && infoPolis.maxWithdrawal !== 0) {
      this.props.goToEmF(summaryDetail, infoPolis);
    } else {
      this.props.showAlert(infoPolis);
    }
  }

  goTopUp = (summaryDetail, info) => {
    this.props.goToTopUp(summaryDetail, info);
  }
  

  changeData = (data) => {
    const {inquiryData} = this.props;
    const listSummary = result(inquiryData, 'listRingkasanDana.0.listRingkasanSLink', []);   
    const noPolis = result(data, 'nomorPolis', '');  
    const selectedPolis = find(listSummary, {nomorPolis: noPolis});
    this.setState({infoPolis: data, summaryPolis: selectedPolis});
  }

  componentWillMount () {
    const {inquiryData, prefilledNoPolis} = this.props;    
    const listInfoPolis = result(inquiryData, 'listInformasiPolis.0', {});
    const listSummary = result(inquiryData, 'listRingkasanDana.0.listRingkasanSLink.0', {});    
    const listnomorPolis = result(inquiryData, 'listInformasiPolis', []);
    prefilledNoPolis(listInfoPolis);
    this.setState({infoPolis: listInfoPolis, summaryPolis: listSummary, nomorPolis: listnomorPolis});
  }
  
  render () {
    const {navigation = {}, inquiryData, config} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const emFundEnabled = result(config, 'flag.flagEmergencyFund', 'INACTIVE') === 'ACTIVE';
    const starFlag = result(config, 'flag.starInvestamaPrivilege', []);
    return <StarInvestamaDetail 
      navParams={navParams} 
      inquiryData={inquiryData} 
      changeData={this.changeData}
      infoPolis={this.state.infoPolis} 
      summaryPolis={this.state.summaryPolis}
      goToEmFund={this.goToEmFund}
      emFundEnabled={emFundEnabled}
      starFlag={starFlag}
      goTopUp={this.goTopUp}
      nomorPolis={this.state.nomorPolis}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StarInvestamaPage);
