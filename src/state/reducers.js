import {
  combineReducers,
} from 'redux';

import {
  threeBoxReducer,
} from './reducer-user';

export default combineReducers({
  threeBox: threeBoxReducer,
});
