import React from 'react';
import LuckyDraw from '../../components/LuckyDraw/LuckyDrawList.component.js';
import {connect} from 'react-redux';
import noop from 'lodash/noop';
import {sendEmail, inquirySimasPoin, luckyDrawTnC, luckyDrawDetailWinner} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import PropTypes from 'prop-types';
import {LuckyDrawRedeem} from '../../utils/storage.util';
import * as actionCreators from '../../state/actions/index.actions';
import {language} from '../../config/language';
import moment from 'moment';


const mapStateToProps = (state) => {
  const serverTime = result(state, 'timeConfig.serverTime', '');
  return {
    user: result(state, 'user.profile'),
    simasPoin: state.simasPoin,
    serverTime,
    demoAccount: result(state, 'demoAccount', false)
  };
};

const mapDispatchToProps = (dispatch) => ({
  emailDrawAlert: (inputText, luckyDrawCode, luckyDrawName) => dispatch(sendEmail(inputText, luckyDrawCode, luckyDrawName)),
  luckyDrawTnC: (termNCondition) => dispatch(luckyDrawTnC(termNCondition)),
  inquirySimasPoin: () => dispatch(inquirySimasPoin()),
  dispatch: (data) => dispatch(data),
  onOfferClick: () => dispatch(luckyDrawDetailWinner()),
  showAlert: () => {
    const hideAlert = () => {
      dispatch(actionCreators.hideSinarmasAlert());
    };
    const sinarmasModalOptions = {
      heading1: language.LUCKYDRAW__PENDING,
      text: language.LUCKYDRAW__PENDING2,
      button1: language.GENERIC__OK,
      onButton1Press: hideAlert,
      onClose: hideAlert,
      closeOnTouchOutside: false
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions}));
  },
});

class LuckyDrawPage extends React.Component {

  componentWillMount () {
    this.props.inquirySimasPoin();
  }


  testStorage = (setStorage, luckyDrawCode, luckyDrawName) => {
    const {serverTime, dispatch} = this.props;
    LuckyDrawRedeem().then((res) => {
      if (res === null) {
        this.props.emailDrawAlert(luckyDrawCode, luckyDrawName);
        dispatch(setStorage(true));
      } else {
        const dateGap = new Date(result(res, 'serverTime', ''));
        const gapTime = new Date(dateGap.setDate(dateGap.getDate() + 1));
        const serverTimeNew = new Date(serverTime);
        const diff = moment(gapTime).diff(moment(serverTimeNew));
        const timeLeft = moment.duration(diff).hours();
        if (serverTimeNew < gapTime) {
          this.props.showAlert();
          dispatch(setStorage({isShow: false, timeLeft}));
        } else {
          this.props.emailDrawAlert(luckyDrawCode, luckyDrawName);
          dispatch(setStorage({isShow: true}));
        }

      }
    });
  }

  static propTypes = {
    orderData: PropTypes.array,
    getDataList: PropTypes.func,
    emailDrawAlert: PropTypes.func,
    inquirySimasPoin: PropTypes.func,
    simasPoin: PropTypes.object,
    testStorage: PropTypes.func,
    serverTime: PropTypes.string,
    dispatch: PropTypes.func,
    showAlert: PropTypes.func,
    luckyDrawTnC: PropTypes.func,
    onOfferClick: PropTypes.func,
    demoAccount: PropTypes.bool
  }

  render () {
    const {
      getDataList = noop, orderData = [],  showAlert, demoAccount, emailDrawAlert, simasPoin, serverTime, onOfferClick
    } = this.props;
    return <LuckyDraw getDataList={getDataList} orderData={orderData} demoAccount={demoAccount} emailDrawAlert={emailDrawAlert} simasPoin={simasPoin} testStorage={this.testStorage} serverTime={serverTime} showAlert={showAlert} luckyDrawTnC={luckyDrawTnC} onOfferClick={onOfferClick}/>;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LuckyDrawPage);
