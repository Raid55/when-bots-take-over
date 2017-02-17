'use strict'

exports.handle = (client) => {
  // Create steps
  const collectUser = client.createStep({
    extractInfo() {
      let user = firstOfEntityRole(client.getMessagePart(), 'name')

      if (user) {
        client.updateConversationState({
          user: user,
        })
      }
    },

    satisfied() {
      return Boolean(client.getConversationState().name)
    },

    prompt() {
      client.addResponse('prompt_name')
      client.done()
    }
  })

  const confirmUser = client.createStep({
    satisfied() {
      return false // This forces the step to be activated
    },

    prompt() {
      client.addResponse('say_name', {
        user: client.getConversationState().name,
      })
      client.done()
    }
  })

  client.runFlow({
    classifications:{
      start:'test/start'
    },
    streams: {
      start: collectUser,
      collectName: [collectUser],
      main:"collectUser",
      nameAndConfirmUser: ['collectName', confirmUser]
    }
  })
}
