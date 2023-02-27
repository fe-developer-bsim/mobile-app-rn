import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './Investment.styles';
import {result, map} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';

class MSIGdetailInfo extends React.Component {
  static propTypes = {
    cardInfo: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  state = {
    summaryCollapsed: true,
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  render () {
    const {cardInfo = {}, currentLanguage} = this.props;
    const polisName = result(cardInfo, 'polisName', '');
    const summaryIconStyle = this.state.summaryCollapsed ? styles.iconCollapsedStyle : styles.accordionIcon;
    const summaryText = this.state.summaryCollapsed ? language.MSIG__ADDITIONAL_INSURANCE_VIEW : language.MSIG__ADDITIONAL_INSURANCE_HIDE;
    const pemegangPolis = result(cardInfo, 'value.PemegangPolis', '');
    const tertanggung = result(cardInfo, 'value.Tertanggung', '');
    const tanggalLahirTertanggung = moment(result(cardInfo, 'value.TanggalLahirTertanggung', '')).format('DD MMM YYYY');
    const usiaTertanggung = result(cardInfo, 'value.UsiaTertanggung', '');
    const tanggalMulaiAsuransi = result(cardInfo, 'value.TanggalMulaiAsuransi', '');
    const uangPertanggungan = result(cardInfo, 'value.UangPertanggungan', '');
    const premiPokok = result(cardInfo, 'value.Premi', '');
    const premiTopUpTunggal = result(cardInfo, 'value.PremiTopUpSingle*', '');
    const masaPembayaranPremi = currentLanguage === 'en' ? result(cardInfo, 'value.MasaPembayaranPremiEng', '') : result(cardInfo, 'value.MasaPembayaranPremi', '');
    const caraBayar = currentLanguage === 'en' ? result(cardInfo, 'value.CaraBayarEng', '') : result(cardInfo, 'value.CaraBayar', '');
    const masaAsuransi = result(cardInfo, 'value.MasaAsuransi', '');
    const asuransiTambahan = result(cardInfo, 'value.AsuransiTambahan', '');
    const splitAsuransiTambahan = asuransiTambahan.split(', ');

    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} contentContainerStyle={styles.containerContent} style={styles.container}>
        <View>
          <View>
            <Text style={styles.boldSimasTara}>{language.MSIG__INSURANCE_OWNER_DETAILS}</Text>
          </View>
          <View style={styles.borderSimasTara}>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__POLICY_OWNER}</Text>
              </View>
              <Text style={styles.valueDetail}>{pemegangPolis}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__INSURED}</Text>
              </View>
              <Text style={styles.value3}>{tertanggung}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__INSURED_BIRTH_DATE}</Text>
              </View>
              <Text style={styles.value3}>{tanggalLahirTertanggung}</Text>
            </View>
            <View style={styles.borderBottomNoRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__INSURED_AGE}</Text>
              </View>
              <Text style={styles.valueDetail}>{usiaTertanggung} {language.MSIG__YEARS_OLD}</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 10, marginBottom: 10}}>
          <View>
            <Text style={styles.boldSimasTara}>{language.MSIG__INSURANCE_DETAILS}</Text>
          </View>
          <View style={styles.borderSimasTara}>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__INSURANCE_START_DATE}</Text>
              </View>
              <Text style={styles.valueDetail}>{tanggalMulaiAsuransi}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__SUM_INSURED}</Text>
              </View>
              <Text style={styles.value3}>Rp. {uangPertanggungan}</Text>
            </View>
            <View>
              <View style={styles.borderBottomRow}>
                <View style={styles.newTitleContainer}>
                  <Text style={styles.titleSimasTara}>{language.MSIG__BASIC_PREMIUM}</Text>
                </View>
                <Text style={styles.value3}>Rp. {premiPokok}</Text>
              </View>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__SINGLE_TOPUP_PREMIUM}</Text>
              </View>
              <Text style={styles.value3}>Rp. {premiTopUpTunggal}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__PREMIUM_PAYMENT_PERIOD}</Text>
              </View>
              <Text style={styles.value3}>{masaPembayaranPremi}{polisName === 'Simas Magna Link' ? ' ' + language.MSIG__YEARS : null}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__PAYMENT_METHOD}</Text>
              </View>
              <Text style={styles.value3}>{caraBayar}</Text>
            </View>
            <View style={styles.borderBottomRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__INSURANCE_PERIOD}</Text>
              </View>
              <Text style={styles.value3}>{masaAsuransi}</Text>
            </View>
            <View style={styles.borderBottomNoRow}>
              <View style={styles.newTitleContainer}>
                <Text style={styles.titleSimasTara}>{language.MSIG__ADDITIONAL_INSURANCE}</Text>
              </View>
              <Touchable onPress={this.summaryCollapse}>
                <View style={[styles.collapsibleContainer]}>
                  <Text style={styles.valueCollapsibleText}>{summaryText}</Text>
                  <View style={summaryIconStyle}>
                    <SimasIcon name={'chevron'} size={20} style={[styles.collapsibleButton]}/>
                  </View>
                </View>
              </Touchable>
            </View>
            <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
              <View>
                {map(splitAsuransiTambahan, (data, i) => (
                  <View key={i}>
                    <View><Text style={styles.titleSimasTara}>{i + 1}. {data}</Text></View>
                  </View>)
                )}
              </View>
            </Collapsible>
          </View>
        </View>
        <View style={styles.borderCaution}>
          <View style={styles.containerIcon}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
          </View>
          <Text style={styles.caution}>{language.MSIG_CAUTION_DETAIL}</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default MSIGdetailInfo;
