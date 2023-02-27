import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import Touchable from '../../components/Touchable.component';
import {language} from '../../config/language';
import styles from './TutorialContent.component.styles';

export default class TutorialContent extends Component {
  static propTypes = {
    finish: PropTypes.func,
    next: PropTypes.func,
    order: PropTypes.number,
    text: PropTypes.string
  }

  render () {
    const {next, finish, text, order} = this.props;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.contentText}>{text}</Text>
          {
            order === 0 ?
              <View style={styles.row}>
                <View/>
                <Touchable onPress={next}>
                  <Text style={styles.redText}>{language.BUTTON__START}</Text>
                </Touchable>
              </View>
              : order === 1 ?
                <View style={styles.row}>
                  <View/>
                  <Touchable onPress={next}>
                    <Text style={styles.redText}>{language.BUTTON__START}</Text>
                  </Touchable>
                </View>
                : order === 2 ?
                  <View style={styles.row}>
                    <View/>
                    <Touchable onPress={next}>
                      <Text style={styles.redText}>{language.BUTTON__START}</Text>
                    </Touchable>
                  </View>
                  : order === 3 ?
                    <View style={styles.row}>
                      <View/>
                      <Touchable onPress={next}>
                        <Text style={styles.redText}>{language.BUTTON__START}</Text>
                      </Touchable>
                    </View>
                    :
                    <View style={styles.row}>
                      <View/>
                      <Touchable onPress={finish}>
                        <Text style={styles.redText}>{language.BUTTON__FINISH}</Text>
                      </Touchable>
                    </View>
          }
        </View>
      </ScrollView>
    );
  }
}
