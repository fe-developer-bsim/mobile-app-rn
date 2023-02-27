import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import noop from 'lodash/noop';
import styles from './StarRater.component.style';
import map from 'lodash/map';
import Touchable from '../Touchable.component';

class StarRater extends React.Component {
  static propTypes = {
    onRating: PropTypes.func,
    currentRating: PropTypes.number,
    style: PropTypes.object
  }
  onStarClick = (rating) => () => {
    const {onRating = noop} = this.props;
    return onRating(rating);
  }
  render () {
    const vm = this;
    const {currentRating} = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.wrapper}>
          {      
            map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (eachRating) => {
              const selectionStyle1 = (currentRating === eachRating) ? styles.selected : eachRating === 0 || eachRating === 1 || eachRating === 2 ?  styles.unSelected1 : eachRating === 3 || eachRating === 4 || eachRating === 5 ? styles.unSelected2 : eachRating === 6 || eachRating === 7 ? styles.unSelected3 : eachRating === 8 || eachRating === 9 ? styles.unSelected4 : styles.unSelected5;
              const selectionStyle2 = (currentRating === eachRating) ? styles.selected2 :  eachRating === 0 || eachRating === 1 || eachRating === 2 ?  styles.unSelected1 : eachRating === 3 || eachRating === 4 || eachRating === 5 ? styles.unSelected2 : eachRating === 6 || eachRating === 7 ? styles.unSelected3 : eachRating === 8 || eachRating === 9 ? styles.unSelected4 : styles.unSelected5;
              const selectionStyle3 = (currentRating === eachRating) ? styles.selected3 :  eachRating === 0 || eachRating === 1 || eachRating === 2 ?  styles.unSelected1 : eachRating === 3 || eachRating === 4 || eachRating === 5 ? styles.unSelected2 : eachRating === 6 || eachRating === 7 ? styles.unSelected3 : eachRating === 8 || eachRating === 9 ? styles.unSelected4 : styles.unSelected5;
              const selectionStyle4 = (currentRating === eachRating) ? styles.selected4 :  eachRating === 0 || eachRating === 1 || eachRating === 2 ?  styles.unSelected1 : eachRating === 3 || eachRating === 4 || eachRating === 5 ? styles.unSelected2 : eachRating === 6 || eachRating === 7 ? styles.unSelected3 : eachRating === 8 || eachRating === 9 ? styles.unSelected4 : styles.unSelected5;
              const selectionStyle5 = (currentRating === eachRating) ? styles.selected5 :  eachRating === 0 || eachRating === 1 || eachRating === 2 ?  styles.unSelected1 : eachRating === 3 || eachRating === 4 || eachRating === 5 ? styles.unSelected2 : eachRating === 6 || eachRating === 7 ? styles.unSelected3 : eachRating === 8 || eachRating === 9 ? styles.unSelected4 : styles.unSelected5;
              const numSelections1 = (currentRating === eachRating) ? styles.numSelect1 : styles.numUnselect1;
              const numSelections2 = (currentRating === eachRating) ? styles.numSelect1 : styles.numUnselect2;
              const numSelections3 = (currentRating === eachRating) ? styles.numSelect1 : styles.numUnselect3;
              const numSelections4 = (currentRating === eachRating) ? styles.numSelect1 : styles.numUnselect4;
              const numSelections5 = (currentRating === eachRating) ? styles.numSelect1 : styles.numUnselect5;
                
              return (
                <View>
                  <Touchable key={eachRating} onPress={vm.onStarClick(eachRating)}>
                    <View style={eachRating === 0 || eachRating === 1 || eachRating === 2 || currentRating === 0 || currentRating === 1 || currentRating === 2 ? 
                      [styles.star, selectionStyle1] 
                      :
                      eachRating === 3 || eachRating === 4 || eachRating === 5 || currentRating === 3 || currentRating === 4 || currentRating === 5 ? 
                        [styles.star2, selectionStyle2] 
                        :
                        eachRating === 6 || eachRating === 7 || currentRating === 6 || currentRating === 7 ? 
                          [styles.star3, selectionStyle3] 
                          :
                          eachRating === 8 || eachRating === 9 || currentRating === 8 || currentRating === 9 ?
                            [styles.star4, selectionStyle4]
                            :
                            [styles.star5, selectionStyle5]
                    }>
                      <Text style ={eachRating === 0 || eachRating === 1 || eachRating === 2 ? 
                        numSelections1
                        : eachRating === 3 || eachRating === 4 || eachRating === 5 ? 
                          numSelections2 
                          : eachRating === 6 || eachRating === 7 ?
                            numSelections3
                            : eachRating === 8 || eachRating === 9 ?
                              numSelections4
                              : 
                              numSelections5}>
                        {eachRating}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              );
            })
          }
        </View>
      </View>
     
    );
  }
}

export default StarRater;
