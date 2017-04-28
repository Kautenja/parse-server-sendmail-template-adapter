/*jshint esversion: 6 */

/// Using Expect style
const {expect} = require('chai');
var MailAdapter = require('../index');

// arbitrary values for testing assignment
const ARB_EMAIL = 'noreply@test.com';
const ARB_VERIF_SUB = 'Test Verification Subject';
const ARB_VERIF_BOD = 'Test Verification Body';
const ARB_PSWRD_SUB = 'Test Password Reset Subject';
const ARB_PSWRD_BOD = 'Test Password Reset Body';


var DEF_VERIF_SUB = 'Please verify your e-mail for %appname%';
var DEF_VERIF_BOD = `Hi,

You are being asked to confirm the e-mail address %email% with %appname%

Click here to confirm it:
%link%`;

var DEF_PWRD_SUB = 'Password Reset Request for %appname%';
var DEF_PWRD_BOD = `Hi,

You requested a password reset for %appname%.

Click here to reset it:
%link%`;

describe('initialize with `fromAddress` missing in options object', function()
{
    it('should raise an error', function()
    {
        // options with nothing in them
        var options = {};
        // the function to initialize the adapter
        var initializer = function() { MailAdapter(options); };
        // expect the initializer to throw an error
        expect(initializer).to.throw(Error);
    });
});

describe('initialize with email', function()
{
    it('should setup with the default email subjects and bodies', function()
    {
        var options = { fromAddress: ARB_EMAIL };
        var adapter = MailAdapter(options);
        expect(adapter.options.fromAddress).to.equal(ARB_EMAIL);
        expect(adapter.options.verificationSubject).to.equal(DEF_VERIF_SUB);
        expect(adapter.options.verificationBody).to.equal(DEF_VERIF_BOD);
        expect(adapter.options.passwordResetSubject).to.equal(DEF_PWRD_SUB);
        expect(adapter.options.passwordResetBody).to.equal(DEF_PWRD_BOD);
    });
});

describe('initialize with inline subject and bodies', function()
{
    it('should set the templates to the inline text', function()
    {
        var options =
        {
            fromAddress: ARB_EMAIL,
            verificationSubject: ARB_VERIF_SUB,
            verificationBody: ARB_VERIF_BOD,
            passwordResetSubject: ARB_PSWRD_SUB,
            passwordResetBody: ARB_PSWRD_BOD
        };
        var adapter = MailAdapter(options);
        expect(adapter.options.fromAddress).to.equal(ARB_EMAIL);
        expect(adapter.options.verificationSubject).to.equal(ARB_VERIF_SUB);
        expect(adapter.options.verificationBody).to.equal(ARB_VERIF_BOD);
        expect(adapter.options.passwordResetSubject).to.equal(ARB_PSWRD_SUB);
        expect(adapter.options.passwordResetBody).to.equal(ARB_PSWRD_BOD);
    });
});

describe('initialize with with bodies from file', function()
{
    it('should set the templates to the text in the files', function()
    {
        const VERIF_FILE_NAME = 'test/test_verif.txt';
        const VERIF_FILE_CONT = 'I am the body of the test verification file.\n';
        const PSWRD_FILE_NAME = 'test/test_pswrd.txt';
        const PSWRD_FILE_CONT = 'I am the body of the test password reset file.\n';

        var options =
        {
            fromAddress: ARB_EMAIL,
            verificationSubject: ARB_VERIF_SUB,
            verificationBody: VERIF_FILE_NAME,
            passwordResetSubject: ARB_PSWRD_SUB,
            passwordResetBody: PSWRD_FILE_NAME
        };
        var adapter = MailAdapter(options);
        expect(adapter.options.fromAddress).to.equal(ARB_EMAIL);
        expect(adapter.options.verificationSubject).to.equal(ARB_VERIF_SUB);
        expect(adapter.options.verificationBody).to.equal(VERIF_FILE_CONT);
        expect(adapter.options.passwordResetSubject).to.equal(ARB_PSWRD_SUB);
        expect(adapter.options.passwordResetBody).to.equal(PSWRD_FILE_CONT);
    });
});
