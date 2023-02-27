import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PushNotifInbox from '../../components/Home/PushNotifInbox.component';
import {getInbox} from '../../state/thunks/dashboard.thunks';
import {tokenPaymentDeeplink} from '../../state/thunks/common.thunks';
import sortBy from 'lodash/sortBy';
import {gotoYouOweDetailDeepLink, gotoYouBillDetailDeeplink, gotoNKYCDeeplink} from '../../state/thunks/splitBill.thunks'; 

const mapDispatchToProps = (dispatch) => ({
  getInbox: (nextData) => dispatch(getInbox(nextData)),
  tokenPayment: (token) => dispatch(tokenPaymentDeeplink(token)),
  tokenPaymentSplitBill: (token, activation,  isInbox = true) => {
    dispatch(gotoYouOweDetailDeepLink(token, activation, isInbox));
  },
  tokenPaymentNKYC: (token, activation) => {
    dispatch(gotoNKYCDeeplink(token, activation));
  },
  tokenPaymentSplitBillUser: (token, activation, isInbox = true) => {
    dispatch(gotoYouBillDetailDeeplink(token, activation, isInbox));
  },
});

const mapStateToProps = (state) => ({
  pushNotifList: result(state, 'pushNotif'),
});

class PushNotifInboxPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getInbox: PropTypes.func,
    pushNotifList: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    paramsData: PropTypes.array,
    goToPushBilling: PropTypes.func,
    tokenPayment: PropTypes.func,
    tokenPaymentNKYC: PropTypes.func,
    tokenPaymentSplitBill: PropTypes.func,
    tokenPaymentSplitBillUser: PropTypes.func,
  };

  componentDidMount () {
    const {getInbox, navigation} = this.props;
    const nextPage = null;
    const pushNotifList = null;
    const paramsData = result(navigation, 'state.params.data', []);
    getInbox({nextPage, paramsData, pushNotifList});
  }
    
  goToPushBilling = (token, isPushSplitBillNKYC, isPushSplitBill, isPushSplitBillUser, activation) => () => {
    if (isPushSplitBillNKYC) {
      this.props.tokenPaymentNKYC(token, activation);
    } else if (isPushSplitBill) {
      this.props.tokenPaymentSplitBill(token, activation);
    } else if (isPushSplitBillUser) {
      this.props.tokenPaymentSplitBillUser(token, activation);
    } else {
      this.props.tokenPayment(token);
    }
  }

  render () {
    const {navigation, pushNotifList, getInbox} = this.props;
    const paramsData = result(navigation, 'state.params.data', []);
    const data = result(pushNotifList, 'data', []);
    const sortingData = sortBy(data, ['test_status']);
    const nextPage = result(pushNotifList, 'next_page');
    const total = result(pushNotifList, 'total');
    return <PushNotifInbox navigation={navigation} data={data} nextPage={nextPage} sortingData={sortingData}
      getInbox={getInbox} pushNotifList={pushNotifList} total={total} paramsData={paramsData} goToPushBilling={this.goToPushBilling}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PushNotifInboxPage);
