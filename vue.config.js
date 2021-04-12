module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: [
          {
            provider: "github",
            owner: "patrickhahn497"
          }
        ]
      }
    }
  }
}
