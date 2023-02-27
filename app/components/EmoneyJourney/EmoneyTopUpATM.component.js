import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Clipboard, Image} from 'react-native';
import styles from './EmoneyTopUpATM.style';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import result from 'lodash/result';
import {networkOtherBank, emoneyAccountNumber} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';

class ChooseEmoneyTopUp extends React.Component {
  static propTypes = {
    goToATM: PropTypes.func,
    currentLanguage: PropTypes.object,
    emoneyAccount: PropTypes.object,
    checkAccount: PropTypes.bool,
    allAccounts: PropTypes.array,
    checkPayee: PropTypes.bool,
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed1: true,
    summaryCollapsed2: true,
    summaryCollapsed3: true,
  }

  summaryCollapse1 = () => {
    this.setState({
      summaryCollapsed1: !this.state.summaryCollapsed1,
      summaryCollapsed2: true,
      summaryCollapsed3: true
    });
  }
  summaryCollapse2 = () => {
    this.setState({
      summaryCollapsed2: !this.state.summaryCollapsed2,
      summaryCollapsed1: true,
      summaryCollapsed3: true
    });
  }
  summaryCollapse3 = () => {
    this.setState({
      summaryCollapsed3: !this.state.summaryCollapsed3,
      summaryCollapsed2: true,
      summaryCollapsed1: true
    });
  }

  copyAccountNumber = () => {
    const {emoneyAccount} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    Clipboard.setString(accountNumber);
    Toast.show(language.EMONEY_TOPUP_HEADER__COPIED, Toast.LONG);
  }

