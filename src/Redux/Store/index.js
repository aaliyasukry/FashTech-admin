import {applyMiddleware, createStore, compose} from 'redux';
import {thunk} from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AppReducer from '../Reducers';

const persistConfig = {
    key: 'root',
    storage
};

export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, AppReducer);

const Store = (initialState) => {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        persistedReducer,
        initialState,
        composeEnhancer(
            applyMiddleware(thunk)
        )
    )
    return {
        store,
        persistor: persistStore(store)
    };
};

export default Store;