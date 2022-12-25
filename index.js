const { ethers } = require("ethers");
const player = require('play-sound')(opts = {})

const INFURA_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const TRANSFER_THRESHOLD = 500000000000 // wei (usdt uses 6 decimal places so = 100k usd threshold)

const ERC20_ABI = [
	"function balanceOf(address) view returns(uint)",
	"function name() view returns(string)",
	"function symbol() view returns(string)",
	"function totalSupply() view returns (uint256)",

	 "event Transfer(address indexed, address indexed, uint)"
]

const address = "0xdAC17F958D2ee523a2206206994597C13D831ec7" //usdt address

const contract = new ethers.Contract(address, ERC20_ABI ,provider)

const playSound = () => {
	 player.play('ding.mp3')
}

const main = async () => {

	console.log("Launching whale tracker bot...")

	playSound()

	const symbol = await contract.symbol()
	console.log(`This Bot is now listening on ${symbol} token. Please Enjoy :)`)



	contract.on('Transfer', (from, to, value, data) => {

		if (value.toNumber() >= TRANSFER_THRESHOLD) {
		playSound()
		console.log(`new whale transfer for ${symbol}, ${ethers.utils.formatUnits(value, 6)}${symbol}, visit https://etherscan.io/tx/${data.transactionHash}`)
		
	}
	})




}

main()