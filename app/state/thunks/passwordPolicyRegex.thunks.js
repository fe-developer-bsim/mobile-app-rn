import * as actionCreators from '../actions/index.actions.js';
import api from '../../utils/api.util';
import result from 'lodash/result';
import {getErrorMessage} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {language} from '../../config/language';

// PASSWORC POLICY THUNKS
export function getRegexPasswordPolicy () {
  return (dispatch) => api.getRegexPasswordPolicy(dispatch).then((res) => {
    dispatch(actionCreators.savePasswordPolicy(result(res, 'data', {})));
  }).
    catch((err) => {
      Toast.show(getErrorMessage(err, language.ERROR_MESSAGE__PASSWORD_COULD_NOT_SET), Toast.LONG);
      throw err;
    });
}
