var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

var Sequelize = require('sequelize');
var models = require('../models');
var Page = models.Page;

describe('http requests', function () {

  beforeEach('sync and empty our pages table', function() {
    return Page.sync({ force: true });
  });

  describe('GET /wiki/', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki')
      .expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done){
      agent
      .get('/wiki/add')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    beforeEach(function(){
      return Page.create({
        title: 'Coffee',
        content: 'my mom loves coffee.'
      })
    });


    xit('responds with 404 on page that does not exist',  function(done){
      agent
      .get('/wiki/nonexistent_url')
      .expect(404, done);
    });

    it('responds with 200 on page that does exist', function(done){
      agent
      .get('/wiki/Coffee')
      .expect(200, done);
    });

  });

  describe('GET /wiki/search/:tag', function () {

    beforeEach(function() {
       return Page.create({
        title: 'beautiful lakes',
        content: 'Big bodies of water',
        status: 'open',
        tags: 'water,big,landscape'
      })
    });

    it('responds with 200', function(done){
      agent
      .get('/wiki/search/water')
      .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {

     beforeEach(function() {
       return Page.create({
        title: 'beautiful lakes',
        content: 'Big bodies of water',
        status: 'open',
        tags: 'water,big,landscape'
      })
    });

    xit('responds with 404 for page that does not exist', function(done){
      agent
      .get('/wiki/invalid_url/similar')
      .expect(404, done);
    });

    it('responds with 200 for similar page', function(done){
      agent
      .get('/wiki/beautiful_lakes/similar')
      .expect(200, done);
    });

  });

  describe('POST /wiki', function () {

    it('responds with 302', function(done){
      agent
      .post('/wiki')
      .field('title', 'beautiful lakes')
      .field('content', 'Big bodies of water')
      .field('name', 'Harmony')
      .field('email', 'h@gmail.com')
      .expect(302, done);

    });

    xit('creates a page in the database', function(done){
      agent
      .get('/wiki/beautiful_lakes/similar')
      .expect(200, done);
    });

  });

});
