import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './StarInvestama.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import moment from 'moment';
import {SinarmasButton} from '../FormComponents';
import {formatForexAmount} from '../../utils/transformer.util';

class InvestmentComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    summaryDetail: PropTypes.object,
    goToEmFund: PropTypes.func,
    infoPolis: PropTypes.object,
    emFundEnabled: PropTypes.bool,
    getFlagEmergencyFund: PropTypes.bool    
  }

  render () {
    const {summaryDetail, goToEmFund, infoPolis, getFlagEmergencyFund} = this.props;
    const alokasiPremi = result(summaryDetail, 'alokasiPremi', '');
    const amount = result(summaryDetail, 'amount', '');
    const mti = result(summaryDetail, 'mti', '');
    const tempPeriode = result(summaryDetail, 'periode', '').split(' - ');
    const tempPeriode1 = moment(tempPeriode[0]).format('DD MMM YY');
    const tempPeriode2 = moment(tempPeriode[1]).format('DD MMM YY');
    const periode = tempPeriode1 + ' - ' + tempPeriode2;
    const tanggalJatuhTempo = moment(result(summaryDetail, 'tanggalJatuhTempo', '')).format('DD MMM YY');
    const statusTopup = result(summaryDetail, 'statusTopup', '');
    const mataUang = result(infoPolis, 'mataUang', '');

    return (
      <View style={styles.carouselContainer}>
        <View style={styles.rowDetails}>
          <View style={styles.leftContainer}>
            <Text style={styles.detailTitle}>{language.INQUIRY__SIL_ALOKASI_PREMI}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.detailValues}>{alokasiPremi}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
        <View style={styles.rowDetails}>
          <View style={styles.rowText}>
            <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_TOTAL_PREMI}</Text>
            <Text style={styles.detailStar}>{language.INQUIRY__SIL__Star}</Text>
          </View>
          <View>
            <Text style={styles.detailValues}>{mataUang} {formatForexAmount(amount, mataUang)}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
        <View style={styles.rowDetails}>
          <View>
            <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_MTI}</Text>
          </View>
          <View>
            <Text style={styles.detailValues}>{mti}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
        <View style={styles.rowDetails}>
          <View style={styles.leftContainer}>
            <Text style={styles.detailTitle}>{language.SIL__SIMAS_MTI_PERIOD_OLD}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.detailValues}>{periode}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
        <View style={styles.rowDetails}>
          <View>
            <Text style={styles.detailTitle}>{language.SIL__SIMAS_MTI_PERIOD_DATE_OLD}</Text>
          </View>
          <View>
            <Text style={styles.detailValues}>{tanggalJatuhTempo}</Text>
          </View>
        </View>
        <View style={styles.greyLine}/>
        <View style={styles.rowDetails}>
          <View>
            <Text style={styles.detailTitle}>{language.EMONEY__STATUS}</Text>
          </View>
          <View>
            <Text style={styles.detailValues}>{statusTopup}</Text>
          </View>
        </View>
        {getFlagEmergencyFund ?
          <View>
            <SinarmasButton style={styles.withDrawEmergencyFundButton} onPress={goToEmFund(summaryDetail, infoPolis)}>
              <Text style={styles.withDrawEmergencyFundText}>{language.INQUIRY__SIL_EMERGENCY_FUND_BUTTONTEXT}</Text>
            </SinarmasButton>
          </View>
          : null
        }
      </View>
    );
  }
}

export default InvestmentComponent;
