const sample = require('../samples/sample_issue');

const createIssue = (z, bundle) => {
    const streamId = bundle.inputData.streamId;
    //const authKey = bundle.inputData.authKey;

    return z.request({
        method: 'POST',
        url: `https://www.streamr.com/api/v1/streams/${streamId}/data`,
        /*headers: {
            Authorization: "token " + authKey
        },*/
        body: JSON.stringify(bundle.inputData)
    }).then(response => ({ok: 1}));
};

module.exports = {
    key: 'streamr',
    noun: 'Data point',

    display: {
        label: 'Send to Streamr',
        description: 'Send data point to a Streamr stream'
    },

    operation: {
        inputFields: [
            {key: 'streamId', label: 'Stream ID', required: true},
            //{key: 'authKey', label:'API Credentials (write key)', required: true},
            {key: 'newsTitle', label: 'Title', required: true},
            {key: 'newsContent', label: 'Content', required: true},
            {key: 'newsLink', label: 'Link', required: true},
        ],
        perform: createIssue,
        sample: sample
    }
};
