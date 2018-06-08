const repoTrigger = require('./triggers/repo');
const issueCreate = require('./creates/issue');
const streamrCreate = require('./creates/streamr');
const issueTrigger = require('./triggers/issue');

const handleHTTPError = (response, z) => {
  if (response.status >= 400) {
    throw new Error(`Unexpected status code ${response.status}`);
  }
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: {
      type: "custom",
      test: { url: "https://www.streamr.com/api/v1/users/me" },
      connectionLabel: '{{name}} (Streamr)',
      fields: [{
          key: 'api_key',
          type: 'string',
          required: true,
          helpText: 'Create an API key for Zapier on the Profile page.'
      }]
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
      (request, z, bundle) => {
          request.headers.Authorization = "token " + bundle.authData.api_key;
          return request;
      }
  ],

  afterResponse: [
    handleHTTPError
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [repoTrigger.key]: repoTrigger,
    [issueTrigger.key]: issueTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [issueCreate.key]: issueCreate,
    [streamrCreate.key]: streamrCreate
  }
};

// Finally, export the app.
module.exports = App;
