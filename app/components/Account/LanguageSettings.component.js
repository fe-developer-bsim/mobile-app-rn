import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import styles from './LanguageSettings.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import noop from 'lodash/noop';


class AccountSettings extends React.Component {
  static propTypes = {
    resetAndNavigate: PropTypes.func,
    changeCurrentLanguage: PropTypes.func,
    currentLanguage: PropTypes.string,    
  }

  render () {
    const {changeCurrentLanguage = noop, currentLanguage} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container} style={styles.fullContainer} extraHeight={120}>      
        <View>
          <Touchable onPress={changeCurrentLanguage('id')}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text>Bahasa Indonesia</Text>
              </View>
              {
                currentLanguage === 'id' ?
                  <SimasIcon style={styles.checked} name='check-black' size={25}/>
                  :
                  null 
              }
            </View>
          </Touchable>
        </View>
        <View style={styles.greyLine} />        
        <View>
          <Touchable onPress={changeCurrentLanguage('en')}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text>English</Text>
              </View>
              {
                currentLanguage === 'en' ?
                  <SimasIcon style={styles.checked} name='check-black' size={25}/>
                  :
                  null 
              }
            </View>
          </Touchable>
        </View>
        <View style={styles.greyLine} /> 
      </ScrollView>
    );
  }
}

export default AccountSettings;
