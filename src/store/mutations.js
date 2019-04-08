import {app} from '../main'

export const setUserInfo = (state, userInfo) => {
    state.userInfo = userInfo;
};

export const setCustomers = (state, customers) => {
    state.customers = customers;
};

export const setLang = (state, payload) => {
    state.lang = payload;
    app.$i18n.locale = payload; // 改變語言
};

export const setItemList = (state, itemList) => {
    state.itemList = itemList;
};
