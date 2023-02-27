import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './tabYouBill.component.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SwipeRow} from 'react-native-swipe-list-view';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import {result, map, sortBy, filter, isEmpty} from 'lodash';
import {currencyFormatter} from '../../utils/transformer.util';
import moment from 'moment';
import NoSplitBill from '../../assets/images/no_split_bill.png';

class YouBill extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    onDeleteClick: PropTypes.func,
    getListSender: PropTypes.object,
    detailSplitBillMenu: PropTypes.func,
    dataUser: PropTypes.object,
    goDeleteYouBill: PropTypes.func,
    currentLanguage: PropTypes.object,
  }
  constructor (props) {
    super(props);
    this.rowRef = [];
  }

  collectRowRefs = (ref) => {
    this.rowRef.push(ref);
  };
  godetailSplitBillMenu = (valueCombaine) => {
    const {detailSplitBillMenu} = this.props;
    detailSplitBillMenu(valueCombaine);
  }
  deleteYouBill = (value) => () => {
    const {goDeleteYouBill} = this.props;
    goDeleteYouBill(value);
    this.rowRef.map((val) => {
      if (val === null) {
        this.rowRef.push(val);
      } else {
        val.closeRow();
      }
    });
  }
  
  render () {
    const {getListSender, detailSplitBillMenu, dataUser = {}, currentLanguage} = this.props;
    const data = result(getListSender, 'res.data', '');
    const {InvoiceList = {}} = data;
    const sortingData = sortBy(InvoiceList, 'transactionDate');
    const allPaid = filter(sortingData, (data) => data.status === 'Fully Paid');
    const notPaid = filter(sortingData, (data) => data.status !== 'Fully Paid');
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
              map(allPaid, (value, k) => {
                const totalAmount = result(value, 'totalAmount', '');
                const description = result(value, 'description', '');
                const transactionDate = result(value, 'transactionDate', '');
                const trxDate = languageFormat === 'en' ? moment(transactionDate).format('MMMM Do, YYYY') : moment(transactionDate).format('DD MMMM YYYY');
                const getStatus = result(value, 'status', '');
                const status = getStatus === 'Fully Paid' ? language.SPLITBILL__STATUS_FULLY_PAID : getStatus === 'Fail' ? language.SPLITBILL__STATUS_FAIL : getStatus === 'Pending' ? language.SPLITBILL__STATUS_PENDING : getStatus === 'Partially Paid' ? language.SPLITBILL__STATUS_PARTIALLY_PAID : language.SPLITBILL__STATUS_DECLINED;
                const valueCombaine = {...value, dataUser};
                return (
                  <View key={k}> 
                    <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} ref={this.collectRowRefs} rightOpenValue={-80} stopRightSwipe={-80}>
                      <View style={styles.boxContainerDeleteFully}>
                        <Touchable onPress={this.deleteYouBill(value)}>
                          <View style={styles.trashPaid}>
                            <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
                            <Text style={styles.whiteIcon}>{language.SPLITBILL__DELETE}</Text>
                          </View>
                        </Touchable>
                      </View>
                      <Touchable onPress={detailSplitBillMenu(valueCombaine)}>
                        <View style={styles.boxContainer}>
                          <View style={styles.rowColumn}>
                            <Text style={styles.amountText}>Rp {currencyFormatter(totalAmount)}</Text>
                            <View style={styles.statusFullyPaidText}>
                              <Text style={styles.aprovedTextColorPaid}>{status}</Text>
                            </View>
                          </View>
                          <Text style={styles.productText}>{description}</Text>
                          <View style={styles.rowColumn}>
                            <Text style={styles.dateText}>{trxDate}</Text>
                            <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                          </View>              
                          <Text style={styles.dateText}>{language.SPLITBILL_INFO_REMOVE_LIST_YOUBILL}</Text>
                        </View>
                      </Touchable>
                    </SwipeRow>
                  </View>
                );
              }
              )
          }
          {
            map(notPaid, (value, k) => {
              const totalAmount = result(value, 'totalAmount', '');
              const description = result(value, 'description', '');
              const transactionDate = result(value, 'transactionDate', '');
              const trxDate = languageFormat === 'en' ? moment(transactionDate).format('MMMM Do, YYYY') : moment(transactionDate).format('DD MMMM YYYY');
              const getStatus = result(value, 'status', '');
              const status = getStatus === 'Fully Paid' ? language.SPLITBILL__STATUS_FULLY_PAID : getStatus === 'Fail' ? language.SPLITBILL__STATUS_FAIL : getStatus === 'Pending' ? language.SPLITBILL__STATUS_PENDING : getStatus === 'Partially Paid' ? language.SPLITBILL__STATUS_PARTIALLY_PAID : language.SPLITBILL__STATUS_DECLINED;
              const valueCombaine = {...value, dataUser};
              return (
                <View key={k}> 
                  <SwipeRow swipeToOpenPercent={10} disableRightSwipe={true} ref={this.collectRowRefs} rightOpenValue={-80} stopRightSwipe={-80}>
                    <View style={styles.boxContainerDelete}>
                      <Touchable onPress={this.deleteYouBill(value)}>
                        <View style={styles.trash}>
                          <SimasIcon name='trash' style={styles.whiteIcon} size={24}/>
                          <Text style={styles.whiteIcon}>{language.SPLITBILL__DELETE}</Text>
                        </View>
                      </Touchable>
                    </View>
                    <Touchable onPress={detailSplitBillMenu(valueCombaine)}>
                      <View style={styles.boxContainer}>
                        <View style={styles.rowColumn}>
                          <Text style={styles.amountText}>Rp {currencyFormatter(totalAmount)}</Text>
                          <View style={getStatus === 'Fail' ? styles.statusFailText : getStatus === 'Partially Paid' ? styles.statusPartiallyPaidText : getStatus === 'Pending' ? styles.statusPendingText : styles.statusRejectText}>
                            <Text style={getStatus === 'Partially Paid' ? styles.PartiallyTextColor : styles.aprovedTextColor}>{status}</Text>
                          </View>
                        </View>
                        <Text style={styles.productText}>{description}</Text>
                        <View style={styles.rowColumn}>
                          <Text style={styles.dateText}>{trxDate}</Text>
                          <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
                        </View>
                      </View>
                    </Touchable>
                  </SwipeRow>
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

export default YouBill;