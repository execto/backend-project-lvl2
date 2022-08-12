import readJson from './json.js';
import readYaml from './yaml.js';

const readers = {
  '.json': readJson,
  '.yml': readYaml,
  '.yaml': readYaml,
};

export default readers;
