import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmallCgv from '../../components/Emall/EmallCgv.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';
import {triggerAuthNavigate} from '../../state/thunks/common.thunks';
import forEach from 'lodash/forEach';
import {getConfirmInfo, getCgvResult} from '../../state/thunks/cgv.thunks';
import {toLandingEmall} from '../../state/thunks/onboarding.thunks';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'), 
  simasPoin: result(state, 'simasPoin', {}),
  cgvCoupon: result(state, 'cgvCoupon', {}),
  cgvConfig: result(state, 'config.CGVConfig', {}),
});

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (defaultAmount, params) => dispatch(triggerAuthNavigate('CGVPayment', defaultAmount, true, 'AuthDashboard', params)),
  getResult: (navData, seatData, isUseSimas) => dispatch(getCgvResult(navData, seatData, isUseSimas)),
  getConfirmInfo: (navData, seatData) => dispatch(getConfirmInfo(navData, seatData)),
  goLanding: () => dispatch(toLandingEmall()),
});

class EmallCgvPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    simasPoin: PropTypes.object,
    getConfirmSimas: PropTypes.func,
    cgvCoupon: PropTypes.object,
    cgvConfig: PropTypes.object,
    triggerAuth: PropTypes.func,
    goTrigger: PropTypes.func,
    getResult: PropTypes.func,
    getConfirmInfo: PropTypes.func,
    goLanding: PropTypes.func,
  };

  render () {
    const {navigation, accounts, simasPoin, getConfirmSimas, getConfirmInfo, cgvCoupon, cgvConfig, triggerAuth, getResult, goLanding} = this.props;
    const seatData = result(navigation, 'state.params.seatData', {});
    const locData = result(seatData, 'seatData.paymentSeatInfoList', []);
    const priceData = result(seatData, 'seatData.priceData', []);
    let paymentSeatInfoList = [];
    forEach(priceData, (value) => {
      forEach(locData, (val) => {
        if (value.seatGradeCode === val.seatGradeCode) {
          paymentSeatInfoList = [...paymentSeatInfoList, {'seatLocationNumber': val.seatLocationNumber, 'seatGradeCode': value.seatGradeCode, 'standardPrice': value.standardPrice, 'salesPrice': value.salesPrice, 'ticketIssueAmount': value.ticketIssueAmount, 'showingAmount': value.showingAmount, 'serviceAmount': value.serviceAmount}];
        }
      });
    });
    return <EmallCgv navigation={navigation} accounts={accounts} cgvCoupon={cgvCoupon} triggerAuth={triggerAuth}
      simasPoin={simasPoin} getResult={getResult} getConfirmSimas={getConfirmSimas} getConfirmInfo={getConfirmInfo}
      goLanding={goLanding} cgvConfig={cgvConfig} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallCgvPage);

