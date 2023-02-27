import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './QuickPickListSearchItem.style';

const QuickPickListSearchItem = ({text, subtext, secondaryText, onPress, disabled, ...extraProps}) =>
  (<Touchable onPress={onPress} disabled={disabled}>
    <View style={styles.container} {...extraProps}>
      <View style={styles.textContainer}>
        <View style={styles.leftSide}>
          <Text style={styles.text}>{text}</Text>
          {subtext ?
            <Text style={styles.subtext}>{subtext}</Text>
            : null }
        </View>
        {secondaryText ?
          <View style={styles.rightSide}>
            <Text style={styles.secondaryText}>{secondaryText}</Text>
          </View>
          : null }
      </View>
    </View>
  </Touchable>);

QuickPickListSearchItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtext: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondaryText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default QuickPickListSearchItem;
