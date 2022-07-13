const { createApp } = require('../src/app.js');
const request = require('supertest');

const createSession = () => {
  return { sessionId: 12, time: new Date(), username: 'mani' };
};

describe('GET /home-page.html', () => {
  const app = createApp({ root: './public' }, {}, {});
  it('Should redirect to login page when there is no session', (done) => {
    request(app)
      .get('/home-page.html')
      .expect(302, done)
      .expect('location', '/login')
  });

  it('should send home page when user loged in', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const app = createApp({ root: './public' }, { [sessionId]: session }, {});
    request(app)
      .get('/home-page.html')
      .set('cookie', 'sessionId=12')
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('Should create a session for user and redirect to home page', (done) => {
    const app = createApp({ root: './public' }, {}, {});
    request(app)
      .post('/login')
      .send('username=mani')
      .expect(302)
      .expect('')
      .expect('location', '/home-page.html', done)
  });

  it('should redirect to home page without creating a session when one is existing', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const app = createApp({ root: './public' }, { [sessionId]: session }, {});
    request(app)
      .post('/login')
      .send('username=mani')
      .set('cookie', 'sessionId=12')
      .expect(302)
      .expect('already logged in')
      .expect('location', '/protected', done)
  });
});

describe('POST /signup', () => {
  it('Should register a user new user signs up', (done) => {
    const app = createApp({ root: './public' }, {}, {});
    request(app)
      .post('/signup')
      .send('username=avs&password=avs')
      .expect('succesfull')
      .expect(200, done)
  });
  it('should not register user if already exists', (done) => {
    const users = { avs: { username: 'avs', password: 'avs' } }
    const app = createApp({ root: './public' }, {}, users);
    request(app)
      .post('/signup')
      .send('username=avs&password=avs')
      .expect('User already exists')
      .expect(405, done)
  });
});
