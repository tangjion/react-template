const path = require('path')

module.exports = {
	mode: 'development',
	entry: {
		carlist: 'src/entry/carlist.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	}
}