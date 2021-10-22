# Project3 - Retroactive public goods funding

![](https://media.giphy.com/media/26FPLMDDN5fJCir0A/giphy.gif)

## Design logic

A funding platform where project teams can create funding page, set fund raising
goals and benchmarks. Eventually, project team can collect raised fund after
proving they have delivered public goods.

## Stakeholders

- **Project owner**
  - ethereum wallet address (address)
  - decide how many tokens to issue (uint)
  - project roadmap
  - deliver items
- **Investor**
  - buy/sell tokens
  - lock-in period
  - voting right
- **Merchant (e.g Uniswap, Sushiswap)**
  - deccentralised exchange
- **Funding manager**
  - control when to unlock tokens
  - control payout
- **Verifier**
  - verify the public goods delivered

## Resources

- [OpenZeppelin Governance Library](https://docs.openzeppelin.com/contracts/4.x/api/governance)
- [Reality.eth Smart Contract Oracle](https://reality.eth.link/app/docs/html/contracts.html)
- [Gnosis Safe for Assets Management](https://gnosis-safe.io/developers)
- [Gnosis Zodiac Reality Module](https://gnosis.github.io/zodiac/docs/tutorial-module-reality/tech-guide)
- [Aragon Developer Doc](https://aragon.org/developers)
- [Clr.fund](https://github.com/clrfund/maci)
- [Gitcoin](https://github.com/gitcoinco/governance-docs)
- [Uniswap create a new pool](https://github.com/Uniswap/v3-core/blob/main/contracts/interfaces/IUniswapV3Factory.sol)

## Checklist

- [x] Project token generator
- [ ] issue NFT to token buyer
- [ ] Pre-sale function?
- [ ] Governing: Payout per deliverables
- [ ] One-Click add project token to Uniswap
- [ ] Check current price on Uniswap

## Run the Dapp in local environment

### First time install

1. cd Dapp
2. npm install -g truffle
3. truffle develop
4. inside truffle develop:
5. compile
6. migrate
7. now create a new terminal
8. cd Dapp
9. cd app
10. yarn install
11. yarn run start

### After first time install

1. cd Dapp
2. truffle develop
3. in new terminal:
4. cd Dapp
5. cd app
6. truffle deploy
7. yarn run start
