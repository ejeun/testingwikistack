var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

var Sequelize = require('sequelize');
var models = require('../models');
var Page = models.Page;

describe('Page model', function () {

  beforeEach('sync and empty our pages table', function() {
    return Page.sync({ force: true });
  });

  describe('Validations', function () {

    var page1;

    beforeEach(function() {
        page1 = Page.build({
        // title: '',
        // content: 'A mythical creature',
        // tags: 'big,foot,mythical'
      });
    });

    it('errors without title', function(done) {

        page1.validate()
        .then(function(err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[0].path).to.equal('title');
          done();
        })
    });

    it('errors without content', function(done) {

      page1.validate()
        .then(function(err) {
          expect(err).to.exist;
          expect(err.errors).to.exist;
          expect(err.errors[2].path).to.equal('content');
          done();
        })
    });

    it('errors given an invalid status', function() {
      Page.create({
        title: 'hello',
        content: 'this is a greeting',
        status: 'finished'
      })
        .then(function(newPage) {})
        .catch(function(err){
          expect(err.message).to.equal('invalid input value for enum enum_pages_status: "finished"');
        })
    });

  });

  describe('Hook.......', function () {

    var page1;

    beforeEach(function(done) {
       Page.create({
        title: 'beautiful lakes',
        content: 'Big bodies of water',
        status: 'open',
        tags: 'water,big,landscape'
      })
       .then(function(newPage) {
        page1 = newPage;
        done();
       })
       .catch(done);
    });

    it('if given title, formats the urltitle with no spaces and symbols', function(){

      expect(page1.urlTitle).to.be.equal('beautiful_lakes');

    });
  });

  describe('getter methods (virtual fields)', function () {

    var page;
    beforeEach(function() {
      page = Page.build();
    });

    it('route should return the urltitle with "/wiki/" prepended', function () {
      page.urlTitle = 'test_title';
      expect(page.route).to.be.equal('/wiki/test_title');
    });


    it('renderedContent converts the markdown-formatted content into HTML');
  });

  describe('class method: find by tag', function () {

    beforeEach(function(done) {
       Page.create({
        title: 'Lakes',
        content: 'Big bodies of water',
        status: 'open',
        tags: 'water,big,landscape'
      })
       .then(function() {
        done();
       })
       .catch(done);
    });


    it('finds all the pages with the specific tag', function () {
      return Page.findByTag('water')
              .then(function(foundPages) {
                var justTitles = foundPages.map(function (page) {
                  return page.title;
                });
                return justTitles;
              })
              .then(function(pages) {
                expect(pages).to.be.deep.equal(['Lakes']);
              })
    });

    it('does not return the pages without the specific tag', function () {
       return Page.findByTag('fish')
              .then(function(foundPages) {
                var justTitles = foundPages.map(function (page) {
                  return page.title;
                });
                return justTitles;
              })
              .then(function(pages) {
                expect(pages).to.be.deep.equal([]);
              })
    });
  });

  describe('instance method: find similar', function () {

    var page1, page2, page3;

    beforeEach(function() {

      page1 = Page.create({
        title: 'Bigfoot',
        content: 'A mythical creature',
        status: 'open',
        tags: 'big,foot,mythical'
      })

      page2 = Page.create({
        title: 'Mountain',
        content: 'A big landscape feature',
        status: 'closed',
        tags: 'big'
      })

      page3 = Page.create({
        title: 'Fish',
        content: 'A creature that lives in water',
        status: 'open',
        tags: 'water,gills'
      })


      return Promise.all([
        page1,
        page2,
        page3
        ])
      .then(function(pages) {
        page1 = pages[0];
        page2 = pages[1];
        page3 = pages[2];
      });

    });



    it('finds all the pages that shares tags with it, excluding itself', function () {
      return page1.findSimilar()
      .then(function(foundPages) {
        var justTitles = foundPages.map(function (page) {
          return page.title;
        });
        return justTitles;
      })
      .then(function(pages) {
        expect(pages).to.be.deep.equal(['Mountain']);
      });

    });
  });
});









