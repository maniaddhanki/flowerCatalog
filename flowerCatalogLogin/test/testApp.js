const { createApp } = require('../src/app.js');
const assert = require('assert');
const request = require('supertest');

const createSession = () => {
  return { sessionId: 12, time: new Date(), username: 'mani' };
};

const logger = () => { };

describe('GET /home-page.html', () => {
  const app = createApp({ root: './public', logger }, {}, {});
  it('should give home-page', (done) => {
    request(app)
      .get('/home-page.html')
      .expect(200, done)
      .expect('content-type', 'text/html')
      .expect('content-length', '929')
      .expect(/home page/)
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
      .expect('location', '/guest-book', done)
  });

  it('should redirect to home page without creating a session when one is existing', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const app = createApp({ root: './public', logger }, { [sessionId]: session }, {});
    request(app)
      .post('/login')
      .send('username=mani')
      .set('Cookie', `sessionId=${sessionId}`)
      .expect(302)
      .expect('already logged in')
      .expect('location', '/', done)
  });
});

describe('GET /logout', () => {
  it('Should logout user and remove session from sessions', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const sessions = { [sessionId]: session };
    const app = createApp({ root: './public', logger }, sessions, {});
    request(app)
      .get('/logout')
      .set('Cookie', `sessionId=${sessionId}`)
      .expect(200)
      .expect('set-cookie', 'id=0;max-age=0')
      .end(() => {
        assert.deepStrictEqual(sessions, {});
        done();
      })
  });
});

describe('GET /api', () => {
  it('should give comments json', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .get('/api')
      .expect('content-type', /json/)
      .expect(200)
      .expect(/\[.*\]/, done)
  });
});

describe('Get /guest-book', () => {
  it('Should redirect to login page when user is not loged in', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .get('/guest-book')
      .expect(302)
      .expect('location', '/login')
      .expect('login to guest book', done)
  });

  it('should give comments html page if user is loged in', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const sessions = { [sessionId]: session };
    const app = createApp({ root: './public', logger }, sessions, {});
    request(app)
      .get('/guest-book')
      .set('Cookie', `sessionId=${sessionId}`)
      .expect(200)
      .expect('content-type', /html/)
      .expect(/Guest Book/, done)
  });
});

describe('POST /guest-book', () => {
  it('Should redirect to login page when user is not loged in', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .post('/guest-book')
      .expect(302)
      .expect('location', '/login')
      .expect('login to guest book', done)
  });

  it('should give comments html page if user is loged in', (done) => {
    const session = createSession();
    const sessionId = session.sessionId;
    const sessions = { [sessionId]: session };
    const app = createApp({ root: './public', logger }, sessions, {});
    request(app)
      .post('/guest-book')
      .set('Cookie', `sessionId=${sessionId}`)
      .send('name=avs&comment=avs')
      .expect(201, done)
  });
});

describe('GET /hello', () => {
  it('Should give not found', (done) => {
    const app = createApp({ root: './public', logger }, {}, {});
    request(app)
      .get('/hello')
      .expect(404)
      .expect('Not found', done)
  });
});
