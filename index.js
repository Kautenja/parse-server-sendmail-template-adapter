// this adapter uses `sendmail` to transmit emails
var sendmail = require('sendmail')();

// default values for verification emails
// the subject of the email
var VERIF_SUBJECT = 'Please verify your e-mail for %appname%';
// the contents of the email
var VERIF_BODY = `Hi,

You are being asked to confirm the e-mail address %email% with %appname%

Click here to confirm it:
%link%`;

// default values for password reset emails
// the subject of the email
var PWRD_SUBJECT = 'Password Reset Request for %appname%';
// the contents of the email
var PWRD_BODY = `Hi,

You requested a password reset for %appname%.

Click here to reset it:
%link%`;

// setup a new adapter with the given options
var SendmailTemplateAdapter = sendmailOptions =>
{
	// ensure a from address is supplied
	if (!sendmailOptions.fromAddress)
	{
		throw 'SendmailTemplateAdapter requires fromAddress.';
	}

	// replace templates with defaults if they are None
	sendmailOptions.verificationSubject = sendmailOptions.verificationSubject || VERIF_SUBJECT;
	sendmailOptions.verificationBody = sendmailOptions.verificationBody || VERIF_BODY;
	sendmailOptions.passwordResetSubject = sendmailOptions.passwordResetSubject || PWRD_SUBJECT;
	sendmailOptions.passwordResetBody = sendmailOptions.passwordResetBody || PWRD_BODY;

	/**
	 * Replace the variables in the string with the given data options and
	 * return the new string.
	 * @param  {string}  text the text whomst've text to replace
	 * @param  {json}    options the options to pull variables from
	 * @return {string}  the formatted string with replacements made
	 */
	function fillVariables(text, options)
	{
		text = text.replace("%username%", options.user.get("username"));
		text = text.replace("%email%", options.user.get("email"));
		text = text.replace("%firstName%", options.user.get("firstName"));
		text = text.replace("%appname%", options.appName);
		text = text.replace("%link%", options.link);
		return text;
	}

	/**
	 * Send a verification email with the given objects
	 * @param  {json}     options the options with the environment for the email
	 * @return {Promise}  a promise to resolve with the asynchronous send event
	 */
	var sendVerificationEmail = options =>
	{
		return new Promise((resolve, reject) =>
		{
			sendmail(
			{
				from: sendmailOptions.fromAddress,
				to: options.user.get("email"),
				subject: fillVariables(sendmailOptions.verificationSubject, options),
				html: fillVariables(sendmailOptions.verificationBody, options)
			},
			function(err, reply)
			{
				if (err)
				{
					reject(err);
				}
				resolve(reply);
			});
		});
	}

	/**
	 * Send a password reset email with the given objects
	 * @param  {json}     options the options with the environment for the email
	 * @return {Promise}  a promise to resolve with the asynchronous send event
	 */
	var sendPasswordResetEmail = options =>
	{
		return new Promise((resolve, reject) =>
		{
			sendmail(
			{
				from: sendmailOptions.fromAddress,
				to: options.user.get("email"),
				subject: fillVariables(sendmailOptions.passwordResetSubject, options),
				html: fillVariables(sendmailOptions.passwordResetBody, options)
			},
			function(err, reply)
			{
				if (err)
				{
					reject(err);
				}
				resolve(reply);
			});
		});
	}

	/**
	 * Send a custom email with the given objects
	 * @param  {json}     mail the options with the environment for the email
	 * @return {Promise}  a promise to resolve with the asynchronous send event
	 */
	var sendMail = mail =>
	{
		return new Promise((resolve, reject) =>
		{
			sendmail(
			{
				from: sendmailOptions.fromAddress,
				to: mail.to,
				subject: mail.subject,
				html: mail.text
			},
			function(err, reply)
			{
				if (err)
				{
					reject(err);
				}
				resolve(reply);
			});
		});
	}

	// return an immutable form of this object
	return Object.freeze(
	{
		sendVerificationEmail: sendVerificationEmail,
		sendPasswordResetEmail: sendPasswordResetEmail,
		sendMail: sendMail
	});
}
// export the adapter
module.exports = SendmailTemplateAdapter
