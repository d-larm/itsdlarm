module.exports = {
  apps : [
    {
      name        : "itsdlarm-server",
      script      : "npm",
      args	      : "run start-server",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
      "NODE_ENV": "production"
      }
    }
  ]
}
