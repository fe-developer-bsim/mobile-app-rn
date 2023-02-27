import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, TouchableHighlight} from 'react-native';
import {language} from '../../config/language';
import styles from './SimasTaraSimulation.styles';
import {currencyFormatter} from '../../utils/transformer.util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty, result} from 'lodash';
import {SinarmasButton} from '../FormComponents';
import {SinarmasInputLarge} from '../FormComponents';
import {Field} from 'redux-form';
import {listViewComparator} from '../../utils/transformer.util';
import SimasTaraSourceAccountsList from './SimasTaraSourceAccountsList.component';
import {normalizeAmount, formatFieldAmount} from '../../utils/transformer.util';
import Tooltip from 'react-native-walkthrough-tooltip';

export const fields = {
  PERIOD_LIST: 'periodList',
  AMOUNT: 'amount'
};

class SimasTaraSimulation extends React.Component {
  static propTypes = {
    getSourceAccList: PropTypes.func,
    showAlert: PropTypes.func,
    initialDeposit: PropTypes.string,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    disabled: PropTypes.bool,
    sliderChange: PropTypes.func,
    amountSlider: PropTypes.number,
    interest: PropTypes.number,
    estimatedTargetAmount: PropTypes.number,
    maturityDate: PropTypes.string,
    countDown: PropTypes.func,
    countUp: PropTypes.func,
    counting: PropTypes.number,
    isLessAmount: PropTypes.bool,
    filteredAccount: PropTypes.array,
    getConfirmation: PropTypes.func,
    navigation: PropTypes.object,
    validationInput: PropTypes.func,
    ratePercent: PropTypes.number,
  }

  state = {
    toolTipVisible: false,
  }

  comparator = listViewComparator

  renderListItemConfirmation = (value) => () => {
    const {getConfirmation = {}} = this.props;
    return getConfirmation ? getConfirmation(value) : {};
  }

  renderListItem = ({item}) => (<SimasTaraSourceAccountsList {...item} getConfirmation={this.renderListItemConfirmation(item)} />);

  render () {
    const {formValues, amountSlider, showAlert, disabled, interest, estimatedTargetAmount,
      maturityDate, countDown, countUp, counting, isLessAmount, validationInput, initialDeposit, getSourceAccList, ratePercent, ...reduxFormProps} = this.props;
    const {invalid, submitting} = reduxFormProps;
    const checkAcc = isEmpty(result(formValues, 'AccNo', {}));
    const accountName = result(formValues, 'AccNo.name', '');
    const accountNumber = result(formValues, 'AccNo.accountNumber', '');
    
    return (
      <View style={styles.container1}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle} scrollEnabled={false}>
          <View style={styles.containerSourceAccount}>
            <View>
              <Text style={styles.subtitleTxt}>{language.PAGE__SIMAS_TARA_SIMULATION_SOURCE_ACC}</Text>
            </View>
            {initialDeposit !== '0' ?
              <View>
                <View style={styles.bgWhite}>
                  <Touchable onPress={getSourceAccList} style={styles.sendAccountDetailContainer}>
                    <View style={styles.detailLeft}>
                      { checkAcc ? 
                        <View style={styles.textCenter}>
                          <Text style={styles.textThin}>{language.TRANSFER__TRANSFER_SELECT_SRC_ACC_TITLE}</Text>
                        </View>
                        :  
                        <View style={{paddingHorizontal: 7}}>
                          <Text style={styles.textThin}>{language.DETAIL_TRANSACTION__FROM}</Text>
                          <View style={styles.rowFieldAgreement}>
                            <Text style={styles.subContentTextBottom}>{accountNumber} - </Text>
                            <Text style={styles.subContentTextBottom}>{accountName}</Text>
                          </View>
                        </View>
                      }
                    </View>
                    <View style={styles.detailRight}>
                      <SimasIcon name='more-menu' size={20}/>
                    </View>
                  </Touchable>
                </View>
                { isLessAmount ?
                  <View style={[styles.row2]}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    <Text style={styles.redText}>{language.VALIDATE__NOT_ENOUGHT_BALANCE}</Text>
                  </View>
                  : null
                }
              </View>
              : null
            }
          </View>

          <View style={{paddingVertical: 20}} />

        </ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainerWithTerms} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>
            
            <View style={styles.containerMonthlyPlacement}>
              <Text style={styles.mainTitleText}>{language.PAGE__SIMAS_TARA_SIMULATION_TITLE}</Text>
            </View>

            <View style={styles.containerBorderMonthlyPlacement}>
              <Text style={styles.textAmount}>{language.SIMAS_TARA_AMOUNT}</Text>

              <View style={styles.inlineField}>
                <Field
                  name={fields.AMOUNT}
                  component={SinarmasInputLarge}
                  theme='primary'
                  placeholder={language.SIMAS_TARA_AMOUNT}
                  isUseSuccessInputText={true}
                  typeField={'amount'}
                  maxLength={13}
                  keyboardType={'numeric'}
                  validationInput={validationInput}
                  normalize={normalizeAmount}
                  format={formatFieldAmount}
                  withoutBorder={true}
                />
              </View>

              <View style={styles.borderBottom}>
                <View>
                  <View style={styles.interestTextContainer}>
                    <Text style={styles.textAmount}>{language.PAGE__SIMAS_TARA_SIMULATION_PERIOD}</Text>
                  </View>
                  <View>
                    <View style={styles.borderedContainer}>
                      <View>
                        <Touchable disabled={counting < 2} onPress={countDown}>
                          <View style={styles.rightLeftBorder}>
                            <Text style={counting > 1 ? styles.largeText : styles.largeTextDisabled}>─</Text>
                          </View>
                        </Touchable>
                      </View>
                      <View style={styles.centerBorder}>
                        <Text style={styles.title}>{counting} {language.SIMAS_TARA_PERIOD_YEAR}</Text>
                      </View>
                      <View>
                        <Touchable onPress={countUp}>
                          <View style={{...styles.rightLeftBorder, alignSelf: 'flex-end'}}>
                            <Text style={counting < 10 ? styles.largeText : styles.largeTextDisabled}>＋</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{paddingBottom: 15}} />

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
              <View style={styles.row}>
                <Text style={styles.textAmount}>{language.SIMAS_TARA_RATE}</Text>
                <Text style={styles.value2}>{ratePercent}% p.a.</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.textAmount}>{language.PAGE__SIMAS_TARA_SIMULATION_ESTIMATED_TARGET}</Text>
                <Text style={styles.value}>Rp {currencyFormatter(estimatedTargetAmount)}</Text>
              </View>
              <View style={{paddingBottom: 15}} />
            </View>

            <View style={styles.rowAlignBorder}>
              <View style={{padding: 15}}>
                <Text style={[styles.product, styles.roboto]}>{language.DISCLAIMER_SIMAS_TARA1}</Text>
                <Text style={[styles.product, styles.roboto]}>{language.DISCLAIMER_SIMAS_TARA2}</Text>
                <Text style={[styles.product, styles.roboto]}>{language.DISCLAIMER_SIMAS_TARA3}</Text>
              </View>
            </View>
            
          </View>

        </KeyboardAwareScrollView>
        <View style={styles.buttonWrapper}>
          <SinarmasButton disabled={invalid || submitting || disabled || isLessAmount}
            onPress={showAlert(amountSlider, interest, estimatedTargetAmount, maturityDate, counting, ratePercent)}>
            <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default SimasTaraSimulation;
