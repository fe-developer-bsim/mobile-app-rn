import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Linking, Text} from 'react-native';
import noop from 'lodash/noop';
import styles from './AppVersionUpdator.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {Toast} from '../../utils/RNHelpers.util';
import Touchable from '../../components/Touchable.component';
import {language} from '../../config/language';
import {appStoreUrl} from '../../config/platform.config';
import update from '../../assets/images/update.png';

class AppVersionUpdator extends React.Component {
  static propTypes = {
    isOptionalUpdate: PropTypes.bool,
    closeHandler: PropTypes.func,
    lang: PropTypes.string,
    updateNote: PropTypes.object
  }

  openStoreURL = () => {
    Linking.canOpenURL(appStoreUrl).then((supported) => {
      if (supported) {
        Linking.openURL(appStoreUrl);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  }

  renderNote = (item) => (
    <View style={styles.row}>
      <Text style={styles.textAdd}>{language.SEPARATOR_POINT}</Text>
      <Text style={styles.textAdd}>{item}</Text>
    </View>
  )

  render () {
    const {closeHandler = noop, isOptionalUpdate, updateNote} = this.props;
    const arrayNote = Object.values(updateNote);
    return (
      <View style={styles.innerContainerStyles}>
        <View>
          <Image source={update} style={styles.background}/>
        </View>
        <View style={styles.contentText}>
          <Text style={styles.upperText}>{language.APP_UPDATOR__DOWNLOAD_TEXT}</Text>
          <Text style={styles.textAdd}>{language.APP_UPDATOR__DOWNLOAD_TEXT_1}</Text>
          {arrayNote.map(this.renderNote)}
        </View>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            {isOptionalUpdate && <Touchable style={styles.crossButtonWrapper} onPress={closeHandler}>
              <SimasIcon name='close' style={styles.iconStyle} size={25}/>
            </Touchable>}
          </View>
        </View>
        <View style={styles.footer}>
          <SinarmasButton text={language.APP_UPDATOR__DOWNLOAD} onPress={this.openStoreURL}/>
        </View>
      </View>
    );
  }
}

export default AppVersionUpdator;
