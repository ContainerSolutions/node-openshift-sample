var request = require('supertest')
describe('loading express', function() {
	var server;
	beforeEach(function() {
		server = require('../app');
	});
	afterEach(function () {
		// todo, close?
	});
	it('responds to /', function testSlash(done) {
		request(server)
			.get('/')
			.expect(200, done);
	});
	it('responds to /ping', function testPing(done) {
		request(server)
			.get('/ping')
			.expect(200, done);
	});
	it('404s elsewhere', function testPath(done) {
		request(server)
			.get('/fake/path')
			.expect(404, done);
	});
});