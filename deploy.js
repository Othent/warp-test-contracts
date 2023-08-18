import fs from 'fs'
import { configureWallet, warp } from './warp-configs.js'


async function deploy() {

  const wallet = await configureWallet()
  const state = fs.readFileSync('state.json', 'utf-8')
  const contractSRC = fs.readFileSync('contract.js', 'utf-8')


  const warpMainnet = await warp('mainNet')
  const { contractTxId: warpMainNetID } = await warpMainnet.createContract.deploy({ wallet, initState: state, src: contractSRC })
  const contractMaintNet = warpMainnet.contract(warpMainNetID).setEvaluationOptions({internalWrites: true}).connect(wallet.jwk)
  await contractMaintNet.writeInteraction({ function: 'initializeContract' })


  const warpTestnet = await warp('testNet')
  const { contractTxId: warpTestNetID } = await warpTestnet.createContract.deploy({ wallet, initState: state, src: contractSRC })
  const contractTestNet = warpTestnet.contract(warpTestNetID).setEvaluationOptions({internalWrites: true}).connect(wallet.jwk)
  await contractTestNet.writeInteraction({ function: 'initializeContract' })


  console.log('\n\n\n\n')
  console.log('------------------------------------------------------------------------------------------------------------------------------------')
  console.log('DEPLOY BLOG CONTRACT')
  console.log('------------------------------------------------------------------------------------------------------------------------------------')
  console.log('↓ CONTRACT ID MAINNET↓')
  console.log(warpMainNetID)
  console.log('------------------------------------------------------------------------------------------------------------------------------------')
  console.log('↓ CONTRACT ID TESTNET')
  console.log(warpTestNetID)
  console.log('------------------------------------------------------------------------------------------------------------------------------------')


}
deploy()
