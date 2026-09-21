module.exports = {
  apps: [{
    name: "floratrade",
    cwd: "./",
    script: "node_modules/next/dist/bin/next",
    args: "start --port 3000",
    exec_mode: "cluster",
    instances: "max",
    env: { NODE_ENV: "production", PORT: 3000 },
  }]
}
