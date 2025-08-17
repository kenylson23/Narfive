module.exports = {
  apps: [{
    name: 'narfive-app',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 8080
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    // Configurações de log
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Configurações de restart
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    
    // Configurações de monitoramento
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'dist'],
    
    // Configurações de performance
    node_args: '--max-old-space-size=1024',
    
    // Configurações de segurança
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
}; 