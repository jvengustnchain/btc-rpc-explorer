module.exports = {

  // Edit "rpc" below to target your node.
  // You may delete this section if you wish to connect manually via the UI.

  rpc: {
    host: process.env.RPC_HOST,
    port: process.env.RPC_PORT,
    username: process.env.RPC_USER,
    password: process.env.RPC_PASS,
  },

  apiServer: {
    host: "localhost",
    port: 8080
  },

  // optional: enter your api access key from ipstack.com below
  // to include a map of the estimated locations of your node's
  // peers
  ipStackComApiAccessKey: "",

  // optional: GA tracking code
  googleAnalyticsTrackingId: "",

  // optional: sentry.io error-tracking url
  sentryUrl: "",
};
