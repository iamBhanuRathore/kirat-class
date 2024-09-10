module.exports = {
  apps: [
    {
      //port :1100
      name: "weather-app",
      cwd: "D:/kirat-class/appsquadz/weather-app",
      script: "",
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ["node_modules", "public"],
      max_memory_restart: "200M",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
