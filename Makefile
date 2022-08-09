install:
	npm ci

lint:
	npx eslint .

test:
	npm run test

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js