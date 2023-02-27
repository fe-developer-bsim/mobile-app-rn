import React, {Component} from 'react';
import DetailSplitBillMenu from '../../components/SplitBillJourney/DetailSplitBillMenu.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import {editStatusDetail, requestBill, reminderBill, downloadReceiptBill, checkReceipt} from '../../state/thunks/splitBill.thunks';
import * as actionCreators from '../../state/actions/index.actions.js';
import {isEmpty} from 'lodash';
import {formatMobileNumberEmoney} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  getListSender: result(state, 'splitBillBySender', {}),
  saveReceivers: result(state, 'saveStatusSplitBill', ''),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  checkReceiptInvoice: result(state, 'checkReceipt', {}),
});

const mapDispatchToProps = (dispatch) => ({
  editStatus: (valueDetail) => dispatch(editStatusDetail(valueDetail)),
  request: (valueDetail) => {
    dispatch(requestBill(valueDetail));
  },
  reminder: (valueDetail) => {
    dispatch(reminderBill(valueDetail));
  },
  downloadReceipt: (data) => () => {
    dispatch(downloadReceiptBill(data));
  },
  checkReceipt: (data) => dispatch(checkReceipt(data)),
  dispatch
});

class DetailSplitBillMenuPage extends Component {

  static propTypes = {
    getListSender: PropTypes.object,
    navigation: PropTypes.object,
    editStatus: PropTypes.func,
    request: PropTypes.func,
    reminder: PropTypes.func,
    dispatch: PropTypes.func,
    downloadReceipt: PropTypes.func,
    saveReceivers: PropTypes.object,
    currentLanguage: PropTypes.string,
    checkReceipt: PropTypes.func,
    checkReceiptInvoice: PropTypes.object
  }

  state = {
    getListSender: {},
    saveReceivers: {},
  }

  componentDidMount () {
    const {dispatch, navigation} = this.props;
    const data = result(navigation, 'state.params', {});
    const receivers = result(data, 'Receivers', '');
    dispatch(actionCreators.saveStatus(receivers));
    this.props.checkReceipt(data); 
  }

  editStatusMember = (valueDetail) => {
    const {editStatus} = this.props;
    editStatus(valueDetail);
  }

  reminderMember = (valueDetail) => {
    const {reminder} = this.props;
    reminder(valueDetail);
  }

  requestMember = (valueDetail) => {
    const {request} = this.props;
    request(valueDetail);
  }

  render () {
    const {getListSender, navigation, dispatch, downloadReceipt, saveReceivers, currentLanguage, checkReceiptInvoice} = this.props;
    const data = result(navigation, 'state.params', {});
    const dataUserNormal = formatMobileNumberEmoney(result(data, 'dataUser.userMobileNumber', ''));
    const dataUserPhoneNumber = result(getListSender, 'res.data.uMobileNumber', '');
    const dataUser = !isEmpty(dataUserNormal) ? dataUserNormal : dataUserPhoneNumber;
    return (
      <DetailSplitBillMenu 
        onChangeTab={this._onChangeTab}
        activeTab={this.state.activeTab}
        setCarouselReferenceFor={this._setCarouselReferenceFor}
        getListSender={getListSender}
        navigation={navigation}
        editStatusMember={this.editStatusMember}
        data={data}
        requestMember={this.requestMember}
        reminderMember={this.reminderMember}
        dispatch={dispatch}
        downloadReceipt={downloadReceipt}
        saveReceivers={saveReceivers}
        dataUser={dataUser}
        currentLanguage={currentLanguage}
        checkReceiptInvoice={checkReceiptInvoice}
      />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailSplitBillMenuPage);
