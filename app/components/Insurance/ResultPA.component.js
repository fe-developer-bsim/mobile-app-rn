import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './ResultPA.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import {SinarmasButton} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {currencyFormatter} from '../../utils/transformer.util';

class InsurancePA extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    navParams: PropTypes.object,
    goToPayPA: PropTypes.func,
    goToClosePA: PropTypes.func
  }

  render () {
    const {navParams, goToPayPA, goToClosePA} = this.props;
    const status = result(navParams, 'status', '');
    const err = result(navParams, 'err.data.responseMessage', '');
    const resultData = result(navParams, 'response.data', {});
    const noPolis = result(resultData, 'MSPO_POLICY_NO', '');
    const premi = result(resultData, 'PREMI', '');
    const UP = result(resultData, 'UP', '');
    const regSPAJ = result(resultData, 'REG_SPAJ', '');
    const namePolis = result(resultData, 'MCL_FIRST', '');
    const time = result(navParams, 'time', '');
    const refNum = result(navParams, 'transRefNum', '');
    const ajsmVA = result(resultData, 'NO_VA', '');
    return (
      <ScrollView>
        {status === '400' ?
          <View style={styles.contentCenter}>
            <View style={styles.icon}>
              <SimasIcon name={'close'} style={styles.iconFail} size={50}/>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmSubtitleXL}>{language.INSURANCE_PA_RESULT_FAILUER}</Text>
            </View>
            {err === 'Invalid Passcode.' ?
              <View style={styles.contentContainer}>
                <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_RESULT_ERRDETAIL2}</Text>
              </View> :
              <View style={styles.contentContainer}>
                <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_RESULT_ERRDETAIL}</Text>
              </View>}
          </View> : null
        }

        {status === '200' ?
          <View style={styles.contentCenter}>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmSubtitleXL}>{language.PROFILE__INSURANCE_DETAIL}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_CONFIRMATION_INSURANCE}</Text>
              <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_RESULT_}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_TYPE}</Text>
              <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_CONFIRMATION_PREMI}{currencyFormatter(premi)}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_NOPOLIS}</Text>
              <Text style={styles.confirmSubtitle}>{noPolis}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_OWNPOLIS}</Text>
              <Text style={styles.confirmSubtitle}>{namePolis}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_SPAJ}</Text>
              <Text style={styles.confirmSubtitle}>{regSPAJ}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_GUARANTEE}</Text>
              <Text style={styles.confirmSubtitle}>{'Rp '}{currencyFormatter(UP)}</Text>
            </View>
          </View> :
          <View/>
        }
        <View style={styles.contentCenter}>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_REF}</Text>
            <Text style={styles.confirmSubtitle}>{refNum}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.confirmTitle}>{language.INSURANCE_PA_RESULT_TIME}</Text>
            <Text style={styles.confirmSubtitle}>{time}</Text>
          </View>
        </View>
        {status === '200' ?
          <View style={styles.verticalSpacing}>
            <View style={styles.rowGreyPadding}>
              <View style={styles.rowGrey}/>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.row}>
                <Text style={styles.rowPadding}>{language.INSURANCE_PA_RESULT_TOTAL}</Text>
                <Text style={styles.rowPadding}>{'Rp '}{currencyFormatter(premi)}</Text>
              </View>
            </View>
          </View> : null}

        <View style={styles.rowGrey2}/>
        {status === '200' ?
          <View>
            <View style={styles.content}>
              <View>
                <Text style={styles.subTitle}>{language.INSURANCE_PA_PAY_TC_DETAIL}</Text>
              </View>
              <View style={styles.verticalSpacing}>
                <View  style={styles.rowDetail}>
                  <Text style={styles.billDetailTitle}>1. </Text>
                  <Text style={styles.billDetailTitle}>{language.INSURANCE_PA_PAY_TC_DETAIL1}</Text>
                </View>
                <View style={styles.rowDetail}>
                  <Text style={styles.billDetailTitle}>2. </Text>
                  <Text style={styles.billDetailTitle}>{language.INSURANCE_PA_PAY_TC_DETAIL2}</Text>
                </View>
                <View style={styles.rowDetail}>
                  <View>
                    <Text style={styles.billDetailTitle}>3. </Text>
                  </View>
                  <View>
                    <Text style={styles.billDetailTitle}>{language.INSURANCE_PA_PAY_TC_DETAIL3}<Text style={styles.billDetailTitle2}>{ajsmVA}</Text>{language.INSURANCE_PA_PAY_TC_DETAIL33}</Text>
                  </View>
                </View>
                <View style={styles.rowDetail}>
                  <Text style={styles.billDetailTitle}>4. </Text>
                  <Text style={styles.billDetailTitle}>{language.INSURANCE_PA_PAY_TC_DETAIL4}</Text>
                </View>
              </View>

            </View>
            <View style={styles.rowGrey2}/>
            <View style={styles.contentContainer}>
              <Text style={styles.confirmSubtitle}>{language.INSURANCE_PA_RESULT_PAYSIMOBI}</Text>
            </View>
          </View> : null}

        {status === '200' ?
          <View style={styles.contentCenter}>
            <SinarmasButton onPress={goToPayPA}>
              <Text style={styles.buttonLargeTextStyle}>{language.INSURANCE_PA_NEXT_PAY}</Text>
            </SinarmasButton>
          </View> :
          <View style={styles.contentCenter}>
            <SinarmasButton onPress={goToClosePA}>
              <Text style={styles.buttonLargeTextStyle}>{language.INSURANCE_PA_CLOSE}</Text>
            </SinarmasButton>
          </View>
        }

      </ScrollView>
    );
  }
}

export default InsurancePA;
