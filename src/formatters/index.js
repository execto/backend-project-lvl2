import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const getFormatter = (formatter) => {
  const selectedFormatter = formatters[formatter];
  if (!selectedFormatter) {
    throw new Error('unavailable formatter');
  }

  return selectedFormatter;
};

export default getFormatter;
