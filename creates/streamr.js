const sample = require('../samples/sample_issue');

const createDatapoint = (z, bundle) => {
    const streamId = bundle.inputData.streamId;

    return z.request({
        method: 'POST',
        url: `https://www.streamr.com/api/v1/streams/${streamId}/data`,
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
            { key: 'streamId', label: 'Stream ID', required: true },
            { key: 'data', label: 'Data', dict: true, required: true },
        ],
        perform: createDatapoint,
        sample: sample
    }
};
