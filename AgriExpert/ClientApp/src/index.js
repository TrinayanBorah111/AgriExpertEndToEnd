import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import allReducer from '../src/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer
} from 'redux-persist';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'expertDetails',
    storage,
};
const persistedReducer = persistReducer(persistConfig, allReducer);
const store = createStore(
    persistedReducer,
    composeWithDevTools(),
            
);
let persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
