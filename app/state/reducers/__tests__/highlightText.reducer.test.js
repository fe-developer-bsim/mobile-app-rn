import highlightText from '../highlightText.reducer';
import {HIGHLIGHT_NETWORK_BAR, RESET_NETWORK_BAR} from '../../actions/index.actions';

describe('Reducer: highlightText', () => {
  it('Should return default state by default', () => {
    expect(highlightText(undefined, '')).toEqual(false);
  });
  it('Should highlightText if HIGHLIGHT_NETWORK_BAR is fired', () => {
    expect(highlightText({}, {type: HIGHLIGHT_NETWORK_BAR})).toEqual(true);
  });
  it('Should un-highlightText if RESET_NETWORK_BAR is fired', () => {
    expect(highlightText({}, {type: RESET_NETWORK_BAR})).toEqual(false);
  });
});
