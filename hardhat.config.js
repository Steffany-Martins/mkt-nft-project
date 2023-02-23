// const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
require('@nomiclabs/hardhat-waffle');

// const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  solidity: '0.8.17',
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
