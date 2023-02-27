import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './MigrateEnded.style';
import {language} from '../../config/language';
import {SinarmasButtonOnboarding} from '../FormComponents';
import checkLogoWhite from '../../assets/images/white-checked-success.png';

class MigrateComponent extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
  }

  render () {
    const {onPress} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.bodyContainerWithTerms}>
        <View>
          <View>
            <Image source={checkLogoWhite} style={styles.mainCheckLogo}/>
            <Text style={styles.titleFormat}>{language.MIGRATE__CONGRATULATION} , </Text>
            <Text style={styles.titleFormat}>{language.MIGRATE__CONGRATULATION_SUB_TITLE}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{language.MIGRATE__CONGRATULATION_MAIN_TITLE}</Text>
          </View>
        </View>
        <View>
          <SinarmasButtonOnboarding text={language.MIGRATE__BUTTON_LAST_PAGE} onPress={onPress}/>
        </View>
      </ScrollView>
    );
  }
}

export default MigrateComponent;
