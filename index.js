const { LCDClient, Coin } = require('@terra-money/terra.js');
const {
  // Anchor,
  columbus4,
  AddressProviderFromJson,
  MARKET_DENOMS,
  COLLATERAL_DENOMS,
  OperationGasParameters,
  queryCustodyBorrower,
  queryMarketBorrowerInfo } = require('@anchor-protocol/anchor.js');

const lcd = new LCDClient({
  // URL: 'https://localhost:1317',
  // chainID: 'localterra',
  URL: 'https://lcd.terra.dev',
  chainID: 'columbus-4',
});

const addressProvider = new AddressProviderFromJson(columbus4);

async function main() {
  // Usage: node index.js <borrower_address>
  const address = process.argv[2];

  console.log("Querying LTV for", address);
  const bluna = await queryCustodyBorrower({
    lcd,
    market: MARKET_DENOMS.UUSD,
    custody: COLLATERAL_DENOMS.UBLUNA,
    address,
  })(addressProvider).then(response => {
    return response.balance / 1000000;
  });
  console.log(bluna, "bLUNA provided as collateral");

  const rate = await lcd.oracle.exchangeRates().then(res => {
    return res.get("uusd").amount
  });
  
  console.log(rate, "per 1 LUNA");
  const collateral_value = bluna * rate;
  console.log(collateral_value, "in collateral value in USD");
	
  const loan_amount = await queryMarketBorrowerInfo({
    lcd,
    market: MARKET_DENOMS.UUSD,
    borrower: address,
    // block_height is optional
    // block_height: +block.header.height,
  })(addressProvider).then(response => {
    return response.loan_amount / 1000000;  });

  console.log(loan_amount, " UST in loan");
  const ltv = loan_amount / collateral_value;
  console.log(ltv, "LTV");

}

main().catch(console.error);
