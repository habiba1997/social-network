import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

// const configureStoreOptions = {
//     /**
//    * A single reducer function that will be used as the root reducer, or an
//    * object of slice reducers that will be passed to `combineReducers()`.
//    */
//   reducer: Reducer<S, A> | ReducersMapObject<S, A>,

//    /**
//    * An array of Redux middleware to install. If not supplied, defaults to
//    * the set of middleware returned by `getDefaultMiddleware()`.
//      If this option is provided, it should contain all the middleware functions you want added to the store. configureStore will automatically pass those to applyMiddleware.
// Redux Middleware allows you to intercept every action sent to the reducer so you can make changes to the action or cancel the action. Middleware helps you with logging, error reporting, making asynchronous requests, and a whole lot more
//    */
//     middleware?: ((getDefaultMiddleware: CurriedGetDefaultMiddleware<S>) => M) | M,

//      /**
//    * Whether to enable Redux DevTools integration. Defaults to `true`.
//    *
//    * Additional configuration can be done by passing Redux DevTools options
//    */
// If this is a boolean, it will be used to indicate whether configureStore should automatically enable support for the Redux DevTools browser extension.
// If it is an object, then the DevTools Extension will be enabled, and the options object will be passed to composeWithDevtools(). See the DevTools Extension docs for EnhancerOptions for a list of the specific options that are available.

// Defaults to true.
//   devTools?: boolean | DevToolsOptions

//   /**
//    * The initial state, same as Redux's createStore.
//    * You may optionally specify it to hydrate the state
//    * from the server in universal apps, or to restore a previously serialized
//    * user session. If you use `combineReducers()` to produce the root reducer
//    * function (either directly or indirectly by passing an object as `reducer`),
//    * this must be an object with the same shape as the reducer map keys.
//    */
//   preloadedState?: DeepPartial<S extends any ? S : S>

//   /**
//    * The store enhancers to apply. See Redux's `createStore()`.
//    * All enhancers will be included before the DevTools Extension enhancer.
//    * If you need to customize the order of enhancers, supply a callback
//    * function that will receive the original array (ie, `[applyMiddleware]`),
//    * and should return a new array (such as `[applyMiddleware, offline]`).
//    * If you only need to add middleware, you can use the `middleware` parameter instead.
//    */
//   enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback
// }

const configureStoreOptions = {
  reducer: rootReducer,
  devtools: true,
  preloadedState: initialState,
  enhancers: composeWithDevTools(applyMiddleware(...middleware)),
};

//A friendly abstraction over the standard Redux createStore function that adds good defaults to the store setup for a better development experience.
const store = configureStore(configureStoreOptions);
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

export default store;
