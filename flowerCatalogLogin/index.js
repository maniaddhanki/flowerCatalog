const { createApp } = require('./src/app.js');

const app = createApp({ root: 'public' }, {}, {});

app.listen(8000, () => console.log('listening on port 8000'));
