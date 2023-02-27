import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './AboutPayDayLoan.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import PaydayImage from '../../assets/images/simaskasbon2x.jpg';

class ConfirmationAccountComponent extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    onPress: PropTypes.func,
    agreementContent: PropTypes.array,
    agreementPowerContent: PropTypes.array,
    agreementStatementContent: PropTypes.array,
    agreementStatement: PropTypes.array,
    mockImageLocation: PropTypes.bool,
  }

  render () {
    const {onPress, agreementContent = [], agreementStatementContent = [], agreementPowerContent = [], agreementStatement = [],
      mockImageLocation} = this.props;
    const PaydayImageLocation = mockImageLocation ? '' : PaydayImage;
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.topBorder}/>
        <View style={styles.imageContain}>
          <Image source={PaydayImageLocation} style={styles.bigBannerMigrate}/>
        </View>

        <View style={styles.topContainer}>
          <Text style={styles.bigTitle}>{language.PAYDAY_LOAN__AGREEMENT_TITLE}</Text>
          <Text style={styles.bigSecTitle}>{language.PAYDAY_LOAN__AGREEMENT_SUBTITLE}</Text>
          {agreementStatement.map((agreementStatement, i) => (
            <View key={i}>
              <View style={styles.rowFieldAgreement}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{agreementStatement.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.middleBorder}/>
        <View style={styles.middleContainer}>
          <View style={styles.paddingLine}>
            <Text style={styles.bigTitle}>{language.PAYDAY_LOAN__AGREEMENT_TERM_CONDITION}</Text>
          </View>
          {agreementContent.map((agreementContent, i) => (
            <View key={i}>
              <View style={styles.rowFieldAgreement}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{agreementContent.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.middleBorder}/>
        <View style={styles.middleContainer}>
          <Text style={styles.bigTitle}>{language.PAYDAY_LOAN__POWER_TITTLE}</Text>
          <Text style={styles.bigSecTitle}>{language.PAYDAY_LOAN__POWER_SUBTITTLE}</Text>
          {agreementPowerContent.map((agreement, i) => (
            <View key={i}>
              <View style={styles.rowFieldAgreement}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{agreement.answer}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.middleBorder}/>
        <View style={styles.middleContainer}>
          <View style={styles.paddingLine}>
            <Text style={styles.bigTitle}>{language.PAYDAY_LOAN__LOAN_TITLE}</Text>
          </View>
          {agreementStatementContent.map((agreementStatementContent, i) => (
            <View key={i}>
              <View style={styles.rowFieldAgreement}>
                <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
                <View style={styles.contentContainer}>
                  <Text style={styles.pageTitle}>{agreementStatementContent.answer}</Text>
                  {agreementStatementContent.answer === language.PAYDAY_LOAN__STATEMENTAGREEMENT_9 ?
                    <View style={styles.paddingContain}>
                      <View style={styles.subTitle}>
                        <View style={styles.checkBorder}>
                          <Text>a</Text>
                        </View>
                        <View>
                          <Text style={styles.pageTitle}>{language.PAYDAY_LOAN__STATEMENTAGREEMENT_SUB_1}</Text>
                        </View>
                      </View>
                      <View style={styles.subTitle}>
                        <View style={styles.checkBorder}>
                          <Text>b</Text>
                        </View>
                        <View>
                          <Text style={styles.pageTitle}>{language.PAYDAY_LOAN__STATEMENTAGREEMENT_SUB_2}</Text>
                        </View>
                      </View>
                      <View style={styles.subTitle}>
                        <View style={styles.checkBorder}>
                          <Text>c</Text>
                        </View>
                        <View>
                          <Text style={styles.pageTitle}>{language.PAYDAY_LOAN__STATEMENTAGREEMENT_SUB_3}</Text>
                        </View>
                      </View>
                    </View>
                    : null}
                </View>
              </View>
            </View>
          ))}
          <View style={styles.footerContainer}>
            <SinarmasButton text={language.SMARTFREN__AGREE_BUTTON} style={styles.mainbutton} onPress={onPress} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ConfirmationAccountComponent;
