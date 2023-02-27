import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import styles from './StarInvestama.styles';
import {language} from '../../config/language';
import Carousel from '../Carousel/Carousel.component';
import {result, toLower, startCase, startsWith} from 'lodash';
import StarInvestamaInfo from './StarInvestamaInfo.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SILBackground from '../../assets/images/simasInvestaLink-bg.jpg';
import {formatForexAmount} from '../../utils/transformer.util';
import {SinarmasPicker, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {noop} from 'lodash';
import {theme} from '../../styles/core.styles';


export const fields = {
  NOPOLIS: 'nomorPolis'
};

class InvestmentComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    selectNoPolis: PropTypes.func,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.array,
    goToEmFund: PropTypes.func,
    emFundEnabled: PropTypes.bool,
    goTopUp: PropTypes.func,
    summaryDetail: PropTypes.object,
    starFlag: PropTypes.array,
    changeDataPolis: PropTypes.func,
    nomorPolis: PropTypes.array,
  }

  _renderItem = (data) => {
    const summaryDetail = result(data, 'item', {});
    const {goToEmFund, infoPolis, emFundEnabled, starFlag} = this.props;
    const produkCode = result(infoPolis, 'produkCode', '');
    const getFlagEmergencyFund = result(starFlag[`${produkCode}`], 'EF', false);
    return (
      <View>
        <StarInvestamaInfo emFundEnabled={emFundEnabled}infoPolis={infoPolis} goToEmFund={goToEmFund} summaryDetail={summaryDetail} getFlagEmergencyFund={getFlagEmergencyFund} />
      </View>
    );
  }

  _renderItem_topUp = (data) => {
    const summaryDetail = result(data, 'item', {});
    const {goTopUp, infoPolis, starFlag} = this.props;
    const produkCode = result(infoPolis, 'produkCode', '');
    const getFlagEmergencyFund = result(starFlag[`${produkCode}`], 'EF', false);
    return (
      <View>
        <StarInvestamaInfo infoPolis={infoPolis} goTopUp={goTopUp} summaryDetail={summaryDetail} getFlagEmergencyFund={getFlagEmergencyFund}/>
      </View>
    );
  }


  goTopUpMenu = () => {
    const {goTopUp, infoPolis, summaryDetail} = this.props;
    goTopUp(summaryDetail, infoPolis);
  }


  render () {
    const {infoPolis, summaryPolis, changeData = noop, nomorPolis} = this.props;
    const polisHolderName = result(infoPolis, 'pemegangPolis', '');
    const uangPertanggungan = result(infoPolis, 'uangPertanggungan', '');
    const statusPolis = result(infoPolis, 'statusPolis', '');
    const listDetailSummary = result(summaryPolis, 'listDetail', []);
    const mataUang = result(infoPolis, 'mataUang', '');
    const flagIsTopup = result(infoPolis, 'flagTopUp', '');
    const getFlagTopUP = startsWith(flagIsTopup, 'Y');

    return (
      <View style={styles.offsetOpacity}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
          <View style={styles.upperContainer}>
            <ImageBackground source={SILBackground} style={styles.backgroundImage}>
              <View style={styles.padding}>
                <Text style={styles.uname}>{startCase(toLower(polisHolderName))}</Text>
                <Text style={styles.polis}>{language.INQUIRY__STAR_INVESTAMA_NO_POLIS}</Text>
                <View style={styles.dropDownContainer}>
                  <Field
                    name={fields.NOPOLIS}
                    component={SinarmasPicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    labelKey='nomorPolis'
                    arrowPickerStyle={{marginTop: 15, marginRight: 10}}
                    textPickerStyle={{textAlign: 'center', fontSize: theme.fontSizeXL}}
                    itemList={nomorPolis}
                    typeField={'nomorPolis'}
                    onValChange={changeData}
                  />
                </View>
                <View style={styles.row}>
                  <View>
                    <Text style={styles.keys}>{language.INQUIRY__SIL_UANG_PERTANGGUNGAN}</Text>
                    <Text style={styles.keys}>{language.INQUIRY__SIL_STATUS_POLIS}</Text>
                  </View>
                  <View>
                    <Text style={styles.values}>{mataUang} {formatForexAmount(uangPertanggungan, mataUang)}</Text>
                    <Text style={styles.values}>{startCase(toLower(statusPolis))}</Text>
                  </View>
                </View>
              </View>
              {getFlagTopUP &&
                <View>
                  <SinarmasButton style={styles.topUpButton} onPress={this.goTopUpMenu}>
                    <Text style={styles.topUpText}>{language.INQUIRY__SIL_TOP_UP_BUTTONTEXT}</Text>
                  </SinarmasButton>
                </View>
              }
            </ImageBackground>
          </View>
          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.INQUIRY__SIL_DETAILS}</Text>
              <Carousel data={listDetailSummary} renderCard={this._renderItem}/>
            </View>
            <View style={styles.boxedInfo}>
              <SimasIcon style={styles.iconColor} name='caution-circle' size={20}/>
              <Text style={styles.info}>{language.INQUIRY__SIL_FOOTER}</Text>
            </View>
            <View style={styles.footer2}>
              <View>
                <Text style={styles.textFooter2}>{language.INQUIRY__SIL_FOOTER_2_OLD}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default InvestmentComponent;
