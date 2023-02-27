import React from 'react';
import FeedbackGetter from '../../components/FeedbackGetter/FeedbackGetter.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {result} from 'lodash';
import {handleFeedback} from '../../state/thunks/feedback.thunks';
import moment from 'moment';
import {storageKeys, set} from '../../utils/storage.util';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = ({currentLanguage, feedback, user}) => ({
  currentLanguage,
  feedback,
  FeedbackGetter,
  userName: result(user, 'profile.name', ''),
});

const mapDispatchToProps = (dispatch) => ({
  handleFeedback: (action, data) => dispatch(handleFeedback(action, data)),
  closeFeedback: () => {
    const date = new Date();
    const currentDate = moment(date).format('DD MMM YYYY');
    set(storageKeys['FEEDBACK_GIVEN'], currentDate);
    dispatch(NavigationActions.navigate({routeName: 'Main'}));
  }
});

class feedbackPage extends React.Component {
  static propTypes = {
    currentLanguage: PropTypes.object,
    handleFeedback: PropTypes.func,
    feedback: PropTypes.object,
    closeFeedback: PropTypes.func,
    userName: PropTypes.string
  }

  render () {
    const {currentLanguage, feedback, closeFeedback, handleFeedback, userName} = this.props;
    return <FeedbackGetter currentLanguage={currentLanguage} visible={feedback.toggle} userName={userName} onFeedback={handleFeedback} closeFeedback={closeFeedback}/>;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(feedbackPage);