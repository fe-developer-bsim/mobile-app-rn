import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './Profile.styles';
import noop from 'lodash/noop';
import {language, languageMap} from '../../config/language';
import {SinarmasPicker} from '../../components/FormComponents';
import NavListItem from '../NavListItem/NavListItem.component';
import startCase from 'lodash/startCase';
import result from 'lodash/result';

class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    options: PropTypes.array,
    navigateTo: PropTypes.func.isRequired,
    navigateToOffers: PropTypes.func,
    changeLanguage: PropTypes.func.isRequired,
    currentLanguage: PropTypes.object,
    navigateToSimasPoin: PropTypes.func
  }

  onChange = (val) => {
    this.props.changeLanguage(val.id);
  }

  render () {
    const options = [{
      linkedToPage: 'ValidatePassword',
      params: {
        nextRouteName: 'CreateNewPassword'
      },
      text: language.PROFILE__OPTION_CHANGE_PASSWORD
    }, {
      linkedToPage: 'ChangeEasyPinNew',
      text: language.PROFILE__OPTION_CHANGE_EASYPIN
    }];

    const {user = {}, navigateTo = noop, currentLanguage, navigateToOffers, navigateToSimasPoin} = this.props;
    const currentLanguageLabel = languageMap[result(currentLanguage, 'id', 'id')].label;
    const listOfLanguages = Object.values(languageMap);
    return (
      <View>
        <View style={styles.headingSection}>
          <Text style={styles.name}>{startCase(result(user, 'title', '').toLowerCase())}. {user.name}</Text>
          <View style={styles.nameLine} />
          <Text style={styles.userInfo}>{user.loginName}</Text>
          {user.phoneNo && <Text style={styles.userInfo}>{user.phoneNo}</Text>}
          <Text style={styles.userInfo}>{user.email}</Text>
        </View>
        <ScrollView style={styles.optionsList}>
          {options.map((option, i) => (
            <NavListItem key={i}
              onPress={navigateTo(option.linkedToPage, option.params)}
              theme='plain'
              label={option.text} />
          ))}
          <View style={styles.optionsListItem}>
            <View style={styles.titleContainer}>
              <Text style={styles.optionText}>{language.PROFILE__SELECT_LANGUAGE}</Text>
            </View>
            <View style={styles.infoContainer}>
              <SinarmasPicker
                currentValue={currentLanguageLabel}
                labelKey='label'
                itemList={listOfLanguages}
                onValChange={this.onChange}
                pickerStyle={styles.selectLanguageStyle}
                arrowPickerStyle={styles.arrowPickerStyle}
                textPickerStyle={styles.textPickerStyle}
              />
            </View>
          </View>
          <NavListItem onPress={navigateToOffers} theme='plain' label={language.PROFILE__OPTION_OFFERS} />
          <NavListItem onPress={navigateToSimasPoin} theme='plain' label={language.PROFILE__SIMAS_POIN_HEAD} />
        </ScrollView>
      </View>);
  }
}

export default Profile;
