import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './HowToTransfer.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';

class HowToTransfercomponent extends React.Component {
  static propTypes = {
    withInternetBankingcontent: PropTypes.array,
    withATMcontent: PropTypes.array,
    withMobileBankingcontent: PropTypes.array,
    onFinalizeForm: PropTypes.func,
  }

  render () {
    const {withATMcontent = [], withMobileBankingcontent = [], withInternetBankingcontent = [], onFinalizeForm} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>{language.HOWTOTRANSFER__WITH_ATM_MACHINE_TITLE}</Text>
        </View>
        <View style={styles.eachRow}>
          {withATMcontent.map((withATMcontent, i) => (
            <View key={i}>
              <View style={styles.row}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{withATMcontent.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.barStep}>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>{language.HOWTOTRANSFER__WITH_INTERNET_BANKING_TITLE}</Text>
        </View>
        <View style={styles.eachRow}>
          {withInternetBankingcontent.map((withInternetBankingcontent, i) => (
            <View key={i}>
              <View style={styles.row}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{withInternetBankingcontent.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.barStep}>
          <View style={styles.partTwo}/>
        </View>
        <View style={styles.mainTitle}>
          <Text style={styles.mainTitleText}>{language.HOWTOTRANSFER__WITH_MOBILE_BANKING_TITLE}</Text>
        </View>
        <View style={styles.eachRow}>
          {withMobileBankingcontent.map((withMobileBankingcontent, i) => (
            <View key={i}>
              <View style={styles.row}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{withMobileBankingcontent.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.barStep}>
          <View style={styles.partTwo}/>
        </View>
        <View>
          <View style={styles.buttonNext}>
            <SinarmasButton style={styles.buttonPayment} onPress={onFinalizeForm}>
              <Text style={styles.buttonIhaveMakePayment}>{language.IDENTITYFOURTHFORM__IHAVE_MAKE_A_PAYMENT}</Text>
            </SinarmasButton>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default HowToTransfercomponent;
