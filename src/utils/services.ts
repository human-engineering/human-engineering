let env: string
env = 'prod'
// env = 'dev'
export const baseUrl = (env === 'prod') ? 'helabs...' : '192.168.0.11:8080'
