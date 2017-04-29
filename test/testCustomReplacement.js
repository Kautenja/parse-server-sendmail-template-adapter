/*jshint esversion: 6 */

/// Using Expect style
const {expect} = require('chai');
var MailAdapter = require('../index');
var Parse = require('parse');

// arbitrary values for testing assignment
const ARB_EMAIL = 'noreply@test.com';


describe('delimit a string', function()
{
    it('should return the string delimited by the DELIMITER', function()
    {
        var options = { fromAddress: ARB_EMAIL };
        var adapter = MailAdapter(options);
        expect(adapter.delimited('something')).to.equal('%something%');
    });
});

describe('replace default items in a text block', function()
{
    var input = `
     appname:  %appname%
     link:     %link%
     username: %username%
     email:    %email%`;

    var expected = `
     appname:  Test App
     link:     Test Link
     username: Test Username
     email:    Test Email`;

    var user = new Parse.User();
    user.set('email', 'Test Email');
    user.set('username', 'Test Username');

    var items =
    {
        appName: "Test App",
        link:    "Test Link",
        user:    user
    };
    it('should return the string delimited by the DELIMITER', function()
    {
        var options = { fromAddress: ARB_EMAIL };
        var adapter = MailAdapter(options);
        console.log(adapter.fillVariables(input, items));
        expect(adapter.fillVariables(input, items)).to.equal(expected);
    });
});

describe('replace custom user options', function()
{
    var input = `
     firstName:  %firstName%
     lastName:   %lastName%
     phone:      %phone%`;

    var expected = `
     firstName:  Test First Name
     lastName:   
     phone:      800-000-0000`;

    var user = new Parse.User();
    user.set('firstName', 'Test First Name');
    user.set('phone', '800-000-0000');

    var items = { user: user };

    it('should return the string delimited by the DELIMITER', function()
    {
        var options =
        {
            fromAddress: ARB_EMAIL,
            userFields: ["firstName", "lastName", "phone"]
        };
        var adapter = MailAdapter(options);
        console.log(adapter.fillVariables(input, items));
        expect(adapter.fillVariables(input, items)).to.equal(expected);
    });
});
