const generate = require('critical').generate;

module.exports = async function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
        await generate({
            base: './_site/',
            html: 'index.html',
            target: {
                css: 'inline-critical.css',
                uncritical: './dist/assets/css/style.css',
            },
            width: 1920,
            height: 1080,
            penthouse: {
                blockJSRequests: false,
            },
        });
    }

    return content;
}