  render () {
    const {emoneyAccount, checkAccount, checkPayee, currentLanguage} = this.props;
    const accountNumber = result(emoneyAccount, 'accountNumber', '');
    const showDetailAmt1 = this.state.summaryCollapsed1;
    const showDetailAmt2 = this.state.summaryCollapsed2;
    const showDetailAmt3 = this.state.summaryCollapsed3;
    const idLanguage = currentLanguage.id;

    return (
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.container}>
          <View style={styles.cardsContainer}>
            <View style={styles.titleTextContainer}>
              {
                checkAccount ?
                  <Text style={[styles.titleText, styles.roboto]}>{language.EMONEY_TOPUP_HEADER__METHOD}</Text>
                  : <View>
                    <Touchable onPress={checkPayee}>
                      <View style={[styles.rowContainerTitle, styles.containerTitle]}>
                        <View>
                          <Text style={[styles.roboto, styles.titleWhiteText, styles.padBot5]}>{language.EMONEY_TOPUP__TITLE_NOW}</Text>
                          <Text style={[styles.arrowWhite, styles.padRight10]}>{language.EMONEY_TOPUP__DESC_TITLE_NOW}</Text>
                        </View>
                        <View style={styles.containerArrow}>
                          <SimasIcon name={'arrow'} size={15} style={styles.arrowWhite}/>
                        </View>
                      </View>
                    </Touchable>
                    <View style={styles.otherContainer}>
                      <Text style={[styles.addittionalHeader]}>{language.EMONEY_TOPUP_TITLE__OTHER}</Text>
                    </View>
                  </View>
              }
            </View> 

            <Touchable onPress={this.summaryCollapse1}>
              <View style={styles.itemContainer}>
                <View style={styles.rowContainerSpace}>
                  <View style={styles.leftContainter}>
                    <Text style={[styles.roboto, styles.bold, styles.padBot5]}>{language.EMONEY_TOPUP_HEADER__CASH}</Text>
                    <Text style={[styles.roboto, styles.textLight]}>{language.EMONEY_TOPUP_HEADER__CASH_DESCRIPTION}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={showDetailAmt1 ? styles.arrowDown : styles.arrowUp}/>
                  </View>
                </View>
              </View>
            </Touchable>

            <Collapsible collapsed={this.state.summaryCollapsed1} refName='summary'>
              <View style={styles.collapseContainer}>
                <View style={styles.itemContainer}>
                  <View>
                    <View style={styles.rowContainerSpace}>
                      <Text style={styles.robotoLight}>{language.EMONEY_TOPUP_HEADER__ACCOUNT_NUMBER}</Text>
                    </View>
                    <View style={styles.rowContainerSpace}>
                      <View>
                        <Text style={[styles.bold, styles.roboto]}>{emoneyAccountNumber(accountNumber)}</Text>
                      </View>
                      <View>
                        <Touchable onPress={this.copyAccountNumber}>
                          <Text style={[styles.textRed]}>{language.EMONEY_TOPUP_HEADER__COPY}</Text>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.greyBackground}>
                  <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__TELLER}</Text> 
                </View>
                  
                <View style={styles.itemContainer}>
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={[styles.numberText]}>1</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__CASH_1}</Text></View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__CASH_2}</Text></View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__CASH_3}</Text></View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__CASH_4}</Text></View>
                  </View>
                </View>

                <View style={styles.greyBackground}>
                  <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__ALFA}</Text> 
                </View>
                  
                <View style={styles.itemContainer}>
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={[styles.numberText]}>1</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__ALFA_1}</Text></View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__ALFA_2}</Text></View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    <View style={styles.rowText}><Text style={[styles.roboto]}>{language.EMONEY_TOPUP__ALFA_3}</Text></View>
                  </View>
                </View>
              </View>
            </Collapsible>
            
            {this.state.summaryCollapsed1 ? <View style={styles.greyLineHorizontal} /> 
              : null
            }

            <Touchable onPress={this.summaryCollapse2}>
              <View style={styles.itemContainer}>
                <View style={styles.rowContainerSpace}>
                  <Text style={[styles.bold, styles.padBot5]}>{language.EMONEY_TOPUP_HEADER__SIMAS}</Text>
                </View>
                <View style={styles.rowContainerSpace}>
                  <Text style={styles.rowText}>
                    <Text style={[styles.roboto, styles.textLight]}>{language.EMONEY_TOPUP_HEADER__SIMAS_DESCRIPTION1}</Text>
                    <Text style={[styles.roboto, styles.textLight]}>{language.EMONEY_TOPUP_HEADER__SIMAS_DESCRIPTION2}</Text>
                  </Text>
                  <View>
                    <SimasIcon name={'arrow'} size={13} style={showDetailAmt2 ? styles.arrowDown : styles.arrowUp}/>
                  </View>
                </View>
              </View>
            </Touchable>
            
            <Collapsible collapsed={this.state.summaryCollapsed2} refName='summary'>
              <View style={styles.collapseContainer}>
                <View style={styles.itemContainer}>
                  <View style={styles.rowContainerSpace}>
                    <Text style={styles.robotoLight}>{language.EMONEY_TOPUP_HEADER__ACCOUNT_NUMBER}</Text>
                  </View>
                  <View style={styles.rowContainerSpace}>
                    <Text style={styles.bold}>{emoneyAccountNumber(accountNumber)}</Text>
                    <Touchable onPress={this.copyAccountNumber}>
                      <Text style={styles.textRed}>{language.EMONEY_TOPUP_HEADER__COPY}</Text>
                    </Touchable>
                  </View>
                </View>

                <View style={styles.greyBackground}>
                  <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__1}</Text> 
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>1</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_1__WORD_1}</Text>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SP_1__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    {
                      idLanguage === 'en' ?
                        <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_1}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_2}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_3}</Text>
                        </View> :
                        <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_1}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_3}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_2__WORD_2}</Text>
                        </View>
                    }
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_3__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_3__WORD_2} </Text>
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                    <Text style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_4__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_4__WORD_2}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_4__WORD_3}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_4__WORD_4}</Text>
                    </Text>
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>5</Text></View>
                    <View>
                      <View style={styles.rowText}>
                        <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SP_5__WORD_1}</Text>
                        <Text style={styles.roboto}>{language.EMONEY_TOPUP_SIMAS_SP_5__WORD_4}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>6</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_6__WORD_1} </Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_6__WORD_2} </Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>7</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_SP_7__WORD_1}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.greyBackground}>
                  <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__2}</Text> 
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>1</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_1__WORD_1}</Text>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_IB_1__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    <View>
                      <View style={styles.rowText}>
                        <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_2__WORD_1}</Text>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_2__WORD_2}</Text>
                      </View>
                      <View style={styles.columnText}>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_2__WORD_3}</Text>

                      </View>
                    </View>
                    
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_3__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_3__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                    <View>
                      <View style={styles.rowText}>
                        <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_1}</Text>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_2}</Text>
                        <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_3} </Text>
                      </View>
                      <View style={styles.columnText}>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_4}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>5</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_IB_5__WORD_1}</Text>
                      <Text style={styles.roboto}>{language.EMONEY_TOPUP_SIMAS_IB_5__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>6</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_6__WORD_1} </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.greyBackground}>
                  <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_SUBHEADER__3}</Text> 
                </View>
                <View style={styles.itemContainer}>
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>1</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_1__WORD_1}</Text>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_ATM_1__WORD_2}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_1__WORD_3}</Text>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_ATM_1__WORD_4}</Text>
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    <View>
                      <View style={styles.rowText}>
                        <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_2__WORD_1}</Text>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_2__WORD_2}</Text>
                      </View>
                      <View style={styles.columnText}>
                        <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_ATM_2__WORD_3}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    <View>
                      <View style={styles.rowText}>
                        <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_1}</Text>
                        <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_IB_4__WORD_2}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_4__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_4__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>5</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto, styles.bold]}>{language.EMONEY_TOPUP_SIMAS_ATM_5__WORD_1}</Text>
                      <Text style={styles.roboto}>{language.EMONEY_TOPUP_SIMAS_ATM_5__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>6</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_SIMAS_ATM_6__WORD_1}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Collapsible>

            {this.state.summaryCollapsed2 ? <View style={styles.greyLineHorizontal} /> 
              : null
            }

            <Touchable onPress={this.summaryCollapse3}>
              <View style={styles.itemContainer}>
                
                <View style={styles.rowContainerSpace}>
                  <View style={styles.leftContainter}>
                    <Text style={[styles.bold, styles.padBot5]}>{language.EMONEY_TOPUP_HEADER__OTHER}</Text>
                    <Text style={[styles.roboto, styles.textLight]}>{language.EMONEY_TOPUP_HEADER__OTHER_DESCRIPTION}</Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <SimasIcon name={'arrow'} size={13} style={showDetailAmt3 ? styles.arrowDown : styles.arrowUp}/>
                  </View>
                </View>
              </View>
            </Touchable>

            <Collapsible collapsed={this.state.summaryCollapsed3} refName='summary'>
              <View style={styles.collapseContainer}>
                <View style={styles.itemContainer}>
                  <View>
                    <View style={styles.rowContainerSpace}>
                      <Text style={styles.robotoLight}>{language.EMONEY_TOPUP_HEADER__ACCOUNT_NUMBER}</Text>
                    </View>
                    <View style={styles.rowContainerSpace}>
                      <Text style={styles.bold}>{emoneyAccountNumber(accountNumber)}</Text>
                      <Touchable onPress={this.copyAccountNumber}>
                        <Text style={styles.textRed}>{language.EMONEY_TOPUP_HEADER__COPY}</Text>
                      </Touchable>
                    </View>
                  </View>
                  <View style={styles.greyLine} />
                  <View style={styles.detailTitleContainer}><Text style={styles.bold}>{language.EMONEY_TOPUP__INSTRUCTION}</Text></View>
                  
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>1</Text></View>
                    <Text style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_1__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_1__WORD_2}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_1__WORD_3}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_1__WORD_4}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_1__WORD_5}</Text>
                    </Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <View style={styles.rowContainer}>
                      <View style={styles.emptyNumberContainer}/>
                      <Image style={styles.imgBank} source={networkOtherBank('prima')}/>
                      <Image style={styles.imgBankAtmb} source={networkOtherBank('atmBersama')}/>
                      <Image style={styles.imgBankAlto} source={networkOtherBank('alto')}/>
                    </View>
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>2</Text></View>
                    {
                      idLanguage === 'en' ? 
                        <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_1}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_2}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_3}</Text>
                        </View> : <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_1}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_3}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_2}</Text>
                        </View> 
                    }

                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>3</Text></View>
                    {
                      idLanguage === 'en' ?
                        <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_1}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_3__WORD_2}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_3}</Text>
                        </View> : <View style={styles.rowText}>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_1}</Text>
                          <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_3}</Text>
                          <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_3__WORD_2}</Text>
                        </View>
                    }
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>4</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_2__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_4__WORD_2}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_4__WORD_3}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_4__WORD_4}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>5</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_5__WORD_1} </Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_5__WORD_2}</Text>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_5__WORD_3} </Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>6</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_5__WORD_1}</Text>
                      <Text style={[styles.bold, styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_6__WORD_2}</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View style={styles.numberContainer}><Text style={styles.numberText}>7</Text></View>
                    <View style={styles.rowText}>
                      <Text style={[styles.roboto]}>{language.EMONEY_TOPUP_OTHERBANK_7__WORD_1}</Text>
                    </View>
                  </View>
                  <View style={styles.detailTitleContainer}><Text style={styles.infoLight}>{language.EMONEY_TOPUP__INFO}</Text></View>
                </View>
              </View>
            </Collapsible>

            {this.state.summaryCollapsed3 ? <View style={styles.greyLineHorizontal} /> 
              : null
            }

          </View>
        </View>
      </ScrollView>
    );
  }

}

export default ChooseEmoneyTopUp;
