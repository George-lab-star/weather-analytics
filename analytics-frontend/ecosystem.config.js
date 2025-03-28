module.exports = {
  apps: [{
    name: 'Weather Analytics',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000', //running on port 3000
    cwd: "./app",
    instances: 1,
    watch: false,
  }]
};
