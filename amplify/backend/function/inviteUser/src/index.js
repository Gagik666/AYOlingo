const sendEmail = require('./sendEmail')

exports.handler = async (event) => {
    let response;
    try {
        await sendEmail(event.body)
        response = {
            statusCode: 200,
            body: JSON.stringify('Email sent successfully'),
        }
    } catch (e) {
        console.log(e, ' error')
        response = {
            statusCode: 200,
            body: JSON.stringify('Something went wrong'),
        }
    }
    return response
};
