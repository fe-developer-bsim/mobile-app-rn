import React from 'react';
import PropTypes from 'prop-types';
import ScoreNilaiQ from '../../components/Account/ScoreNilaiQ.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import noop from 'lodash/noop';

const mapStateToProps = (state) => ({
  currentLanguage: state.currentLanguage.id,
  accounts: result(state, 'accounts', []),
  user: state.user,
  lang: result(state, 'currentLanguage.id', 'id'),
});

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(NavigationActions.back()),
  onOfferClick: (offer) => () => {
    dispatch(NavigationActions.navigate({routeName: 'OfferDetail', params: {offer, isOfferNilaiQ: true}}));
  },
  dispatch: (data) => dispatch(data)
});


class ScoreNilaiQPage extends React.Component {
  static propTypes = {
    goBack: PropTypes.func,
    lang: PropTypes.string,
    navigation: PropTypes.object,
    onOfferClick: PropTypes.func,
  }

  render () {
    const {goBack, lang, navigation, onOfferClick = noop} = this.props;
    const sumScore = result(navigation, 'state.params.valueData.data.sumScore', 0);
    const scoreUpdate = parseInt(result(navigation, 'state.params.valueData.data.scoreUpdate', 0));
    const maxScore = result(navigation, 'state.params.valueData.maxScore', 0);
    const minScore = result(navigation, 'state.params.valueData.minScore', 0);
    const scoreDescription = result(navigation, 'state.params.valueData.scoreDescription', '');
    const scoreCode = result(navigation, 'state.params.valueData.scoreCode', '');
    const offers = result(navigation, 'state.params.valueData.banner', []);
    const dataScore = result(navigation, 'state.params.valueData.data', null);
    return <ScoreNilaiQ goBack={goBack} lang={lang} sumScore={sumScore} scoreUpdate={scoreUpdate} maxScore={maxScore} minScore={minScore} 
      scoreDescription={scoreDescription} offers={offers} onOfferClick={onOfferClick} dataScore={dataScore} scoreCode={scoreCode}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreNilaiQPage);
