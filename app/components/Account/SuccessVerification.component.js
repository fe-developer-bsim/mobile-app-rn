import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './SuccessVerification.styles';
import {language} from '../../config/language';
import {SinarmasButton} from '../FormComponents';
import highfive from '../../assets/images/Highfive.png';

class SuccessVerification extends React.Component {
  static propTypes={
    AccountMenu: PropTypes.func,
    orderId: PropTypes.object
  }

  render () {
    const {orderId} = this.props;
    const reportIdNumber = orderId;
    const {AccountMenu} = this.props;
    return (
      <View style={styles.bgSukses}>
        <View style={styles.wrapAtas}>
          <View style={styles.contHeader}>
            <Text style={styles.txtHeader}>{language.SUCCESS__HEADER}</Text>
          </View>

          <Image style={styles.imgSukses} source={highfive}/>
          
          <View style={styles.contText}>
            <Text style={styles.txtSub}>{language.SUCCESS__SUBTITLE}</Text>
            <Text style={styles.txtReport}>{language.REPORT__ID_NUMBER}{reportIdNumber}</Text>
          </View>
        </View>
        
        <View style={styles.continueBtn}>
          <SinarmasButton onPress={AccountMenu}>
            <Text style={styles.txtBtn}>{language.CGV__DONE}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}
export default SuccessVerification;
