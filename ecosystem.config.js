module.exports = {
  apps: [{
    name: 'Reviews-SDC',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-191-213-234.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/SDC-Reviews-Service.pem',
      ref: 'origin/master',
      repo: 'git@github.com:Dine-Divine/Reviews-SDC.git',
      path: '/home/ubuntu/Reviews-SDC',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}