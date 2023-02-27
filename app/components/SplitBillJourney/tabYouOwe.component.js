import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './tabYouOwe.component.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SwipeRow} from 'react-native-swipe-list-view';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {result, map, sortBy, capitalize, startCase, isEmpty} from 'lodash';
import {currencyFormatter, normalisePhoneNumber} from '../../utils/transformer.util';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import NoSplitBill from '../../assets/images/no_split_bill.png';

class YouOwe extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onDeleteClick: PropTypes.func,
    drawer: PropTypes.bool,
    getListReceiver: PropTypes.object,
    detailSplitBillMenuOwe: PropTypes.func,
    userMobileNumber: PropTypes.string,
    goRejectYouOwe: PropTypes.func,
    ownNumber: PropTypes.string,
    dataUser: PropTypes.object,
    currentLanguage: PropTypes.object,
    getListSender: PropTypes.object,
  }

  constructor (props) {
    super(props);
    this.rowRef = [];
  }
  collectRowRefs = (ref) => {
    this.rowRef.push(ref);
  };
  godetailSplitBillMenu = (valueCombaine) => {
    const {detailSplitBillMenuOwe} = this.props;
    detailSplitBillMenuOwe(valueCombaine);
  }

  rejectYouOwe = (selectedDataReject) => () => {
    const {goRejectYouOwe} = this.props;
    goRejectYouOwe(selectedDataReject);
    this.rowRef.map((val) => {
      if (val === null) {
        this.rowRef.push(val);
      } else {
        val.closeRow();
      }
    });
  }
  
  render () {
    const {getListReceiver, detailSplitBillMenuOwe, ownNumber, dataUser = {}, currentLanguage} = this.props;
    const data = result(getListReceiver, 'res.data', '');
    const {ListInvoice = {}} = data;
    const sortingData = sortBy(ListInvoice, 'createdDate');
    const languageFormat = result(currentLanguage, 'id', '');
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerTab} contentContainerStyle={styles.scrollContainer}>
          
          {
            isEmpty(sortingData) ? 
              <View style={styles.emptyContainer}>
                <Image style={styles.iconSize} source={NoSplitBill}/>
                <Text style={styles.amountText}>{language.SPLITBILL_EMPTY_BILL_HEADER}</Text>
                <Text style={styles.emptyExplanation}>{language.SPLITBILL_EMPTY_BILL_SUBHEAD}</Text>
              </View>
              :
              map(sortingData, (value, k) => {
                const description = result(value, 'description', '');
                const transactionDate = result(value, 'createdDate', '');
                const trxDate = languageFormat === 'en' ? moment(transactionDate).format('MMMM Do, YYYY') : moment(transactionDate).format('DD MMMM YYYY');
                const contactList = result(value, 'Receivers', '');
                const invoiceNumber = result(value, 'invoiceNumber', '');
                const createdBy = startCase(capitalize(result(value, 'createdBy', '')));
                let selectedDataReject = [];
                let getStatusYouOwe;
                let totalAmount;
                map(contactList, (valueOwe) => {
                  const getNumber = result(valueOwe, 'mobileNumber', '');
                  const newNumber = normalisePhoneNumber(getNumber);
                  const mobileNumber = newNumber.substring(newNumber.length, newNumber.length - 4);
                  if (mobileNumber === ownNumber) {
                    selectedDataReject = {getNumber, invoiceNumber};
                    getStatusYouOwe = result(valueOwe, 'status');
                    totalAmount = result(valueOwe, 'amount', '');
                  }
                });
                const status = getStatusYouOwe === 'paid' ? language.SPLITBILL__STATUS_PAID : getStatusYouOwe === 'pending' ? language.SPLITBILL__STATUS_NOT_PAID_YET : language.SPLITBILL__STATUS_DECLINED;
                const valueCombaine = {...value, dataUser};
                return (
                  <View key={k}> 
                    {getStatusYouOwe === 'pending' ?
                      <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} ref={this.collectRowRefs} rightOpenValue={-80} stopRightSwipe={-80}>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                          <Touchable onPress={this.rejectYouOwe(selectedDataReject)}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.trash} colors={styles.gradientTwoR}>
                              <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
                              <Text style={styles.whiteIcon}>{language.SPLITBILL__REJECT_YOU_OWE}</Text>                   
                            </LinearGradient>
                          </Touchable>
                        </View>
                        <Touchable onPress={detailSplitBillMenuOwe(valueCombaine)}>
                          <View style={styles.boxContainer}>
                            <View style={styles.rowColumn}>
                              <Text style={styles.amountText}>Rp {currencyFormatter(totalAmount)}</Text>
                              <View style={styles.aprovedText}>
                                <View style={getStatusYouOwe === 'paid' ? styles.statusFullyPaidText : getStatusYouOwe === 'pending' ? styles.statusPendingText : styles.statusRejectText}>
                                  <Text style={getStatusYouOwe === 'paid' ? styles.aprovedTextColorPaid : styles.aprovedTextColor}>{status}</Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.rowBilledBy}>
                              <Text style={styles.productTextBilled}>{language.SPLITBILL__BILLED_BY}</Text>
                              <Text style={styles.productTextBilledText}>{createdBy}</Text>
                            </View>
                            <Text style={styles.productText}>{description}</Text>

                            <View style={styles.rowColumn}>
                              <Text style={styles.dateText}>{trxDate}</Text>
                              <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                            </View>
                          </View>
                        </Touchable>
                      </SwipeRow>
                      :
                      <Touchable onPress={detailSplitBillMenuOwe(valueCombaine)}>
                        <View style={styles.boxContainer}>
                          <View style={styles.rowColumn}>
                            <Text style={styles.amountText}>Rp {currencyFormatter(totalAmount)}</Text>
                            <View style={styles.aprovedText}>
                              <View style={getStatusYouOwe === 'paid' ? styles.statusFullyPaidText : getStatusYouOwe === 'pending' ? styles.statusPendingText : styles.statusRejectText}>
                                <Text style={getStatusYouOwe === 'paid' ? styles.aprovedTextColorPaid : styles.aprovedTextColor}>{status}</Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.rowBilledBy}>
                            <Text style={styles.productTextBilled}>{language.SPLITBILL__BILLED_BY}</Text>
                            <Text style={styles.productTextBilledText}>{createdBy}</Text>
                          </View>
                          <Text style={styles.productText}>{description}</Text>
                          <View style={styles.rowColumn}>
                            <Text style={styles.dateText}>{trxDate}</Text>
                            <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                          </View>
                        </View>
                      </Touchable>
                    }
                  </View>
                );
              }
              )
          }
        </ScrollView>
      </View>
    );
  }
}

export default YouOwe;