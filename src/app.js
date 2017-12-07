import Global from './global';

const scope = (typeof window !== 'undefined') ? window : ((typeof self !== 'undefined') ? self : {});
scope['Global'] = Global;
