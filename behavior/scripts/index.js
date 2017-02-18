'use strict'

exports.handle = (client) => {
  // Create steps
  const collectUser = client.createStep({
    extractInfo() {
      let user = client.getFirstEntityWithRole(client.getMessagePart(), 'name')

      if (user) {
        client.updateConversationState({
          name: user,
        })
        console.log(client.getConversationState().name);
      }
    },

    satisfied() {
      console.log(client.getConversationState().name);
      return Boolean(client.getConversationState().name)
    },

    prompt() {
      console.log(client.getConversationState().name);
      client.addResponse('prompt_name')
      client.done()
    }
  })

  const confirmUser = client.createStep({
    satisfied() {
      return false // This forces the step to be activated
    },

    prompt() {
      client.addResponse('print_name', {
        name: client.getConversationState().name,
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
