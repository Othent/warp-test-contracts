import { warp, configureWallet } from './warp-configs.js'


async function readBothContracts(contractId) {
  const wallet = await configureWallet()


  const warpMainNet = await warp()
  let contract = warpMainNet.contract(contractId).setEvaluationOptions({ internalWrites: true }).connect(wallet);
  let { cachedValue } = await contract.readState();
  const stateBlog = cachedValue.state
  const errorsBlog = cachedValue.errorMessages

  console.log(errorsBlog)

  console.log(stateBlog)



}


readBothContracts('RezNoy4ooKJrHzA3zIhtvDHw748p43Bh3zKu3AwIh2I')