const { execSync } = require('child_process')
const fs = require('fs')

// 解析 .env 文件
const configList = fs
  .readFileSync('.env.development')
  .toString()
  .split('\n')
  .filter((item) => item && !item.startsWith('#'))
  .map((item) => {
    const temp = item.split('=')
    temp[1] = temp[1].replace(/'|"/g, '')
    return temp
  })

// 获取 VUE_APP_BASE_URL
// const swaggerUrl = `${
//   configList.find((item) => item[0] === 'VUE_APP_BASE_URL')[1]
// }swagger/v1/swagger.json`

const swaggerUrl = `${configList.find((item) => item[0] === 'VITE_API_SWAGGER_API')[1]}api-json`

console.log('🚀 ~ swaggerUrl:', swaggerUrl)
execSync(
  `java -jar ./generator/openapi-generator-cli-6.0.0.jar generate -i ${swaggerUrl} -g typescript-axios -o ./src --additional-properties=withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models --global-property models`,
  { stdio: 'inherit' }
)
execSync('prettier --write ./src/models', { stdio: 'inherit' })
