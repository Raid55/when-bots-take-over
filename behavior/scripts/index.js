'use strict'

exports.handle = (client) => {
  // Create steps
  const collectUser = client.createStep({
    extractInfo() {
      let user = client.getFirstEntityWithRole(client.getMessagePart(), 'name')

      if (user) {
        client.updateConversationState({
          user: user,
        })
        console.log(user);
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
      start_test:'start_test'
    },
    streams: {
      start_test: [collectUser, confirmUser],
      main:'start_test'
    }
  })
}
