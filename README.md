
# Neo-Frontend: Decentralized Payment Scheduler

Welcome to the Neo-Frontend repository, the user interface for our decentralized payment scheduling application. This app allows users to schedule and manage cryptocurrency transactions with ease and security.
## Features

- Instant Transactions: Send payments immediately to any recipient.
- Scheduled Transactions: Plan future payments with customizable execution times.
- Transaction Management: View, execute, and cancel scheduled transactions.
- Dynamic Fee Calculation: Fees are calculated based on transaction amount and network congestion.
- Blacklist Protection: Enhanced security with a blacklist feature to prevent unauthorized transactions.
## Live Demo

[Demo](https://neo-frontend-git-main-firefly176s-projects.vercel.app/)
## Backend Repository

[Backend Github Repository](https://github.com/Firefly176/Neo-Backend/)
## Smart Contract

- Address: [0xfed3a7bd6f85189355bee76e7c50d036a685dc0b](https://xt4scan.ngd.network/address/0xfed3a7bd6f85189355bee76e7c50d036a685dc0b)
- Network: 
    - [Neo X Testnet](https://xdocs.ngd.network/development/development-environment-information#testnet)
    - TestNet : NeoX T4
    - Chain ID : 12227332
    - RPC Endpoint : https://neoxt4seed1.ngd.network
    - WSS Endpoint : wss://neoxt4wss1.ngd.network
    - Block Explorer: https://xt4scan.ngd.network/
    - Currency Symbol: GAS
## Authors (A-Z)

- [Chirag Tamhane](https://github.com/Chirag175)
- [Aniket Gupta](https://github.com/Firefly176)

## Future Plans
- [ ]  Multi-token Support: Expand beyond the current ERC20 token to support multiple cryptocurrencies.
- [ ]  Advanced Scheduling: Implement recurring payments and conditional execution based on external triggers.
- [ ]  Mobile App: Develop a native mobile application for iOS and Android platforms.
- [ ]  Integration with DeFi Protocols: Allow scheduled interactions with popular DeFi platforms.
## Documentation

### Key Components of the Application
- InstantTransaction: Handles immediate payment execution.
- ScheduleTransaction: Manages the creation of future-dated transactions.
- TransactionList: Displays and manages scheduled transactions.
- ExecuteTransaction: Triggers the execution of due scheduled transactions.
- CancelTransaction: Allows users to cancel pending scheduled transactions.

### Interacting with the Smart Contract
The frontend interacts with a PaymentScheduler smart contract, which includes the following main functions:
- instantTransaction: For sending immediate payments.
- scheduleTransaction: For creating future-dated transactions.
- executeTransaction: For triggering scheduled payments.
- cancelTransaction: For cancelling scheduled payments.
- calculateDynamicFee: For determining transaction fees based on amount and network conditions.

### Error Handling

The application includes comprehensive error handling for various scenarios, including:
- Insufficient balance
- Unauthorized actions
- Network congestion
- Invalid transaction parameters
Error messages are displayed to users in a user-friendly manner to ensure a smooth experience.
## Contributing

We welcome contributions to the Neo-Frontend project.


## License

[GNU LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/)
