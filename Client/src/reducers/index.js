import { combineReducers } from 'redux';

import auth from './auth';
import cart from './cartReducer';
import errors from './errors';
import messages from './messages';




export default combineReducers({
    auth, cart, errors,
    messages,
});