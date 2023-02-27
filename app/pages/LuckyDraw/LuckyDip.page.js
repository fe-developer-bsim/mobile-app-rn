import React from 'react';
import PropTypes from 'prop-types';
import LuckyDip from '../../components/LuckyDraw/LuckyDip.component';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {getSpinRewards, getSpinRewardsNew} from '../../utils/api.util';
import {emptyBoxModal} from '../../state/thunks/luckyDip.thunks';
import {lowerCase} from '../../utils/transformer.util';

const mapDispatchToProps = (dispatch) => ({
  openAccount: () => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDrawScreen'}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  dispatch,
  goToFillInformation: (pathRoute, reward, transRefNum) => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipInformationPage', params: {pathRoute, reward, transRefNum}}));
  },
  emptyBoxModal: () => {
    dispatch(emptyBoxModal());
  }
});

const mapStateToProps = (state) => ({
  luckyDipCounter: result(state, 'counterLuckyDip.currentToken', ''),
  luckyDipAllcounter: result(state, 'counterLuckyDip', ''),
  tokenId: result(state, 'counterLuckyDip.tokenId', '0'),
  luckyDipCache: result(state, 'getLuckyDipCache', {}),
  luckyDipMultiTierFlag: lowerCase(result(state, 'config.flag.flagHHHMultiTier', 'inactive')) === 'active'
});

class QROnboardPage extends React.Component {
  static propTypes = {
    openAccount: PropTypes.func,
    currentLanguage: PropTypes.object,
    config: PropTypes.object,
    navigation: PropTypes.object,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    couponCounterDetail: PropTypes.number,
    dispatch: PropTypes.func,
    goToFillInformation: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    tokenId: PropTypes.string,
    emptyBoxModal: PropTypes.func,
    luckyDipCache: PropTypes.object,
    luckyDipAllcounter: PropTypes.object,
    luckyDipMultiTierFlag: PropTypes.bool
  }
  goToFillInformation=(reward, transRefNum) => {
    const {goToFillInformation, navigation} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    goToFillInformation(pathRoute, reward, transRefNum);
  }

  
  render () {
    const {showSpinner, hideSpinner, dispatch, luckyDipCounter, tokenId, emptyBoxModal, luckyDipCache, luckyDipAllcounter, luckyDipMultiTierFlag} = this.props;
    return <LuckyDip getSpinRewards={getSpinRewards} getSpinRewardsNew={getSpinRewardsNew} tokenId={tokenId} goToFillInformation={this.goToFillInformation} dispatch={dispatch} showSpinner={showSpinner} hideSpinner={hideSpinner}
      luckyDipCounter={luckyDipCounter} emptyBoxModal={emptyBoxModal} luckyDipCache={luckyDipCache} luckyDipAllcounter={luckyDipAllcounter} luckyDipMultiTierFlag={luckyDipMultiTierFlag}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QROnboardPage);
