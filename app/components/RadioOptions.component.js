import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Touchable from './Touchable.component';
import {theme} from '../styles/core.styles';

const commonButton = {
  paddingBottom: 5,
  paddingHorizontal: 10
};
const styles = {
  container: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  touchWrapper: {
    paddingHorizontal: 10
  },
  button: {
    ...commonButton,
    borderBottomWidth: theme.bottomBorderRegular,
    borderBottomColor: theme.primaryUnHighlighted
  },
  selectedButton: {
    ...commonButton,
    borderBottomWidth: theme.bottomBorderHighlighted,
    borderBottomColor: theme.primary
  },
  buttonText: {
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightLight
  }
};

const selectItemCallback = (fn, index, val) => () => fn(index, val);

const RadioOptions = (props) => {
  const {
    list = [],
    selectedIndex,
    onChange,
    input
  } = props;
  const selectedVal = input.value || selectedIndex || 0;
  return (
    <View style={styles.container}>
      {
        list.map((item, i) => (
          <Touchable style={styles.touchWrapper} key={i} onPress={selectItemCallback(onChange || input.onChange, i, list[i])}>
            <View style={(selectedVal === i)
              ? styles.selectedButton
              : styles.button}>
              <Text style={styles.buttonText}>{item}</Text>
            </View>
          </Touchable>
        ))
      }
    </View>
  );
};
RadioOptions.propTypes = {
  list: PropTypes.array,
  selectedIndex: PropTypes.string,
  onChange: PropTypes.func,
  input: PropTypes.object
};
export default RadioOptions;
