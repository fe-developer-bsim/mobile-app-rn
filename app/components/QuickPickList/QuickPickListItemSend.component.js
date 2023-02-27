import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import Touchable from '../Touchable.component';
import styles from './QuickPickListItemSend.style';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {theme} from '../../styles/core.styles';
import {SwipeRow} from 'react-native-swipe-list-view';


class QuickPickListItem extends React.Component {
  render () {
    const {text, subtext, secondaryText, onPress, disabled, onDelete} = this.props;
    return (
      <SwipeRow disableRightSwipe={true} rightOpenValue={-60} swipeToOpenPercent={10}>
        <Touchable onPress={onDelete}>
          <View style={{backgroundColor: theme.brand, justifyContent: 'space-between'}}>
            <SimasIcon name='trash' style={{color: theme.white, alignSelf: 'flex-end', paddingRight: 18, paddingTop: 25, paddingBottom: 35}} size={27}/>        
          </View>    
        </Touchable>
        <Touchable highlightOpacity={100} onPress={onPress} disabled={disabled} style={{backgroundColor: theme.white}}>
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <View style={styles.leftSide}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.subtext}>{subtext}</Text>
              </View>
              <View style={styles.rightSide}>
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              </View>
            </View>
            <SimasIcon name='arrow' style={styles.icon} size={10}/>      
          </View>
        </Touchable>
      </SwipeRow>
    );
  }
}

QuickPickListItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtext: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  secondaryText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,  
  dispatch: PropTypes.func,
  onDelete: PropTypes.func
};

export default QuickPickListItem;
