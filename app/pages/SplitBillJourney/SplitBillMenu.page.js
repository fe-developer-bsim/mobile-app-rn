import React from 'react';
import PropTypes from 'prop-types';
import SplitBillMenuPage from '../../components/SplitBillJourney/SplitBillMenu.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {getAllOffersExcept, normalisePhoneNumber} from '../../utils/transformer.util';
import {NavigationActions} from 'react-navigation';
import find from 'lodash/find';
import {filter, isEmpty} from 'lodash';
import {goToYouBill, goToYouOwe, deleteSelectedYouBill, rejectYouOweList, goToSplitBillMenu, goToSplitBill} from '../../state/thunks/splitBill.thunks';
import {saveNewParticipants} from '../../state/actions/index.actions.js';
import * as actionCreators from '../../state/actions/index.actions';


const mapStateToProps = (state, ownProps) => {
  const offerID = result(ownProps, 'navigation.state.params.offerID');
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID});
  const offers = getAllOffersExcept(clickedOffer, allOffers);
  return {
    user: result(state, 'user.profile'),
    currentLanguage: result(state, 'currentLanguage'),
    offers,
    clickedOffer,
    isLogin: !!result(state, 'user.ipassport', ''),
    qrPromo: result(state, 'qrPromoList', []),
    merchantList: result(state, 'qrMerchantList', []),
    getListSender: result(state, 'splitBillBySender', {}),
    getListReceiver: result(state, 'splitBillByReceiver', {}),
    userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  };
};

const mapDispatchToProps = (dispatch) => ({
  createSplitBill: () => {
    dispatch(saveNewParticipants('CREATE'));
    dispatch(goToSplitBill());
  },
  isNotCreateSplitBill: (validateStatus) => () => {
    dispatch(goToSplitBillMenu(validateStatus));
  },
  getYouBill: () => dispatch(goToYouBill()),
  getYouOwe: () => dispatch(goToYouOwe()),
  detailSplitBillMenu: (data) => () => dispatch(NavigationActions.navigate({routeName: 'DetailSplitBillMenu', params: data})),
  detailSplitBillMenuOwe: (data) => () => { 
    dispatch(NavigationActions.navigate({routeName: 'DetailSplitBillMenuOwe', params: data}));
  },
  deleteYouBill: (value) => {
    dispatch(deleteSelectedYouBill(value));
  },
  rejectYouOwe: (selectedDataReject) => {
    dispatch(rejectYouOweList(selectedDataReject));
  },
  hideSpinner: () => {
    dispatch(actionCreators.hideSpinner());

  }
});

class SplitMenuPage extends React.Component {

  static propTypes = {
    createSplitBill: PropTypes.func,
    isNotCreateSplitBill: PropTypes.func,
    onChangeTab: PropTypes.func,
    getYouBill: PropTypes.func,
    getYouOwe: PropTypes.func,
    getListSender: PropTypes.object,
    detailSplitBillMenu: PropTypes.func,
    detailSplitBillMenuOwe: PropTypes.func,
    getListReceiver: PropTypes.object,
    userMobileNumber: PropTypes.string,
    ownNumber: PropTypes.string,
    deleteYouBill: PropTypes.func,
    rejectYouOwe: PropTypes.func,
    dataUser: PropTypes.object,
    currentLanguage: PropTypes.object,
    navigation: PropTypes.object,
    hideSpinner: PropTypes.func
  }

  carouselRefs = {
    youBill: null,
    youOwe: null
  }

  tabNames = ['youBill', 'youOwe'];

  state = {
    activeTab: 'youBill',
    onScan: true,
    onCode: false,
  }

  scanPressed = () => {
    const {getYouBill} = this.props;
    this.setState({onScan: true});
    this.setState({onCode: false});
    getYouBill();
  }

  codePressed = () => {
    const {getYouOwe} = this.props;
    this.setState({onScan: false});
    this.setState({onCode: true});
    getYouOwe();
  }


  _onChangeTab = ({i, from}) => {
    const {getYouBill, getYouOwe} = this.props;
    if (i === from)
      return;
    const activeTab = this.tabNames[i];
    this.setState({activeTab}, () => {
      if (activeTab === 'youBill') {
        getYouBill();    
      } else if (activeTab === 'youOwe') {
        getYouOwe();
      }
    });
  }

  componentDidMount () {
    const {getYouBill, navigation} = this.props;
    const isFromMenu = result(navigation, 'state.params.isCheckEmpty', false);
    if (!isFromMenu) {
      getYouBill();  
    }
  }

  _setCarouselReferenceFor = (refType) => (ref) => {
    this.carouselRefs[refType] = ref;
  }

  goDeleteYouBill = (value) => {
    const {deleteYouBill} = this.props;
    deleteYouBill(value);
  }
  goRejectYouOwe = (selectedDataReject) => {
    const {rejectYouOwe} = this.props;
    rejectYouOwe(selectedDataReject);
  }

  render () {
    const {createSplitBill, getListSender, detailSplitBillMenu, getListReceiver, userMobileNumber, detailSplitBillMenuOwe, deleteYouBill, isNotCreateSplitBill, currentLanguage} = this.props;
    const {onScan, onCode} = this.state;
    const listSender = result(getListSender, 'res.data.InvoiceList', '');
    const listReceiver = result(getListReceiver, 'res.data.ListInvoice', '');
    const isEmptySplitBill = isEmpty(listSender) && isEmpty(listReceiver);
    const ownNumber = userMobileNumber.substring(userMobileNumber.length, userMobileNumber.length - 4);
    const data = result(getListSender, 'res.data', '');
    const {InvoiceList = {}} = data;
    const getPending = filter(InvoiceList, {status: 'Pending'});
    const getPartiallyPaid = filter(InvoiceList, {status: 'Partially Paid'});
    const totalPending = getPending.length;
    const totalPartiallyPaid = getPartiallyPaid.length;
    const dataUMobile = normalisePhoneNumber(result(data, 'uMobileNumber', ''));
    const dataUName = result(data, 'uName', '');
    const dataUser = {userMobileNumber: dataUMobile, userName: dataUName};
    let validateStatus;
    if (totalPending + totalPartiallyPaid >= 5) {
      validateStatus = true;
    }
    return <SplitBillMenuPage 
      createSplitBill={createSplitBill} 
      onChangeTab={this._onChangeTab}
      activeTab={this.state.activeTab}
      setCarouselReferenceFor={this._setCarouselReferenceFor}
      getListSender={getListSender}
      detailSplitBillMenu={detailSplitBillMenu}
      detailSplitBillMenuOwe={detailSplitBillMenuOwe}
      getListReceiver={getListReceiver}
      userMobileNumber={userMobileNumber}
      ownNumber={ownNumber}
      deleteYouBill={deleteYouBill}
      goRejectYouOwe={this.goRejectYouOwe}
      validateStatus={validateStatus}
      isNotCreateSplitBill={isNotCreateSplitBill}
      dataUser={dataUser}
      goDeleteYouBill={this.goDeleteYouBill}
      currentLanguage={currentLanguage}
      codePressed={this.codePressed}
      scanPressed={this.scanPressed}
      onScan={onScan}
      onCode={onCode}
      isEmptySplitBill={isEmptySplitBill}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SplitMenuPage);
