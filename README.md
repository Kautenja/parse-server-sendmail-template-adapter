# parse-server-sendmail-template-adapter #

<!-- [![npm version](https://img.shields.io/npm/v/parse-server-sendmail-adapter.svg?style=flat)](https://www.npmjs.com/package/parse-server-sendmail-adapter) -->

This mail adapter for
[Parse Server](https://github.com/parse-community/parse-server) uses
[sendmail](https://www.npmjs.com/package/sendmail) to send emails.

This code is inspired by
[parse-server-sendmail-adapter](https://www.npmjs.com/package/parse-server-sendmail-adapter).

## Installation ##

Put `parse-server-sendmail-template-adapter` in the dependencies object of
your project's `package.json` file.

```json
"dependencies":
{
    "parse-server-sendmail-template-adapter": "^1.0.0"
}
```

## Usage ##

The initializer takes a single object parameter with the following fields:

| Field Name             | Explanation                                                              |
|:-----------------------|--------------------------------------------------------------------------|
| `fromAddress`          | the address to send from (i.e. _noreply@yourdomain.com_)                 |
| `verificationSubject`  | the subject for new account verification emails                          |
| `verificationBody`     | the body for new account verification emails (inline text or a filename) |
| `passwordResetSubject` | the subject for password reset emails                                    |
| `passwordResetBody`    | the body for password reset emails (inline text or a filename)           |

`fromAddress` is the only required field to get setup.

### `mailAdapter` object ###

For readability I confine all the mail adapter configuration items for parse
servers in their own object called `emailAdapter` that I then supply to the
server's constructor.

```javascript
var server = new ParseServer({
    // sends a verification when users add and email to their account
    verifyUserEmails: true,
    // the amount of time they have to reset their password in seconds
    emailVerifyTokenValidityDuration: 2 * 60 * 60,
    // the settings for the mail adapter for the server
    emailAdapter: emailAdapter
});
```

Here are some examples of how to set up the `emailAdapter` object using this
mail adapter with text files, HTML templates, or inline strings.

#### Simple example ####

This example uses the default verification and password reset subjects and
bodies.

```javascript
var emailAdapter =
{
    module: require('parse-server-sendmail-template-adapter'),
    options:
    {
        fromAddress: 'noreply@test.domain.com',
    }
};
```

#### Example using file bodies and inline subjects ####

This example uses HTML files as templates for the body.

```javascript
var emailAdapter =
{
    module: require('parse-server-sendmail-template-adapter'),
    options:
    {
        fromAddress: 'noreply@test.domain.com',
        verificationSubject: 'Confirm your %appname% account',
        verificationBody: 'templates/inlined/verify_email.html',
        passwordResetSubject: 'Reset your %appname% password',
        passwordResetBody: 'templates/inlined/reset_password.html'
    }
};
```

#### Example using inline fields ####

This example uses inline strings to define the body contents of the emails.

```javascript
var emailAdapter =
{
    module: require('parse-server-sendmail-template-adapter'),
    options:
    {
        fromAddress: 'noreply@test.domain.com',
        verificationSubject: 'Confirm your %appname% account',
        verificationBody: `Hi,

        You are being asked to confirm the e-mail address %email% with %appname%

        Click here to confirm it:
        %link%`,
        passwordResetSubject: 'Reset your %appname% password',
        passwordResetBody: `Hi,

        You requested a password reset for %appname%.

        Click here to reset it:
        %link%`
    }
};
```
