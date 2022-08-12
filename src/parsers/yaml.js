import yaml from 'js-yaml';

const readYaml = (content) => yaml.load(content);

export default readYaml;
