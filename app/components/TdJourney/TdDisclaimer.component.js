import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './TdDisclaimer.component.style';

class TdDisclaimerForm extends React.Component {

  static propTypes = {
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    extraNoteList: PropTypes.string,
    footNoteList: PropTypes.array
  }

  render () {
    const {footNoteList = []} = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{language.TNC_TD_TITLE}</Text>
          <View style={styles.field}>
            {
              footNoteList.map((word, i) => (
                <View style={styles.row} key={i}>
                  <View style={styles.number}>
                    <Text>{`${i + 1}${'. '}`}</Text>
                  </View>
                  <View style={styles.footNoteList}>
                    <Text>{word}</Text>
                  </View>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TdDisclaimerForm;
