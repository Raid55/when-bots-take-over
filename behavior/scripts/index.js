'use strict'

exports.handle = (client) => {
  // Create steps
  const collectUser = client.createStep({
    extractInfo() {
      console.log('1 USER',client.getMessagePart());
      let user = client.getFirstEntityWithRole(client.getMessagePart(), 'name')
      console.log('2 USER',user);
      console.log('3 USER',client.getFirstEntityWithRole());

      if (user) {
        client.updateConversationState({
          name: user,
        })
        console.log('3 USER',client.getConversationState().name);
      }
    },

    satisfied() {
      console.log('4 USER',client.getConversationState().name);
      return Boolean(client.getConversationState().name)
    },

    prompt() {
      console.log('5 USER',client.getConversationState().name);
      client.addResponse('ask_for_info/pharma')
      client.done()
    }
  })

  const collectAddress = client.createStep({
    extractInfo() {
      console.log('1 ADRESS',client.getMessagePart());
      let pharmaAdress = client.getFirstEntityWithRole(client.getMessagePart(), 'adress')
      console.log('2 ADRESS',pharmaAdress);
      console.log('3 ADRESS',client.getFirstEntityWithRole());

      if (pharmaAdress) {
        client.updateConversationState({
          adress: pharmaAdress,
        })
        console.log('4 ADRESS',client.getConversationState().adress);
      }
    },

    satisfied() {
      console.log('5 ADRESS',client.getConversationState().adress);
      return Boolean(client.getConversationState().adress)
    },

    prompt() {
      console.log('6 ADRESS',client.getConversationState().adress);
      client.addResponse('ask_for_info/phone')
      client.done()
    }
  })
  const collectPhone = client.createStep({
    extractInfo() {
      console.log('1 PHONE',client.getMessagePart());
      let phoneNum = client.getFirstEntityWithRole(client.getMessagePart(), 'phone-number/phone')
      console.log('2 PHONE',phoneNum);
      console.log('3 PHONE',client.getFirstEntityWithRole(client.getMessagePart(), 'phone-number/phone'));

      if (phoneNum) {
        client.updateConversationState({
          'phone-number/phone': phoneNum,
        })
        console.log('4 PHONE',client.getConversationState()['phone-number/phone']);
      }
    },

    satisfied() {
      console.log('5 PHONE',client.getConversationState()['phone-number/phone']);
      return Boolean(client.getConversationState()['phone-number/phone'])
    },

    prompt() {
      console.log('6 PHONE',client.getConversationState()['phone-number/phone']);
      client.addResponse('final_response')
      client.done()
    }
  })
  // const collectSwag = client.createStep({
  //   extractInfo() {
  //     console.log('1 swag',client.getMessagePart());
  //     let phoneNum = client.getFirstEntityWithRole(client.getMessagePart(), 'phone-number/phone')
  //     console.log('2 swag',phoneNum);
  //     console.log('3 swag',client.getFirstEntityWithRole(client.getMessagePart(), 'phone-number/phone'));
  //
  //     if (phoneNum) {
  //       client.updateConversationState({
  //         'phone-number/phone': phoneNum,
  //       })
  //       console.log('4 swag',client.getConversationState()['phone-number/phone']);
  //     }
  //   },
  //
  //   satisfied() {
  //     console.log('5 swag',client.getConversationState()['phone-number/phone']);
  //     return Boolean(client.getConversationState()['phone-number/phone'])
  //   },
  //
  //   prompt() {
  //     console.log('6 swag',client.getConversationState()['phone-number/phone']);
  //     client.addResponse('final_response')
  //     client.done()
  //   }
  // })

  const beyondMe = client.createStep({
    satisfied() {
      return false // This forces the step to be activated
    },

    prompt() {
      client.addResponse('test/end')
      client.done()
    }
  })

  client.runFlow({
    classifications:{
      start_test:'start_test'
    },
    streams: {
      start_test: ['ask_for_info'],
      ask_for_info: [collectUser,collectAddress,collectPhone],
      main:'start_test',
      end: beyondMe
    }
  })
}
      // ask_about_you:,
// ,'ask_about_you'
