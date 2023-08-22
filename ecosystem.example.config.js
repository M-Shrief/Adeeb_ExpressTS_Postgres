const fs = require('fs');

const jwtPrivateBuffer = fs.readFileSync('./jwtRSA256-private.pem');
const jwtPrivate = Buffer.from(jwtPrivateBuffer).toString('ascii'); // we use ascii to make sure there is no empty line in the end.

module.exports = { // very good docs at http://pm2.keymetrics.io/docs/usage/application-declaration/#attributes-available
    apps: [
      {
        name: "Adeeb_ExpressTS_Postgres",
        instances: 0, // 0 means create instances to number of CPU cores on host
        script: "dist/index.js",
        watch: true,
        ignore_watch: [
          "/[\s\S].spec.js$/", // don't restart on test file change
          "node_modules",
          "docs"
        ],
        exec_mode: "cluster", // or fork
        interpreter_args: "",
        error_file: "/var/tmp/my_application/error.log", // it will be created if nonexistent
        min_uptime: 500,
        max_restarts: 10,
        restart_delay: 1000,
        max_memory_restart: '300M',
        exp_backoff_restart_delay: 100,
        // choose which env with --env (name after _ )
        env_development: {
          NODE_ENV: 'development',
          PORT: 3000,
          DB_NAME: '',
          DB_USER: '',
          DB_PASSWORD: '',
          JWT_PRIVATE: jwtPrivate,
          SECRET_KEY:'',
          LOG_DIR:'./',
          LOG_FORMAT:'',
        },
        env_test: {
          NODE_ENV: 'production',
          PORT: 3000,
          DB_NAME: '',
          DB_USER: '',
          DB_PASSWORD: '',
          JWT_PRIVATE: jwtPrivate,
          SECRET_KEY:'',
          LOG_DIR:'./',
          LOG_FORMAT:'',
        }
      }
    ],
    // Deployment Configuration example
    // deploy : {
    //   production : {
    //       "user" : "ubuntu",
    //       "key"  : "/path/to/some.pem", // path to the public SSL key to authenticate
    //       "user" : "node",              // user used to authenticate
    //       "host" : ["192.168.0.13", "192.168.0.14", "192.168.0.15"], // where to connect
    //       "ref"  : "origin/master",
    //       "repo" : "git@github.com:Username/repository.git",
    //       "path" : "/var/www/my-repository",
    //       // Deployment LifeCycle:
    //       "pre-setup" : "echo 'commands or local script path to be run on the host before the setup process starts'",
    //       "post-setup": "echo 'commands or a script path to be run on the host after cloning the repo'",
    //       "pre-deploy" : "pm2 startOrRestart ecosystem.json --env production",
    //       "post-deploy" : "pm2 startOrRestart ecosystem.json --env production",
    //       "pre-deploy-local" : "echo 'This is a local executed command'"
    //   }
    // }
}