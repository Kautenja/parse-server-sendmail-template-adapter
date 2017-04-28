/*jshint esversion: 6 */

/// Using Expect style
const {expect} = require('chai');

// a sanity test to confirm mocha's functionality
describe('Sanity', function()
{
    it('should verify that 1 == 1', function()
    {
        expect(1).to.equal(1);
    });
});
