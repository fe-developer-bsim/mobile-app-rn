import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import styles from './SinarmasSekuritasInfo.styles';
import savingsImage from '../../assets/images/mutualfund-card.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {result, noop} from 'lodash';
import moment from 'moment';
import {currencyFormatter, formatForexAmount} from '../../utils/transformer.util';
import {language} from '../../config/language';
import isEmpty from 'lodash/isEmpty';

class Casa extends React.Component {
  static propTypes = {
    productList: PropTypes.array,
    transactionList: PropTypes.array,
    goBuyReksadana: PropTypes.func,
    goSellReksadana: PropTypes.func,
    item: PropTypes.object,
  }

  renderHistory (transaction) {
    const fundName = result(transaction, 'Fund_Name', '');
    const transType = result(transaction, 'Trn_Type', '');
    const transDate = moment(result(transaction, 'Trn_Date_Time')).format('DD MMM YYYY');
    const status = result(transaction, 'statusForSimobi', '');
    const unitValueRaw = result(transaction, 'Nilai_Bersih', 0) === null ? '0' : result(transaction, 'Nilai_Bersih', 0);
    const currency = result(transaction, 'Currency', '');
    const unitValue = formatForexAmount(unitValueRaw, currency);
    const typeCurrency = currency === 'IDR' ? 'Rp' : '$';
    
    return (
      <View style={styles.historyItem}>
        <View style={styles.leftHistory}>
          <Text style={styles.historyTitle}>{transType} {fundName}</Text>
          <Text style={styles.subTitle}>{transDate}</Text>
          <Text style={styles.subTitle}>{status}</Text>
        </View>
        <View style={styles.rightHistory}>
          <Text style={transType === 'Subscription' ? styles.valueHistoryDetailGreen : styles.valueHistoryDetailRed}>{typeCurrency} {unitValue}</Text>
        </View>

      </View>
    );
  }

  render () {
    const {item, goBuyReksadana = noop, goSellReksadana = noop} = this.props;
    const summary = result(item, 'summaryPortfolio', {});
    const transactionList = result(item, 'lastTransaction', []);
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const fundNamesSplit = result(summary, 'Fund_Name', '');
    const fundCurrency = result(detailPortfolio, 'portfolio.0.Fund_Currency', '');
    const NABDate = moment(result(detailPortfolio, 'portfolio.0.NAB_Date')).format('DD/MM/YYYY');
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    const totalUnit = result(detailPortfolio, 'portfolio.0.Customer_Unit_Available', 0);
    const CustomerUnitPenyertaan = Math.round(totalUnit * NABPerUnit);    
          
    return (
      <ScrollView style={styles.columnContainer} 
        contentContainerStyle={{ 
          flexGrow: 1, 
          flexDirection: 'column', 
          justifyContent: 'space-between'
        }} keyboardShouldPersistTaps='handled' bounces={false}>
        <View style={styles.container}>
          <ImageBackground source={savingsImage} borderRadius={15} style={styles.imageContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <Text style={styles.valueTitle}>{language.INVESMENT_AMOUNT__MEDALLION}</Text>
                <Text style={styles.productName}>{fundNamesSplit}</Text>
              </View>
              <View>
                <Text style={styles.value}>{fundCurrency} {currencyFormatter(CustomerUnitPenyertaan)}</Text>
              </View>
              <View style={styles.greyLine} />
              <View style={styles.detailRow}>
                <View style={styles.detailContainer}>
                  <Text style={styles.leftDetail}>NAB per unit ({NABDate})</Text>
                  <Text style={styles.leftValue}>{fundCurrency} {NABPerUnit}</Text>
                </View>
                <View style={styles.greyLineVertical} />
                <View style={styles.detailContainer}>
                  <Text style={styles.rightDetail}>{language.NUMBER_OF_UNIT__MEDALLION}</Text>
                  <Text style={styles.rightValue}>{totalUnit}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <View style={styles.backgroundColourIconLeft}>
                  <Touchable onPress={goBuyReksadana(item)}>
                    <SimasIcon name={'buy'} size={25} style={styles.iconBuySell1} />
                    <Text style={styles.iconTitleLeft}>{language.DETAIL_PORTFOLIO__LANG_SUBSCRIPTION}</Text>
                  </Touchable>  
                </View>
                <View style={styles.backgroundColourIconRight}>
                  <Touchable onPress={goSellReksadana(item)}>
                    <SimasIcon name={'sell'} size={25} style={styles.iconBuySell} />
                    <Text style={styles.iconTitleRight}>{language.DETAIL_PORTFOLIO__LANG_REDEMPTION}</Text>
                  </Touchable>
                </View>   
              </View>
            </View>
          </ImageBackground>
          <View style={styles.historyContainer}>
            <Text style={styles.historyHeader}>{isEmpty(transactionList) ? language.RD__NO_TRANSACTION : language.DETAIL_PORTFOLIO__LAST_TRANSACTION}</Text>
            {
              isEmpty(transactionList) ? 
                null
                :
                <View style={styles.historyDetailContainer}>
                  {
                    transactionList.map((transaction, i) => this.renderHistory(transaction, i))
                  }
                </View>
            }  
          </View>
        </View>
        <View style={styles.infoDTBase}>
          <Text style={styles.infoDT}>{language.RD_DATE_TIME_TRANSACTION}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default Casa;
