import React from 'react';
import PropTypes from 'prop-types';
import LuckyDrawTnC from '../../components/LuckyDraw/LuckyDrawTnC.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const mapDispatchToProps = (dispatch) => ({
  openAccount: () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDrawScreen'}));
  },
});

const mapStateToProps = ({config, currentLanguage}) => ({
  config,
  currentLanguage
});

class QROnboardPage extends React.Component {
  static propTypes = {
    openAccount: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
    navigation: PropTypes.object,
  }

  render () {
    const {openAccount, config, currentLanguage} = this.props;
    const lang = result(currentLanguage, 'id', 'id');
    const url = lang === 'en' ? result(config, 'attention.urlFAQCustSegment', '') : result(config, 'attention.urlFAQCustSegment', '');
    return <LuckyDrawTnC openAccount={openAccount} url={url}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QROnboardPage);
