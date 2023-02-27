import {View, Text, Image} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './SourceMerchant.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';

class EmallAccounts extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    icon: PropTypes.string,
    getConfirmation: PropTypes.func,
    billerLKD: PropTypes.object
  }

  render () {
    const {getConfirmation, name, icon} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120}>
        <View>
          <Touchable onPress={getConfirmation}>
            <View style={styles.bgWhite}>
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <Image source={{uri: icon}} style={styles.imageOffer2}/>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.pad2}>
                    <Text style={styles.nameTxt}>{name}</Text>
                  </View>
                </View>
                <View style={styles.arrowContainer}>
                  <SimasIcon name={'arrow'} size={15} style={styles.arrowIcon}/>
                </View>
              </View>
            </View>
          </Touchable>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default EmallAccounts;
