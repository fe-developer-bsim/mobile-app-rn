import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from 'react-native';
import styles from './DetailSplitBillMenu.styles';
import {currencyFormatter, formatMobileNumberEmoney} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {SwipeRow} from 'react-native-swipe-list-view';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {result, isEmpty, sortBy, capitalize, startCase} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class DetailSplitBillMenu extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onDeleteClick: PropTypes.func,
    editStatusMember: PropTypes.func,
    data: PropTypes.object,
    requestMember: PropTypes.func,
    reminderMember: PropTypes.func,
    dispatch: PropTypes.func,
    downloadReceipt: PropTypes.func,
    getListSender: PropTypes.object,
    saveReceivers: PropTypes.object,
    dataUser: PropTypes.string,
    currentLanguage: PropTypes.string,
    checkReceiptInvoice: PropTypes.object,
  }
  constructor (props) {
    super(props);
    this.rowRef = [];
  }

  collectRowRefs = (ref) => {
    this.rowRef.push(ref);
  };

  goEditStatus = (valueDetail) => () => {
    const {editStatusMember} = this.props;
    editStatusMember(valueDetail);
    this.rowRef.map((val) => {
      if (val === null) {
        this.rowRef.push(val);
      } else {
        val.closeRow();
      }
    });
  }

  goRequest = (valueDetail) => () => {
    const {requestMember} = this.props;
    requestMember(valueDetail);
    this.rowRef.map((val) => {
      if (val === null) {
        this.rowRef.push(val);
      } else {
        val.closeRow();
      }
    });
  }

  goReminder = (valueDetail) => () => {
    const {reminderMember} = this.props;
    reminderMember(valueDetail);
    this.rowRef.map((val) => {
      if (val === null) {
        this.rowRef.push(val);
      } else {
        val.closeRow();
      }
    });
  }

  renderHistory = (dataContactSelected) => {
    const {data} = this.props;
    const totalAmount = result(dataContactSelected, 'amount', '');
    const mobileNumber = formatMobileNumberEmoney(result(dataContactSelected, 'mobileNumber', ''));
    const reminderCounter = result(dataContactSelected, 'counter', 0);
    const transRefNum = result(data, 'transRefNum', '');
    const invoiceNumber = result(data, 'invoiceNumber', '');
    const nama = startCase(capitalize(result(dataContactSelected, 'nama', '')));
    const getStatus = result(dataContactSelected, 'status', '');
    const status = getStatus === 'pending' ? language.SPLITBILL__STATUS_NOT_PAID_YET : getStatus === 'reject' ? language.SPLITBILL__STATUS_DECLINED : getStatus === 'owner' ? language.SPLITBILL__STATUS_OWNER : language.SPLITBILL__STATUS_PAID;
    const valueDetail = {mobileNumber, transRefNum, getStatus, invoiceNumber, reminderCounter};
    return (
      <View>
        { getStatus === 'paid' || getStatus === 'owner' ? 
          <View style={styles.historyItem}>
            <View style={styles.leftHistory}>
              <Text style={styles.historyTitle}>{nama}</Text>
              <Text style={styles.subTitle}>{mobileNumber}</Text>
            </View>
            <View style={styles.rightHistory}>
              <Text style={styles.historyAmount}>{language.SPLITBILL__IDR} {currencyFormatter(totalAmount)}</Text>
              <View style={getStatus === 'pending' ? styles.notPaidYetText : getStatus === 'paid' || getStatus === 'owner' ? styles.succesText : styles.declineText}>
                <Text style={getStatus === 'paid' || getStatus === 'owner' ? styles.aprovedTextColorPaid : styles.aprovedTextColor}>{status}</Text>
              </View>
            </View>
          </View>
          : getStatus === 'reject' ?
            <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} rightOpenValue={-75} ref={this.collectRowRefs} stopRightSwipe={-75}>
              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 20}}>
                <Touchable onPress={this.goRequest(valueDetail)}>
                  <View style={styles.trashReject}>
                    <SimasIcon name='request' style={styles.whiteIcon} size={24}/>
                    <Text style={styles.statusTextRequest}>{language.SPLITBILL__REJECT}</Text>
                  </View>
                </Touchable>
              </View>
              <View style={styles.historyItem}>
                <View style={styles.leftHistory}>
                  <Text style={styles.historyTitle}>{nama}</Text>
                  <Text style={styles.subTitle}>{mobileNumber}</Text>
                </View>
                <View style={styles.rightHistory}>
                  <Text style={styles.historyAmount}>{language.SPLITBILL__IDR} {currencyFormatter(totalAmount)}</Text>
                  <View style={getStatus === 'pending' ? styles.notPaidYetText : getStatus === 'paid' || getStatus === 'owner' ? styles.succesText : styles.declineText}>
                    <Text style={getStatus === 'paid' || getStatus === 'owner' ? styles.aprovedTextColorPaid : styles.aprovedTextColor}>{status}</Text>
                  </View>
                </View>
              </View>
            </SwipeRow>
            :
            <SwipeRow swipeToOpenPercent={10} disableRightSwipe={false} ref={this.collectRowRefs} leftOpenValue={75} 
              rightOpenValue={-75} stopLeftSwipe={75} stopRightSwipe={-75}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}}>
                <Touchable onPress={this.goEditStatus(valueDetail)}>
                  <View style={styles.editContainer} >
                    <SimasIcon name='edit_new' style={styles.whiteIconEdit} size={24}/>
                    <Text style={styles.statusTextEdit}>{language.SPLITBILL__EDIT}</Text>
                  </View>
                </Touchable>
                <Touchable onPress={this.goReminder(valueDetail)}>
                  <View style={styles.trash} >
                    <SimasIcon name='notification' style={styles.whiteIcon} size={35}/>
                    <Text style={styles.statusText}>{language.SPLITBILL__PENDING}</Text>
                  </View>
                </Touchable>
              </View>
              <View style={styles.historyItem}>
                <View style={styles.leftHistory}>
                  <Text style={styles.historyTitle}>{nama}</Text>
                  <Text style={styles.subTitle}>{mobileNumber}</Text>
                </View>
                <View style={styles.rightHistory}>
                  <Text style={styles.historyAmount}>{language.SPLITBILL__IDR} {currencyFormatter(totalAmount)}</Text>
                  <View style={getStatus === 'pending' ? styles.notPaidYetText : getStatus === 'paid' || getStatus === 'owner' ? styles.succesText : styles.declineText}>
                    <Text style={getStatus === 'paid' || getStatus === 'owner' ? styles.aprovedTextColorPaid : styles.aprovedTextColor}>{status}</Text>
                  </View>
                </View>
              </View>
            </SwipeRow>
        }
        <View style={styles.greyLineList} />
      </View>
    );
  }

  render () {
    const {navigation, downloadReceipt, saveReceivers, dataUser, checkReceiptInvoice} = this.props;
    const data = result(navigation, 'state.params', '');
    const dataContactSelectedSort = saveReceivers;
    let listContactSelected = sortBy(dataContactSelectedSort, 'nama');
    const totalAmount = result(data, 'totalAmount', '');
    const description = result(data, 'description', '');
    listContactSelected.forEach((item, i) => {
      item.id = i + 1;
    });
    let isContactList = listContactSelected;
    isContactList.map((value) => {
      const mobileNumber = formatMobileNumberEmoney(result(value, 'mobileNumber', ''));
      if (dataUser === mobileNumber) {
        value['id'] = 0;
      }
    });
    const dataContactSelected = sortBy(isContactList, 'id');
    return (
      <View style={styles.containerPrimier}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container} extraScrollHeight={100} enableOnAndroid={true}>
          <View style={styles.backgroundColor2}/>
          <View>
            <View style={styles.containerBanner2}>
              <View style={styles.contentInnerBox}>
                <View>
                  <View style={styles.rowYouBillShare}>
                    <View style={styles.youBillTitleContainer}>
                      <Text style={styles.youBillTitleText}>{language.SPLITBILL__YOUBILL_TEXT}</Text>
                    </View>
                    {isEmpty(checkReceiptInvoice) ?
                      null
                      :
                      <View style={styles.shareContainer}>
                        <SimasIcon name={'download_ico'} style={styles.share} onPress={downloadReceipt(data)} />
                      </View>
                    }
                  </View>
                  <View style={styles.cardContainer}>
                    <View style={styles.row}>
                      <Text style={styles.valueTitle}>{language.SPLITBILL__DETAIL_INFO}</Text>
                    </View>
                    <View>
                      <Text style={styles.value}>{language.SPLITBILL__IDR_CURENCY} {currencyFormatter(totalAmount)}</Text>
                    </View>
                    <View style={styles.detailContainer}>
                      <Text style={styles.leftValue}>{description}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.historyContainer}>
              <View style={styles.historyContainerTop}>
                <Text style={styles.historyHeader}>{language.SPLITBILL__MEMBERS}</Text>
                <Text style={styles.memberLength}>{'(' + dataContactSelected.length} {language.SPLITBILL__PARTICIPANTS + ')'}</Text>
              </View>
              {
                isEmpty(dataContactSelected) ? null 
                  :
                  dataContactSelected.map(this.renderHistory)
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default DetailSplitBillMenu;