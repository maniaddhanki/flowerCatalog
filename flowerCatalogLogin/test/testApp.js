const { createApp } = require('../src/app.js');
const request = require('supertest');

const createSession = () => {
  return { sessionId: 12, time: new Date(), username: 'mani' };
};

const logger = () => { };

describe('GET /home-page.html', () => {
  const app = createApp({ root: './public', logger }, {}, {});
  it('Should redirect to login page when there is no session', (done) => {
    request(app)
      .get('/home-page.html')
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('Should create a session for user and redirect to home page', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .post('/login')
      .send('username=mani')
      .expect(302)
      .expect('')
      .expect('location', '/read-comments', done)
  });

  it('should redirect to home page without creating a session when one is existing', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const app = createApp({ root: './public', logger }, { [sessionId]: session }, {});
    request(app)
      .post('/login')
      .send('username=mani')
      .set('cookie', 'sessionId=12')
      .expect(302)
      .expect('already logged in')
      .expect('location', '/', done)
  });
});

describe('POST /signup', () => {
  it('Should register a user new user signs up', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .post('/signup')
      .send('username=avs')
      .expect('succesfull')
      .expect(200, done)
  });

  it('should not register user if already exists', (done) => {
    const users = { avs: { username: 'avs', password: 'avs' } }
    const app = createApp({ root: './public', logger }, {}, users);
    request(app)
      .post('/signup')
      .send('username=avs')
      .expect('User already exists')
      .expect(405, done)
  });
});
