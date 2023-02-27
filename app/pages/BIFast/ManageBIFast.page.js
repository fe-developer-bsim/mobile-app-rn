import React from 'react';
import PropTypes from 'prop-types';
import ManageBIFast from '../../components/BIFast/ManageBIFast.component';
import {result} from 'lodash/';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  accList: result(state, 'inquiryProxyByEDW.responseInquiryProxyByEDW.body.response.alias')
});

const mapDispatchToProps = (dispatch) => ({
  addProxyBIFast: () => {
    dispatch(NavigationActions.navigate({routeName: 'AddProxyBIFast'}));
  },
  editProxyBIFast: () => {
    dispatch(NavigationActions.navigate({routeName: 'EditProxyBIFast'}));
  },
  unlinkProxyBIFast: () => {
    dispatch(NavigationActions.navigate({routeName: 'UnlinkProxyBIFast'}));
  },
  faqBiFast: () => {
    dispatch(NavigationActions.navigate({routeName: 'FAQformBiFast'}));
  },
  backBiFast: () => dispatch(NavigationActions.back()),
});

class ManageBIFastDetail extends React.Component {
  static propTypes = {
    addProxyBIFast: PropTypes.func,
    editProxyBIFast: PropTypes.func,
    unlinkProxyBIFast: PropTypes.func,
    transferViaProxyBIFast: PropTypes.func,
    accList: PropTypes.object,
    faqBiFast: PropTypes.func,
    backBiFast: PropTypes.func,
  }

  render () {
    const {addProxyBIFast, editProxyBIFast, unlinkProxyBIFast, accList, faqBiFast, backBiFast} = this.props;
    return <ManageBIFast addProxyBIFast={addProxyBIFast} editProxyBIFast={editProxyBIFast} unlinkProxyBIFast={unlinkProxyBIFast} accList={accList} faqBiFast={faqBiFast} backBiFast={backBiFast}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageBIFastDetail);
