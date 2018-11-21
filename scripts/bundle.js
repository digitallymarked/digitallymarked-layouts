const {fork} = require('child_process');

const isProduction = process.env.NODE_ENV === 'production';
const command = isProduction ? 'build' : 'watch';
const detailedReport = isProduction ? ['--detailed-report'] : [];

// fork('./node_modules/.bin/parcel', [
// 	command,
// 	'src/extension/index.js',
// 	'--target',
// 	'node',
// 	'--out-dir',
// 	'extension',
// 	'--public-url',
// 	'./',
// 	...detailedReport,
// ])

fork('./node_modules/.bin/parcel', [
	command,
	'src/dashboard/*.html',
	'--out-dir',
	'dashboard',
	'--public-url',
	'./',
	...detailedReport,
])

fork('./node_modules/.bin/parcel', [
	command,
	'src/graphics/*/*.html',
	'--out-dir',
	'graphics',
	'--public-url',
	'./',
	...detailedReport,
])
