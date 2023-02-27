import feedback from '../feedback.reducer';
import {FEEDBACK_SHOW, FEEDBACK_HIDE} from '../../actions/index.actions';

describe('Reducer: feedback', () => {
  it('Should return default state by default', () => {
    expect(feedback(undefined, '')).toEqual({toggle: false});
  });
  it('Should show feedback if FEEDBACK_SHOW is fired', () => {
    expect(feedback({}, {type: FEEDBACK_SHOW})).toEqual({toggle: true});
  });
  it('Should hide feedback if FEEDBACK_HIDE is fired', () => {
    expect(feedback({}, {type: FEEDBACK_HIDE})).toEqual({toggle: false});
  });
});
