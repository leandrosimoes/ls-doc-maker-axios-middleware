const isProduction = process.argv.indexOf('production') > -1;
const mode = isProduction ? 'production' : 'development';

module.exports = {
    mode,
    entry: {
        '../dist/index': './src/index',
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader'
            }
        ]
    },
    target: 'node'
};