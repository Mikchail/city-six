import {combineReducers} from 'redux';
import {reducer as offers} from './cities-reduser.js';
import {reducer as sort} from './sort-reducer.js';
import {NameSpace} from '../constants';


export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.SORT]: sort,
});
