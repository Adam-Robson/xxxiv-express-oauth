const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const Post = require('../lib/models/Post.js');

jest.mock('../lib/services/github');

describe('post', () => {
  beforeEach(() => {
    return setup(pool);
  });
  

  it('GET allows authenticated user to veiw all posts', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/callback?code=42');
    const res = await agent.get('/api/v1/posts');
    expect(res.status).toEqual(200);
  })
  it('POST /api/v1/post creates a new post for signed in user', async () => {
    const agent = request.agent(app);
    const user = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    const newPost = { description: 'new post there', user_id: user.body.id };
    const res = await agent.post('/api/v1/post').send(newPost);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      description: newPost.description,
      user_id: newPost.user_id,
    });
  });

  it('GET /api/v1/post should return a list of posts if logged in', async () => {
    const agent = request.agent(app);
    const user = await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    const newPost = await Post.insert({
      description: 'new post here',
      user_id: user.body.id,
    });
    const res = await agent.get('/api/v1/post');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual(newPost);
  });

  afterAll(() => {
    pool.end();
  });

});
