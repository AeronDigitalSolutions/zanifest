/** @type {import('next').NextConfig} */

const fs = require("fs");
const gracefulFs = require("graceful-fs");
gracefulFs.gracefulify(fs);

const nextConfig = {
  reactStrictMode: true,
    outputFileTracingRoot: __dirname, // set root explicitly

  // other settings
};

module.exports = nextConfig;
