import React from 'react';
import PropTypes from 'prop-types';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './ProfileHeader.styles';

const themeEnum = {
  brand: 'brandHeader',
  white: 'whiteHeader'
};

class MGMHeader extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    headerTheme: PropTypes.oneOf(['brand', 'white']),
  }

  goToShareRC = () => this.props.navigate('ShareReferralCode')

  render () {
    const {headerTheme = 'brand'} = this.props;
    return (
      <Touchable style={styles.headerRightIcon} onPress={this.goToShareRC}>
        <SimasIcon name={'offer'} size={24} style={styles[`${themeEnum[headerTheme]}Icon`]}/>
      </Touchable>
    );
  }
}

export default MGMHeader;
