import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './ConfirmEditProfile.styles';
import {isEmpty, result} from 'lodash';
import {SinarmasButton} from '../FormComponents';

class ConfirmEditProfile extends React.Component {
  static propTypes={
    currentLanguage: PropTypes.string,
    confirmFields: PropTypes.array,
    checkIsSensitive: PropTypes.func,
    status: PropTypes.string
  }

  renderFields=(item) => {    
    const key = Object.keys(item)[0];
    const displayedValue = result(item[key], 'name', item[key]);
    return (
      <View styles={styles.baseFields}>
        <View style={styles.isiFields}>
          <Text style={styles.lblFields}>{language[key]}</Text>
          <Text style={styles.txtFields}>{displayedValue}</Text>
        </View>
      </View>
    );
  }


  render () {
    const {confirmFields, checkIsSensitive, status} = this.props;
    const statusNumber = status !== '99' && status !== '98' && status !== '97' ? status : null;
    return (
      <ScrollView>
        <View style={styles.baseCf}>
          <Text style={styles.titleFields}>{statusNumber ? language.DISPLAY__EDIT_DATA : language.CONFIRMATION__EDIT_PROFILE}</Text>
          <View style={styles.editCategories}>
            {isEmpty(confirmFields) ? null : confirmFields.map(this.renderFields)}
          </View>
                    
          { !statusNumber &&           
          <View style={styles.confirmBtn}>
            <SinarmasButton style={styles.enabledBtn} onPress={checkIsSensitive}>
              <Text style={styles.txtBtn}>{language.PROFILE__COMFIRM_BUTTON}</Text>
            </SinarmasButton>
          </View>
          }
        </View>
      </ScrollView>

    );
  }
}

export default ConfirmEditProfile;