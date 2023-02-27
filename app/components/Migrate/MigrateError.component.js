import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './MigrateError.style';
import {language} from '../../config/language';
import {SinarmasButtonOnboarding} from '../FormComponents';
import SimasIcon from '../../assets/fonts/SimasIcon';

class MigrateErrorComponent extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    isPaydayLoan: PropTypes.string,
    goToHomeScreen: PropTypes.func
  }

  render () {
    const {onPress, isPaydayLoan, goToHomeScreen} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.bodyContainerWithTerms}>
        <View>
          <SimasIcon name={'close-black'} size={30} style={styles.crossBlack}/>
          <View>
            {isPaydayLoan === 'true' ?
              <Text style={styles.titleFormat}>{language.ERROR_PAGE_PAYDAYLOAN_TITLE}</Text> :
              <Text style={styles.titleFormat}>{language.MIGRATE__ERROR_TITLE}</Text>
            }
          </View>
        </View>
        <View>
          {isPaydayLoan === 'true' ?
            <SinarmasButtonOnboarding text={language.MIGRATE__ERROR_BUTTON} onPress={goToHomeScreen}/> :
            <SinarmasButtonOnboarding text={language.MIGRATE__ERROR_BUTTON} onPress={onPress}/>
          }
        </View>
      </ScrollView>
    );
  }
}

export default MigrateErrorComponent;
