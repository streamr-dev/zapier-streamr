const streamrCreate = require('./creates/streamr');

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

  resources: { },
  triggers: { },
  searches: { },
  creates: {
    [streamrCreate.key]: streamrCreate
  }
};

// Finally, export the app.
module.exports = App;
