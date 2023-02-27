import English from './English';
import Bahasa from './Bahasa';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {set, storageKeys, getLanguage} from '../../utils/storage.util';

const current = {
  id: 'id'
};

let language = {};

const languageMap = {
  en: {id: 'en', label: 'English', translation: English},
  id: {id: 'id', label: 'Bahasa', translation: Bahasa}
};

module.exports = {
  get language () {
    const selectedLangugage = languageMap[result(current, 'id', 'id')];
    const displayLanguage = selectedLangugage.id === 'id' ? result(language, '[0]value', {}) : result(language, '[1]value', {});
    return isEmpty(language) ?  selectedLangugage.translation : displayLanguage;
  },
  setCurrentLang (languageId) {
    set(storageKeys['LANGUAGE'], languageId);
    current.id = languageId;
    return languageId;
  },
  initLanguage () {
    getLanguage().then((res) => {
      language = res;
    });
  },
  languageMap
};

