import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import {buttonLargeTextStyle} from '../../styles/common.styles';
import {SinarmasButton} from '../FormComponents';
import {formatBillDetails, currencyFormatter, formatDataDetailList, getDayName} from '../../utils/transformer.util';
import map from 'lodash/map';
import {language} from '../../config/language';
import styles from './BillerTypeSevenConfirmation.style';
import result from 'lodash/result';
import truncate from 'lodash/truncate';
import TabCoupon from '../Coupon/CouponTabPurchase.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import Touchable from '../Touchable.component';
import noop from 'lodash/noop';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import Poin from '../../assets/images/poin.png';


export default class BillerTypeSevenConfirmation extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    resendBillPayOTP: PropTypes.func,
    transRefNum: PropTypes.string,
    description: PropTypes.string,
    config: PropTypes.array,
    denomination: PropTypes.object,
    isPrepaidBiller: PropTypes.bool,
    accountNo: PropTypes.object,
    biller: PropTypes.object,
    userId: PropTypes.number,
    resData: PropTypes.object,
    dataDetail: PropTypes.array,
    goToCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func,
    showFavorite: PropTypes.func,
    favoriteBill: PropTypes.string,
    removeFavorite: PropTypes.func,
    billerFavorite: PropTypes.array,
    isLogin: PropTypes.bool,
    formValues: PropTypes.object,
    isUseSimas: PropTypes.bool

  }

  state = {
    summaryCollapsed: true,
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  remove=() => {
    this.props.removeCoupon();
  }

  render () {
    const {accountNo = {}, handleSubmit, resData = {}, dataDetail = [], isUseSimas,
      biller = {}, denomination = {}, goToCoupon, couponUse, isLogin, showFavorite = noop,
      favoriteBill, removeFavorite, billerFavorite} = this.props;
    const billerName = result(biller, 'name', '');
    const billAmount =  denomination.value;
    const bills = formatBillDetails(result(resData, 'result.displayList', []));
    const dataDetailList = formatDataDetailList(dataDetail);
    const newSubtitle = truncate(couponUse, {length: '30', omission: '...'});
    const showDetailAmt = this.state.summaryCollapsed;
    const currentDate = new Date();
    const showTime = getDayName(currentDate) + ', ' + moment().format('DD MMM YYYY');
    const accNo = result(accountNo, 'accountNumber', '');
    const name = result(accountNo, 'name', '');
    const productType = result(accountNo, 'productType', '');
    const subsNumber = result(resData, 'subscriberNoInput', '');
    const isFavorite = !isEmpty(find(billerFavorite, (fav) => subsNumber === fav.subscriberNo && biller.id === fav.billerId));
    const billerNameDynatrae = 'Payment Confirmation ' + result(biller, 'name', '');
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
        <Text style={styles.titleText}>{language.GENERIC_BILLER__CONFIRMATION}</Text>
        <View style={styles.labelSpacing} />
        <View style={styles.box}>
          <View style={styles.rowBetween}>
            {
              isUseSimas ?
                <View>
                  <Image source={Poin} style={styles.poin}/>
                </View>
                :
                <View>
                  <SimasIcon name={'amount'} size={30} style={[styles.amount]}/>
                </View>
            }
            <View>
              {
                isUseSimas ?
                  <Text style={styles.amountText}>{currencyFormatter(resData.amount)}</Text>
                  :
                  <Text style={styles.amountText}>Rp {currencyFormatter(resData.amount)}</Text>
              }
            </View>
            <View>
              <SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/>
            </View>
          </View>
          <View>
            <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
              <View style={[styles.greyLine, styles.mt10]} />
              <View style={styles.row}>
                <Text style={styles.robotoLight}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                {
                  isUseSimas ?
                    <View style={styles.rowSimasPoin}>
                      <Text style={styles.robotoLight}>{currencyFormatter(resData.amountNumber)}  </Text>
                      <Image source={Poin} style={styles.poinColapsible}/>
                    </View>
                    :
                    <Text style={styles.robotoLight}>Rp {currencyFormatter(resData.amountNumber)}</Text>
                }
              </View>
              <View style={styles.row}>
                <Text style={styles.robotoLight}>{language.GENERIC_BILLER__FEE_TXT} </Text>
                {
                  isUseSimas ?
                    <View style={styles.rowSimasPoin}>
                      <Text style={styles.robotoLight}>{currencyFormatter(resData.bankCharge)}  </Text>
                      <Image source={Poin} style={styles.poinColapsible}/>
                    </View>
                    :
                    <View style={styles.row}>
                      <Text style={styles.robotoLight}>{language.GENERIC_BILLER__FEE_TXT} </Text>
                      <Text style={styles.robotoLight}>Rp {currencyFormatter(resData.bankCharge)}</Text>
                    </View>
                }
              </View>
            </Collapsible>
          </View>
        </View>
        <View style={styles.labelSpacing} />
        {
          isUseSimas ? 
            null :
            <View>
              <View style={styles.labelSpacing} />
              <TabCoupon goToCoupon={goToCoupon} couponUse={newSubtitle} removeCoupon={this.remove}/>
            </View>
        }
        <View style={styles.labelSpacing} />
        <View>
          <Text style={styles.dateText}>{showTime}</Text>
        </View>
        <View style={styles.labelSpacing} />
        <View>
          <View style={styles.rowAlign}>
            <View>
              <SimasIcon name={'wallet'} size={30} style={[styles.wallet, styles.mr10]}/>
            </View>
            <View>
              {
                isUseSimas ?
                  <View>
                    <Text style={[styles.accNo, styles.roboto]}>{language.ONBOARDING__REDEEM_TITLE}</Text>
                    <Text style={[styles.product]}>{name}</Text>
                  </View>
                  :
                  <View>
                    <Text style={[styles.accNo, styles.roboto]}>{accNo}</Text>
                    <View>
                      <Text style={[styles.product]}>{name}</Text>
                      <Text style={[styles.product]}>{productType}</Text>
                    </View>
                  </View>
              }
            </View>
          </View>
          <View>
            <SimasIcon name={'more-menu'} size={25} style={[styles.more]}/>
          </View>
          <View style={styles.rowAlign}>
            <View>
              <SimasIcon name={'purchase'} size={30} style={[styles.purchase, styles.mr10]}/>
            </View>
            <View>
              <Text style={[styles.accNo, styles.roboto]}>{subsNumber}</Text>
              <Text style={[styles.product]}>{biller.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.labelSpacing} />
        <View style={styles.greyLine} />
        <View style={styles.labelSpacing} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <View>
              {map(dataDetailList, (value, k) => (
                <View key={k}>
                  <View><Text style={styles.rightItemHeader}>{language[k]}</Text></View>
                  <View><Text style={styles.robotoLight}>{value}</Text></View>
                  <View style={[styles.mv5]} />
                </View>)
              )}
            </View>
            <View>
              {map(bills, (value, k) => (
                <View key={k}>
                  <View><Text style={styles.rightItemHeader}>{k}</Text></View>
                  <View><Text style={styles.robotoLight}>{value}</Text></View>
                  <View style={[styles.mv5]} />
                </View>)
              )}
            </View>
            <View>
              <Text style={styles.rightItemHeader}>{language.ELECTRICITY__TOPUP_AMOUNT}</Text>
              <Text style={styles.robotoLight}>Rp {currencyFormatter(billAmount)}</Text>
            </View>
          </View>
          {isLogin ?
            isFavorite ? null : favoriteBill === 'yes' ?
              <Touchable onPress={removeFavorite(billerName, subsNumber)}>
                <SimasIcon name={'star-filled'} size={25} style={{color: 'red'}}/>
              </Touchable>
              :
              <Touchable onPress={showFavorite(billerName, subsNumber)}>
                <SimasIcon name={'star-blank'} size={25} style={{color: 'red'}}/>
              </Touchable> :
            null
          }
        </View>
        <View style={styles.verticalSpacing}>
          <View style={styles.containtextExplanation}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
            <Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text>
          </View>
          <SinarmasButton dtActionName={billerNameDynatrae} onPress={handleSubmit}>
            <Text style={[buttonLargeTextStyle, styles.roboto]}>{language.GENERIC_BILLER__CONFIRM_PAYMENT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>


    );
  }
}
