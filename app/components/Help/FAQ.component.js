import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import styles from './FAQ.styles';

class FAQComponent extends React.Component {
  static propTypes = {
    FAQcontent: PropTypes.array
  }

  render () {
    const {FAQcontent = []} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.content}>
        {FAQcontent.map((FAQcontent, i) => (
          <View key={i}>
            <View style={styles.row}>
              <View style={styles.serialNoContainer}><Text key={i} style={styles.number}>{i + 1}.</Text></View>
              <View style={styles.contentContainer}>
                <Text style={styles.pageTitle}>{FAQcontent.question}</Text>
                <Text style={styles.pageSubtitle}>{FAQcontent.answer}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default FAQComponent;
