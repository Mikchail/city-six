import { combineReducers } from 'redux';
import { reducer as offers } from './cities-reducer.js';
import { reducer as sort } from './sort-reducer.js';
import { reducer as review } from './review-reducer.js';
import { NameSpace } from '../constants';


export default combineReducers({
    [NameSpace.OFFERS]: offers,
    [NameSpace.SORT]: sort,
    [NameSpace.REVIEW]: review,
});
