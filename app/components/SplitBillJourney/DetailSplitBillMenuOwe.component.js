import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text} from 'react-native';
import styles from './DetailSplitBillMenuOwe.styles';
import {currencyFormatter, normalisePhoneNumber, formatMobileNumberEmoney} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import {map, sortBy, result, noop, capitalize, startCase, isEmpty} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

class DetailSplitBillMenuOwe extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onDeleteClick: PropTypes.func,
    ownNumber: PropTypes.string,
    onNextClick: PropTypes.func,
    downloadReceipt: PropTypes.func,
    validatePay: PropTypes.bool,
    dataUser: PropTypes.string,
    dataUserViaDeepLink: PropTypes.string,
    goIsNKYC: PropTypes.bool,
    onNextNKYC: PropTypes.func,
    currentLanguage: PropTypes.string,
    checkReceiptInvoice: PropTypes.object
  }
  
  onNextClick=() => {
    const {onNextClick = noop, navigation, ownNumber, goIsNKYC, onNextNKYC} = this.props;
    let selectedData = [];
    const data = result(navigation, 'state.params', {});
    const contactList = result(data, 'Receivers', '');
    const accNumber = result(data, 'targetAccountNumber');
    const dataTransRefNum = result(data, 'transRefNum', '');
    map(contactList, (value) => {
      const getNumber = result(value, 'mobileNumber', '');
      const amount = result(value, 'amount', '');
      const newNumber = normalisePhoneNumber(getNumber);
      const mobileNumber = newNumber.substring(newNumber.length, newNumber.length - 4);
      if (mobileNumber === ownNumber) {
        const status = result(value, 'status');
        selectedData = {amount, accNumber, dataTransRefNum, status};
      }
    });
    if (goIsNKYC) {
      onNextNKYC();
    } else {
      onNextClick(selectedData);

    }
  }

  renderHistory (contactList) {
    const getNumber = formatMobileNumberEmoney(result(contactList, 'mobileNumber', ''));
    const totalAmount = result(contactList, 'amount', '');
    let nama = '';
    nama = startCase(capitalize(result(contactList, 'nama', ''))) === 'You' ? 'Anda' : startCase(capitalize(result(contactList, 'nama', '')));
    return (
      <View>
        <View style={styles.historyItem}>
          <View style={styles.leftHistory}>
            <Text style={styles.historyTitle}>{nama}</Text>
            <Text style={styles.subTitle}>{getNumber}</Text>
          </View>
          <View style={styles.rightHistory}>
            <Text style={styles.historyAmount}>{language.SPLITBILL__IDR} {currencyFormatter(totalAmount)}</Text>
          </View>
        </View>
        <View style={styles.greyLineList} />
      </View>
    );
  }

  render () {
    const {navigation, downloadReceipt, validatePay, dataUserViaDeepLink, checkReceiptInvoice} = this.props;
    const data = result(navigation, 'state.params', {});
    const contactListMember = result(data, 'Receivers', '');
    let contactListSort = sortBy(contactListMember, 'nama');
    const totalAmount = result(data, 'totalAmount', '');
    const description = result(data, 'description', '');
    contactListSort.forEach((item, i) => {
      item.id = i + 1;
    });
    let isContactList = contactListSort;
    isContactList.map((value) => {
      const mobileNumber = formatMobileNumberEmoney(result(value, 'mobileNumber', ''));
      if (dataUserViaDeepLink === mobileNumber) {
        value['nama'] = 'You';
        value['id'] = 0;
      }
    });
    const contactList = sortBy(isContactList, 'id');
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
                      <Text style={styles.youBillTitleText}>{language.SPLITBILL__YOUOWE_TEXT}</Text>
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
                <Text style={styles.memberLength}>{'(' + contactList.length} {language.SPLITBILL__PARTICIPANTS + ')'}</Text>
              </View>
              {
                contactList !== null ?
                  contactList.map(this.renderHistory)
                  : null
              }
            </View>
          </View>
          
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <SinarmasButton style={styles.buttonSpacing} onPress={this.onNextClick} disabled={validatePay}>
            <Text style={styles.nextButton}>{language.TAB_TITLE__PAY}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default DetailSplitBillMenuOwe;