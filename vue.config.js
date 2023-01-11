module.exports = {
    lintOnSave: false,
    pluginOptions:{
        electronBuilder:{
            builderOptions:{
                win:{
                    target:'nsis'
                },
                nsis:{
                    oneClick:false,
                    allowToChangeInstallationDirectory : true
                }
            }
            ,
            nodeIntegration:true
        }
    },
    publicPath: "./",    //这是部署后访问的路径

    devServer: {

  
        proxy: {

            '/api': {

                target: 'http://localhost:8081',

                ws: true,

                changeOrigin: true,

                pathRewrite: {

                    '^/api': ' '   //正则表达式

                }

            }

        }

    }

}