import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasTaraSummary.styles';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import Tooltip from 'react-native-walkthrough-tooltip';

class SimasTaraSummary extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    account: PropTypes.object,
    data: PropTypes.object,
    handleSubmit: PropTypes.func,
  }

  state = {
    toolTipVisible: false,
  }

  render () {
    const {email, account, data, handleSubmit} = this.props;
    const productType = result(account, 'productType', '');
    const accountNumber = result(account, 'accountNumber', '');
    const currentDate = new Date();
    const amountSlider = result(data, 'amountSlider', '');
    const counting = result(data, 'counting', '');
    const maturityDate = result(data, 'maturityDate', '');
    const estimatedTargetAmount = result(data, 'estimatedTargetAmount', '');
    const ratePercent = result(data, 'ratePercent', '');
    return (
      <View style={styles.container1}>
        <ScrollView contentContainerStyle={styles.container} extraHeight={120}>
          <View>
            
            <View style={styles.containerMonthlyPlacement}>
              <Text style={styles.mainTitleText}>{language.PAGE__SIMAS_TARA_SIMULATION_TITLE}</Text>
            </View>

            <View style={styles.containerBorderMonthlyPlacement}>
              <Text style={styles.textAmount}>{language.SIMAS_TARA_AMOUNT}</Text>
              <View style={styles.taraAmountContainer}>
                <View>
                  <Text style={styles.rpText}>Rp. </Text> 
                </View>
                <View>
                  <Text style={styles.amountText}>{currencyFormatter(amountSlider)}</Text> 
                </View>
              </View>
              <View style={{paddingBottom: 15}} />
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SUMMARY_EMAIL}</Text>
                </View>
                <Text style={styles.value}>{email}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SIMULATION_SOURCE_ACC}</Text>
                </View>
                <Text style={[styles.value, {paddingBottom: 10}]}>{productType}{'\n'}{accountNumber}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SIMULATION_PERIOD}</Text>
                </View>
                <Text style={styles.value}>{counting} {language.SIMAS_TARA_PERIOD_YEAR}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.SIMAS_TARA_START_DATE}</Text>
                </View>
                <Text style={styles.value}>{moment(currentDate).format('D MMMM YYYY')}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SIMULATION_MATURITY_DATE}</Text>
                </View>
                <Text style={styles.value}>{moment(maturityDate).format('D MMMM YYYY')}</Text>
              </View>
            </View>

            <View style={{paddingVertical: 7}} />

            <View style={styles.containerMonthlyPlacement}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.mainTitleText}>{language.SIMAS_TARA_TARGET_AMOUNT}</Text>

                <Tooltip
                  animated={true}
                  arrowSize={{width: 16, height: 8}}
                  isVisible={this.state.toolTipVisible}
                  content={<Text>{language.SIMAS_TARA_ESTIMATED_TARGET_NOTIFICATION}</Text>}
                  placement='bottom'
                  // eslint-disable-next-line react/jsx-no-bind
                  onClose={() => this.setState({toolTipVisible: false})}
                  tooltipStyle={{width: 150, alignItems: 'flex-start'}}
                >
                  <TouchableHighlight
                    // eslint-disable-next-line react/jsx-no-bind
                    onPress={() => this.setState({toolTipVisible: true})}>
                    <View style={styles.appLogoquestion}>
                      <SimasIcon name={'caution-reverse'} size={15} style={styles.explainIconCaution}/>
                    </View>
                  </TouchableHighlight>
                </Tooltip>

              </View>
            </View>

            <View style={styles.containerBorderMonthlyPlacement}>
              <View style={{paddingTop: 10}} />
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SUMMARY_INTEREST_RATE}</Text>
                </View>
                <Text style={styles.value}>{ratePercent}% p.a.</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.title}>{language.PAGE__SIMAS_TARA_SIMULATION_ESTIMATED_FINAL}</Text>
                </View>
                <Text style={styles.value1}>Rp {currencyFormatter(estimatedTargetAmount)}</Text>
              </View>
            </View>
          
            <View style={styles.borderCaution}>
              <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
              <Text style={styles.caution}>{language.SIMAS_TARA_CAUTION_DETAIL}</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <SinarmasButton onPress={handleSubmit}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default SimasTaraSummary;
