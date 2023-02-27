import React from 'react';
import PropTypes from 'prop-types';
import AutoDebitListSearch from '../../components/Account/AutoDebitListSearch.component';
import result from 'lodash/result';
import {connect} from 'react-redux';

class AutoDebitListSearchPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    billerConfig: PropTypes.object,
    billerFavorite: PropTypes.array,
    autoDebitList: PropTypes.object
  }

  render () {
    const {navigation, autoDebitList} = this.props;
    const data = result(navigation, 'state.params', {});
    const historyAutodebitList = result(autoDebitList, 'list', []);
    return <AutoDebitListSearch data={data} autoDebitList={historyAutodebitList} />;
  }
}
const mapStateToProps = (state) => ({
  autoDebitList: result(state, 'autoDebitList', []),
});


export default connect(mapStateToProps, null)(AutoDebitListSearchPage);
