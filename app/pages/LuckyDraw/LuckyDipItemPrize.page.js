import React from 'react';
import PropTypes from 'prop-types';
import LuckyDrawItemPrize from '../../components/LuckyDraw/LuckyDipItemPrize.component';
import result from 'lodash/result';
import size from 'lodash/size';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {destroy} from 'redux-form';
import {trackingHistory} from '../../state/thunks/luckyDip.thunks';

const mapDispatchToProps = (dispatch) => ({
  openDetailorFillForm: (values, reward, shipmentID) => {
    dispatch(trackingHistory(values, reward, shipmentID));
  },
  goToEvoucherDetail: (data) => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipEvoucherDetailPage', params: {data}}));
  },
  goToFillInformationDes: (pathRoute, reward, transRefNum) => {
    dispatch(destroy('LuckyDipInformation'));
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipInformationPage', params: {pathRoute, transRefNum, reward, delayFill: true}}));
  }
});

const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class LuckyDipItemPrizePage extends React.Component {
  static propTypes = {
    openDetailorFillForm: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
    navigation: PropTypes.object,
    goToEvoucherDetail: PropTypes.func,
    goToFillInformationDes: PropTypes.func
  }

  openDetailorFillForm=(type, claimFlag, data, transRefNum) => () => {
    const {openDetailorFillForm, navigation, goToEvoucherDetail, goToFillInformationDes} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    if (type === '1' && !claimFlag) {
      const itemDetail = result(data, 'rewards.0', {});
      const fullName = result(data, 'receiverName', '');
      const streetAddress = result(data, 'alamatRumah', '');
      const subDistrict = {name: result(data, 'alamatKelurahan', '')};
      const district = {name: result(data, 'alamatKecamatan', '')};
      const city = {name: result(data, 'alamatKabupaten', '')};
      const province = {name: result(data, 'alamatProvinsi', '')};
      const phoneNumber = result(data, 'mobileNumber', '');
      const postalCode = result(data, 'alamatKodePos', '');
      const note = result(data, 'noteAddress', '');
      const shipmentID = result(data, 'shipmentID', '');
      const values = {fullName, streetAddress, subDistrict, district, city, phoneNumber, postalCode, province, note};
      openDetailorFillForm(values, itemDetail, shipmentID);
    } else if (type === '2') {
      goToEvoucherDetail(data);
    } else if (type === '1' && claimFlag) {
      const itemDetail = result(data, 'rewards.0', {});
      goToFillInformationDes(pathRoute, itemDetail, transRefNum);
    } 
  }

  render () {
    const {navigation} = this.props;
    const listPrize = result(navigation, 'state.params.listPrize', '');
    const itemSize = size(listPrize);
    return <LuckyDrawItemPrize openDetailorFillForm={this.openDetailorFillForm} itemSize={itemSize} listPrize={listPrize}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuckyDipItemPrizePage);
