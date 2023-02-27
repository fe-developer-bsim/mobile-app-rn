import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {language} from '../../config/language';
import styles from './MmqDetails.styles';
import moment from 'moment';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';

class MmqDetails extends React.Component {
  static propTypes = {
    accountInfo: PropTypes.object,
    getMmqDataDetail: PropTypes.func
  }
  render () {
    const {accountInfo = {}, getMmqDataDetail} = this.props;
    const namaProgram = 'Mudharabah Muqayyadah';
    return (
      <View style={styles.container}>
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
          <Text style={styles.value}>{moment(accountInfo.TanggalAwalInvestasi).format('D MMMM YYYY')}</Text>
        </View>
        <View style={styles.borderBottomRow}>
          <View style={styles.newTitleContainer}>
            <Text style={styles.title}>{language.DASHBOARD__MMQ_DUE_DATE}</Text>
          </View>
          <Text style={styles.value}>{moment(accountInfo.TanggalJatuhTempo).format('D MMMM YYYY')}</Text>
        </View>
        <View style={styles.borderBottomRow}>
          <View style={styles.newTitleContainer}>
            <Text style={styles.title}>{language.DASHBOARD__MMQ_NISBAH_BAGI_HASIL}</Text>
          </View>
          <Text style={styles.value}>{accountInfo.NisbahBagiHasil}</Text>
        </View>
        <View style={styles.borderBottomRow}>
          <View style={styles.newTitleContainer}>
            <Text style={styles.title}>{language.DASHBOARD__MMQ_TGL_BAGI_HASIL}</Text>
          </View>
          <Text style={styles.value}>{moment(accountInfo.TanggalBagiHasil).format('D MMMM YYYY')}</Text>
        </View>
        <Touchable onPress={getMmqDataDetail(accountInfo)} style={styles.rowNoBorder}>
          <Text style={styles.viewMore}>{language.DASHBOARD__MMQ_VIEW_DETAIL}</Text>
          <SimasIcon name={'arrow'} size={13} style={styles.arrowIcon}/>
        </Touchable>
      </View>
    );
  }
}

export default MmqDetails;
