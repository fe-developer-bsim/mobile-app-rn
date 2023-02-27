import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './MmqDataDetail.styles';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';

class MmqDataDetail extends React.Component {
  static propTypes = {
    accountInfo: PropTypes.object,
    navigation: PropTypes.object,
  }
  render () {
    const {navigation = {}} = this.props;
    const data = result(navigation, 'state.params.data.0', {});
    const namaProgram = 'Mudharabah Muqayyadah';
    return (
      <ScrollView contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <Text style={styles.headerTitle}>{language.DASHBOARD__MMQ_CERTIFICATE_INFORMATION_TITLE}</Text>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.DASHBOARD__MMQ_PROGRAM_NAME}</Text>
            </View>
            <Text style={styles.value}>{namaProgram}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.DASHBOARD__MMQ_TGL_AWAL_INVESTASI}</Text>
            </View>
            <Text style={styles.value}>{moment(data.TanggalAwalInvestasi).format('D MMMM YYYY')}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.DASHBOARD__MMQ_DUE_DATE}</Text>
            </View>
            <Text style={styles.value}>{moment(data.TanggalJatuhTempo).format('D MMMM YYYY')}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.DASHBOARD__MMQ_NISBAH_BAGI_HASIL}</Text>
            </View>
            <Text style={styles.value}>{data.NisbahBagiHasil}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.DASHBOARD__MMQ_TGL_BAGI_HASIL}</Text>
            </View>
            <Text style={styles.value}>{moment(data.TanggalBagiHasil).format('D MMMM YYYY')}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_NAMA_INVESTOR}</Text>
            </View>
            <Text style={styles.value}>{data.NamaInvestor}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_NIK}</Text>
            </View>
            <Text style={styles.value}>{data.NIK}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_ALAMAT_SESUAI_NIK}</Text>
            </View>
            <Text style={styles.value}>{data.Alamat}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_NOMINAL_DANA_INVESTASI}</Text>
            </View>
            <Text style={styles.value}>Rp {currencyFormatter(data.Nominal)}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_JANGKA_WAKTU}</Text>
            </View>
            <Text style={styles.value}>{data.Tenor} Bulan</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_PENERIMA_DANA}</Text>
            </View>
            <Text style={styles.value}>{data.PenerimaDana}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_BIDANG_USAHA_PENGELOLA_DANA}</Text>
            </View>
            <Text style={styles.value}>{data.BidangUsaha}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_LOKASI_PENGELOLA_DANA}</Text>
            </View>
            <Text style={styles.value}>{data.LokasiPengelolaDana}</Text>
          </View>
          <View style={styles.borderBottomRow}>
            <View style={styles.newTitleContainer}>
              <Text style={styles.title}>{language.MMQ_AKAD_PEMBIAYAAN}</Text>
            </View>
            <Text style={styles.value}>{data.Akad_Pembiayaan}</Text>
          </View>
          <View style={styles.borderCaution}>
            <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
            <Text style={styles.caution}>{language.MMQ_CAUTION_DETAIL}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default MmqDataDetail;
