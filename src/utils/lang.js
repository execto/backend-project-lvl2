import isObjectLodash from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';

const isObject = (value) => isObjectLodash(value) && !isArray(value);

export default isObject;
