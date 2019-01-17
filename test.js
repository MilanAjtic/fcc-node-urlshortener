const dns = require('dns');
dns.lookup('http://mrnjasdasf.com', (err, address, family) =>
  console.log('address', address));