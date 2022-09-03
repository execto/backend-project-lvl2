import isObjectLodash from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';
import isFunction from 'lodash/isFunction.js';

const isObject = (value) => isObjectLodash(value) && !isArray(value) && !isFunction(value);

export default isObject;
