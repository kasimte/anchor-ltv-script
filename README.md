# Anchor LTV Script

This project is an example of using the Terra and Anchor javascript SDKs to query the loan-to-value ratio of a borrower address.

## Installation setup for a new project

```
npm
npm install --save @terra-money/terra.js
npm install --save @anchor-protocol/anchor.js
```

## Run this project

```
node index.js <address>
```

Outputs:

```
$ node index.js <address>
Querying LTV for <address>
7.788554 bLUNA provided as collateral
17.051613968763846459 per 1 LUNA
132.80741618287152 in collateral value in USD
14.860904  UST in loan
0.11189814866616346 LTV
```