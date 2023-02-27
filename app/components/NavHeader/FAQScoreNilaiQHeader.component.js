import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './FAQScoreNilaiQHeader.styles';
import {NavigationActions} from 'react-navigation';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';

class NavLeftLogo extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    tutorialOnboard: PropTypes.object
  }

  goToNextPage = () => {
    const {dispatch} = this.props;
    dispatch(NavigationActions.navigate({routeName: 'FAQScoreNilaiQ'}));
  }


  render () {
    // const {tutorialOnboard} = this.props;
    // const tutorialON = result(tutorialOnboard, 'tutorialON', '');
    // const order = result(tutorialOnboard, 'order', '');

    return (
      <Touchable onPress={this.goToNextPage}>
        <View style={styles.mr10}>
          <Text style={styles.textRed}>{language.BURGER_MENU__FAQ}</Text>
        </View>
      </Touchable>
    );
  }
}

export default NavLeftLogo;
