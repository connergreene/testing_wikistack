var expect = require('chai').expect;
var chai = require('chai');
var expect = chai.expect;
var spy = require('chai-spies');
var models = require('../models/index');
var Page = models.Page;
var User = models.User;
var mongoose = require('mongoose');

chai.use(spy);

// describe("basic functionality", function(){
//     it("has home route", function(){});
//     it("can create a page with title and body", function(){});
//     it("displays all extant pages on the home page", function(){});
//     it("can add tags to pages", function(){});
//     it("can search by tag", function(){});
//     it("pages have author listed", function(){});
//     it("author has own site with all pages", function(){});
//     it("supports markdown text", function(){});
// })

var page, user, otherPage;
describe('Page model', function() {
    beforeEach(function(){
        page = new Page();
        user = new User();
    });

    describe('Validations', function() {
        it('errors without title', function(done) {
            var stuff;
            page.content = "stuff and things";
            page.save(function(error){
            expect(error.name).to.equal('ValidationError');
            done();
            });
        });
        it('errors without content', function(done) {
            var stuff;
            page.title = "Things";
            page.save(function(error){
            expect(error.name).to.equal('ValidationError');
            done();
            });
        });
    });


    describe('Statics', function() {
       // this.timeout(10000);
        before(function(done){
            Page.remove(done);
        })
        before(function(done) {
            Page.create({
                title: 'bleh',
                content: 'and things',
                tags: ['dog', 'foo', 'bar']
            }, done )
        })

        describe('findByTag', function() {
            it('gets pages with the search tag', function(done) {
                Page.findByTag('dog').then(function(results){
                    expect(results[0].title).to.equal('bleh');
                    done();
                })
                .then(null, done);
            });
            it('does not get pages without the search tag', function(done) {
                Page.findByTag('meh').then(function(results){
                    expect(results[0]).to.equal(undefined);
                    done();
                })
                .then(null, done);
            });
        });
    });

    describe('Methods', function() {
        before(function(done){
            Page.remove(done);
        })
        before(function(done){
            Page.create({
                title: 'bleh',
                content: 'and things',
                tags: ['dog', 'foo', 'bar']
            })

            Page.create({
                title: 'meh',
                content: 'and things',
                tags: ['cat', 'drink', 'pub']
            })

            Page.create({
                title: 'eh',
                content: 'and things',
                tags: ['cat', 'eat', 'car']
            }, done )
        })
        describe('findSimilar', function() {
            it('never gets itself', function(done) {
                var originalPage;
                Page.findOne({title: 'meh'}, function(err, page){
                    if(err){
                        console.log(err);
                    }
                    return page;
                }).then(function(page){
                    originalPage = page;
                    return page.findSimilar();
                    
                })
                .then(function(page){
                    expect(page[0]._id).to.not.equal(originalPage._id);
                    done();

                }).then(null, done);
            });
            it('gets other pages with any common tags', function(done) {
                Page.findOne({title: 'meh'}, function(err, page){
                    if(err){
                        console.log(err);
                    }
                    return page;
                }).then(function(page){
                    return page.findSimilar();
                    
                })
                .then(function(page){
                    expect(page[0].title).to.equal('eh');
                    done();

                }).then(null, done);

            });
            it('does not get other pages without any common tags', function(done) {
                Page.findOne({title: 'meh'})
                .then(function(page){
                    return page.findSimilar();
                })
                .then(function(page){
                    expect(page[0].title).to.not.equal('bleh');
                    done();

                }).then(null, done);
            });
        });
    });

    describe('Virtuals', function() {
        before(function(done){
            Page.remove(done);
        })
        before(function(done) {
            Page.create({
                title: 'bleh',
                content: 'and things',
                tags: ['dog', 'foo', 'bar']
            }, done )
        })
        describe('route', function() {
            it('returns the url_name prepended by "/wiki/"', function(done) {
                Page.findOne({title: 'bleh'})
                .then(function(page){
                    expect(page.route).to.equal("/wiki/" + page.title);
                    done();
                }).then(null, done);
            });
        });
    });

    describe('Hooks', function() {
        before(function(done){
            Page.remove(done);
        })
        it('it sets urlTitle based on title before validating', function(done) {
            page.title = "bl!h";
            page.body = "bleh";
            page.validate(function(error) {
                expect(page.urlTitle).to.equal('blh');
                done();
            });
        });
    });

});


























