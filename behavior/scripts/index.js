'use strict'

exports.handle = (client) => {
  // Create steps
  const collectUser = client.createStep({
    extractInfo() {
      let user = firstOfEntityRole(client.getMessagePart(), 'user')

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
      client.done()
    }
  })

  client.runFlow({
    streams: {
      main: 'nameAndConfirmUser',
      collectName: [collectUser],
      nameAndConfirmUser: ['collectName', confirmUser]
    }
  })
}
