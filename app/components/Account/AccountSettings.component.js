import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView, Image} from 'react-native';
import styles from './AccountSettings.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import noop from 'lodash/noop';
import ibank from '../../assets/images/ibank.png';

class AccountSettings extends React.Component {
  static propTypes = {
    resetAndNavigate: PropTypes.func,
    getLoginPreference: PropTypes.func,
    isLogin: PropTypes.bool,
    toShowQr: PropTypes.func,
    showChangeDevice: PropTypes.bool,
    isLockedDevice: PropTypes.bool,
    isSetting: PropTypes.bool,
    getInternetBankingSettings: PropTypes.func,
    isKyc: PropTypes.bool,
  }

  render () {
    const {resetAndNavigate = noop, getLoginPreference, isLogin, toShowQr, showChangeDevice, isLockedDevice, isSetting, getInternetBankingSettings, isKyc} = this.props;
    if (!isSetting && isLogin) {
      return (
        <ScrollView contentContainerStyle={styles.container} extraHeight={120}>
          <View>
            <View style={styles.header}>
              <View>
                <Text style={[styles.title, styles.roboto]}>{language.ACCOUNT__SETTING}</Text>
              </View>
            </View>
            <View style={styles.content}>
              <Touchable dtActionName='Change Easy PIN' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('UpdateEasyPin')}>
                <View style={styles.rowCenter}>
                  <View style={styles.width}>
                    <SimasIcon style={styles.pinFill} name='change-pin-2-fill' size={25}/>
                    <SimasIcon style={styles.pinOutline} name='change-pin-2-stroke' size={25}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT__EASYPIN}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__EASYPIN_TEXT}</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
              <Touchable dtActionName='Change Password' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('ValidatePassword', {nextRouteName: 'CreateNewPassword'})}>
                <View style={styles.rowCenter}>
                  <View style={styles.width}>
                    <SimasIcon style={styles.passFill} name='change-password-2-fill' size={25}/>
                    <SimasIcon style={styles.passOutline} name='change-password-2-outline' size={25}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.ACCOUNT__PASS}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__PASS_TEXT}</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
              <Touchable dtActionName='Login Preferences' style={[styles.menu, styles.rowCenter]} onPress={getLoginPreference}>
                <View style={styles.rowCenter}>
                  <View style={styles.width}>
                    <SimasIcon style={styles.gearFill} name='setting-fill' size={25}/>
                    <SimasIcon style={styles.gearOutline} name='gear-setting' size={25}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.BURGER_MENU__LOGIN_PREFERENCES}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__LOGIN_PREF_TEXT}</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
              <Touchable dtActionName='Language' style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('LanguageSetting')}>
                <View style={styles.rowCenter}>
                  <View style={styles.width}>
                    <SimasIcon style={styles.langFill} name='language-fill' size={25}/>
                    <SimasIcon style={styles.passOutline} name='language-outline' size={25}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.PROFILE__SELECT_LANGUAGE}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__LANGUAGE_TEXT}</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
              <View style={styles.content}>
                <View style={styles.greyLine} />
                <Touchable dtActionName='Change Device' style={[styles.menu, styles.rowCenter]} onPress={toShowQr}>
                  <View style={styles.rowCenter}>
                    <View style={styles.width}>
                      <SimasIcon style={styles.langFill} name='device-fill' size={25}/>
                      <SimasIcon style={styles.passOutline} name='device-outline' size={25}/>
                    </View>
                    <View>
                      <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_CHANGE_DEVICE_DRAWER}</Text>
                      <View><Text style={[styles.menuTxtWrap, styles.roboto]}>{language.SUBTITLE_CHANGE_DEVICE_DRAWER}</Text></View>
                    </View>
                  </View>
                  <View style={styles.rowCenter}>
                    <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                  </View>
                </Touchable>
                <View style={styles.greyLine} />
                { isKyc ?
                  <View style={styles.content}>
                    <View style={styles.greyLine} />
                    <Touchable style={[styles.menu, styles.rowCenter]} onPress={getInternetBankingSettings}>
                      <View style={styles.rowCenter}>
                        <View style={styles.iconContainer}>
                          <Image source={ibank} style={styles.iconSize}/>
                        </View>
                        <View>
                          <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_INTERNET_BANKING}</Text>
                          <View><Text style={[styles.menuTxtWrap, styles.roboto]}>{language.SUBTITLE_INTERNET_BANKING}</Text></View>
                        </View>
                      </View>
                      <View style={styles.rowCenter}>
                        <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                      </View>
                    </Touchable>
                  </View>
                  : null}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container} style={styles.fullContainer} extraHeight={120}>
          <View>
            <View style={styles.header}>
              <View>
                <Text style={[styles.title, styles.roboto]}>{language.ACCOUNT__SETTING}</Text>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.greyLine} />
              <Touchable style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('LanguageSetting')}>
                <View style={styles.rowCenter}>
                  <View style={styles.width}>
                    <SimasIcon style={styles.langFill} name='language-fill' size={25}/>
                    <SimasIcon style={styles.passOutline} name='language-outline' size={25}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.PROFILE__SELECT_LANGUAGE}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.ACCOUNT__LANGUAGE_TEXT}</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                </View>
              </Touchable>
              <View style={styles.greyLine} />
            </View>
            {
              (showChangeDevice && !isLockedDevice) ?
                <View style={styles.content}>
                  <View style={styles.greyLine} />
                  <Touchable style={[styles.menu, styles.rowCenter]} onPress={resetAndNavigate('LoginChangeDevice')}>
                    <View style={styles.rowCenter}>
                      <View style={styles.width}>
                        <SimasIcon style={styles.langFill} name='device-fill' size={25}/>
                        <SimasIcon style={styles.passOutline} name='device-outline' size={25}/>
                      </View>
                      <View>
                        <Text style={[styles.menuTitle, styles.roboto]}>{language.TITLE_CHANGE_DEVICE_DRAWER_LOGIN}</Text>
                        <View><Text style={[styles.menuTxtWrap, styles.roboto]}>{language.SUBTITLE_CHANGE_DEVICE_DRAWER_MOVE}</Text></View>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.arrow} name='arrow' size={15}/>
                    </View>
                  </Touchable>
                  <View style={styles.greyLine} />
                </View>
                : null
            }
          </View>
        </ScrollView>
      );
    }
  }
}

export default AccountSettings;
