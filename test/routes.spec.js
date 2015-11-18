var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

var expect = require('chai').expect;
var chai = require('chai');
var expect = chai.expect;
var spy = require('chai-spies');
var models = require('../models/index');
var Page = models.Page;
var User = models.User;
var mongoose = require('mongoose');
var marked = require('marked');
var bluebird = require('bluebird');

describe('http requests', function() {

    describe('GET /', function() {
        it('gets 200', function(done) {
        	agent
        		.get('/')
        		.expect(200, done)
        	});
        });
    describe('GET /wiki/add', function () {
        it('gets 200', function (done) {
        	agent
        		.get('/wiki/add')
        		.expect(200, done)
        	});
        });
    describe('GET /wiki/:urlTitle', function(){
        it('gets 404 on page that doesnt exist', function(done) {
        	agent
        		.get('/wiki/literallyanything')
        		.expect(404, done)
        	});
        it('gets 200 on page that does exist', function(done) {
        	agent
        		.get('/wiki/blh')
        		.expect(200, done)
        	});
        });

    describe('GET /wiki/search', function() {
        xit('gets 200', function() {});
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        xit('gets 404 for page that doesn\'t exist', function() {});
        xit('gets 200 for similar page', function() {});
    });


    describe('GET /wiki/add', function() {
        xit('gets 200', function() {});
    });


    describe('POST /wiki/add', function() {
        xit('creates in db', function() {});
    });

});