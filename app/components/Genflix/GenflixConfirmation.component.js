import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import TransactionSummary from './TransactionSummary.component';
import result from 'lodash/result';
import styles from './GenflixConfirmation.styles';
import {language} from '../../config/language';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import {SinarmasButton} from '../FormComponents';
import noop from 'lodash/noop';

class GenflixConfirmation extends Component {
  static propTypes = {
    navParams: PropTypes.object,
    handleSubmit: PropTypes.func,
  }
  render () {
    const {navParams, handleSubmit = noop} = this.props;
    const payer = result(navParams, 'account', {});
    const biller = result(navParams, 'biller', {});
    const notes = result(navParams, 'notes', {});
    return (
      <ScrollView>
        <View style={styles.container}>
          <TransactionSummary payer={payer} target={biller} txType={'genericBiller'}/>
          <Text style={[styles.notes, styles.notesCore]}>{language.GENFLIX__NOTES1}</Text>
          <Text style={[styles.subNotes, styles.notesCore]}>{language.GENFLIX__NOTES_SUBSCRIPTIION1}</Text>
          <Text style={[styles.subNotes, styles.notesCore]}>{language.GENFLIX__NOTES_SUBSCRIPTIION2}</Text>
          <Text style={[styles.disclaimer, styles.notesCore]}>{language.GENFLIX__NOTES2}</Text>
        </View>
        <View style={styles.greyLine} />
        <View style={styles.labelSpacing}/>
        <View style={styles.container}>
          <View>
            {map(notes, (obj, k) => {
              const key = result(obj, 'key', '');
              const value = result(obj, 'value', '');
              return (
                <View key={k}>
                  <View><Text style={styles.rightItemHeader}>{key}</Text></View>
                  <View><Text style={styles.robotoLight}>{value}</Text></View>
                  <View style={[styles.mv5]}/>
                </View>);
            }
            )}
          </View>
          <View style={styles.labelSpacing}/>
          <SinarmasButton text={language.GENERIC__CONTINUE} onPress={handleSubmit}/>
        </View>
      </ScrollView>
    );
  }
}

export default GenflixConfirmation;