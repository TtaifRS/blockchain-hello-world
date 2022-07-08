import assert from 'assert'
import ganache from 'ganache'
import Web3 from 'web3'
import compileData from '../compile.js'

const web3 = new Web3(ganache.provider())

const { abi, evm } = compileData


let accounts
let inbox
const INITIAL_MESSAGE = 'Hello World'

beforeEach(async () => {
  //get list of all accounts 
  accounts = await web3.eth.getAccounts()

  //deploy contract to test 
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: [INITIAL_MESSAGE],
    })
    .send({ from: accounts[0], gas: '1000000' });

})

describe('Inbox', () => {
  it('deployes ', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_MESSAGE)
  })

  it('can update the message', async () => {
    await inbox.methods.setMessage('cats are awesome').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'cats are awesome')
  })
})


