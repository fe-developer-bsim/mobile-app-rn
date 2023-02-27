import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './SetDefaultAutoDebit.styles';
import {language} from '../../config/language';
import Switch from '../FormComponents/SinarmasSwitch/Switch.component';
import {SinarmasButton} from '../FormComponents';
import {map, result, lowerCase, find, noop, size} from 'lodash';
import Touchable from '../Touchable.component';
import savingPay from '../../assets/images/saving-paycard.png';

class LoginPreference extends React.Component {
  static propTypes = {
    updateFaceSetting: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    isUsingFaceRecog: PropTypes.bool,
    isUsingFingerprint: PropTypes.bool,
    hasFingerprint: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isFaceRecogEnabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    setChangeToogleAutoDebit: PropTypes.func,
    toogleDefaultAccount: PropTypes.bool,
    accountList: PropTypes.array,
    offerOpeningAccount: PropTypes.func
  }
  state={
    toogleCheck: false,
    targetId: ''
  }
  componentWillMount () {
    const {toogleDefaultAccount, accountList} = this.props;
    this.setState({toogleCheck: toogleDefaultAccount});
    const findIsDefault = find(accountList, function (accountDetail) {
      return lowerCase(result(accountDetail, 'isDefaultAccount')) === 'yes';
    });
    const targetSetId = result(findIsDefault, 'id', '');
    if (toogleDefaultAccount) {
      this.setState({targetId: targetSetId});
    }
  }
  setChangeToogleAutoDebitComponent =() => {
    const {accountList, offerOpeningAccount} = this.props;
    const countAccountList = size(accountList);
    if (countAccountList === 0 && this.state.toogleCheck === false) {
      offerOpeningAccount();
    } else {
      this.setState({toogleCheck: !this.state.toogleCheck});
    }
  }

  setIdtarget =(value) => () => {
    this.setState({targetId: value});
  }
  render () {
    const {setChangeToogleAutoDebit = noop, accountList} = this.props;
    const flagOnOff = this.state.toogleCheck ? language.SET_AUTODEBIT_FLAG_ON : language.SET_AUTODEBIT_FLAG_OFF;
    const sizeAccount = size(accountList);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.greyBack}>
          <View style={styles.borderPageTop}>
            <Text style={styles.title}>
              {language.SET_AUTODEBIT_TITLE_PAGE}
            </Text>
            <View>
              <View style={styles.loginItemContainer}>
                <View style={styles.loginTypeContainer}>
                  <Text style={styles.loginType}>{language.SET_AUTODEBIT_SUBTITLE_PAGE} {flagOnOff}</Text>
                </View>
                <Switch
                  onChangeHandler={this.setChangeToogleAutoDebitComponent}
                  defaultValue={this.state.toogleCheck}
                  noText={true}
                  colorBrand={true}
                  switchWidth={38}
                  switchHeight={19}
                  buttonWidth={16}
                  buttonHeight={16}
                />
              </View>
            </View>
            <View style={styles.widthText}>
              <Text style={styles.subTitle}><Text style={styles.boldText}>{language.SET_AUTODEBIT_INFO_ONE}, </Text>{language.SET_AUTODEBIT_INFO_TWO}</Text>
            </View>
            {/* <View style={styles.greyLine}/> */}
          </View>
          {this.state.toogleCheck &&
            <View style={styles.setPageBody}>
              <View style={styles.paddingBeetween}>
                <Text style={styles.formHeaderWithSpace}>{language.SET_AUTODEBIT_PICK_ACCOUNT}</Text>
              </View>
              <ScrollView contentContainerStyle={styles.sliderAccount}>
                {map(accountList, (value, k) => (
                  <View index={k}>
                    <View style={styles.bgWhite}>
                      <Touchable style={styles.rowCheck} onPress ={this.setIdtarget(result(value, 'id', ''))}>
                        <View style={styles.rowAccount}>
                          <View style={styles.iconContainer}>
                            <Image source={savingPay} style={styles.imageOffer2} />
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={styles.pad2}>
                              <Text style={styles.accTxt2}>{result(value, 'accountNumber', '')}</Text>
                            </View>
                            <View style={styles.pad2}>
                              <Text style={styles.typeTxt}>{result(value, 'productType', '')}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.coloumnCheck}>
                          {result(value, 'id', '') === this.state.targetId ?
                            <View style={styles.circleOuter}>
                              <View style={styles.circleInner}/>
                            </View>
                            :
                            <View style={styles.circleOuterOff}>
                              <View style={styles.circleInnerOff}/>
                            </View>
                          }
                        </View>
                      </Touchable>

                      {k + 1 !== sizeAccount && <View style={styles.greyLineAccount}/>}
                    </View>
                  </View>)
                )}
              </ScrollView>
            </View>
          }
        </View>
        <View style={styles.greyBackBottom}>
          <SinarmasButton style={styles.okButton} onPress={setChangeToogleAutoDebit(this.state)} disabled={(this.state.toogleCheck && this.state.targetId === '') || (!this.state.toogleCheck && this.state.targetId === '')}>
            <Text style={styles.understandButton}>{language.SET_AUTODEBIT_BUTTON}</Text>
          </SinarmasButton>
        </View>
      </ScrollView>
    );
  }
}

export default LoginPreference;