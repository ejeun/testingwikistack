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

  beforeEach('populate our tables with test data', function() {

  });

  describe('Tags value should be set correctly', function () {

    it('if one tag, then return that tag');

    it('if multiple tags, then return an array of them');
  });

  describe('Hook.......', function () {

    it('if given title, formats the urltitle with no spaces and symbols');
  });

  describe('getter methods (virtual fields)', function () {

    var page;
    beforeEach(function() {
      page = Page.build();
    });

    it('route should return the urltitle with "/wiki/" prepended');
      page.urlTitle = 'test_title';
      expect(page.route).to.be('/wiki/test_title');

    it('renderedContent converts the markdown-formatted content into HTML');
  });

  describe('class method: find by tag', function () {

    it('finds all the pages with the specific tag');

    it('does not return the pages without the specific tag');
  });

  describe('instance method: find similar', function () {

    it('finds all the pages that shares tags with it, excluding itself');
  });
});
