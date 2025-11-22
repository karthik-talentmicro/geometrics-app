import { IpLookupService } from '../lib/services/ip-lookup-prisma';
import { ipToInt } from '../lib/utils';

async function testIpLookup() {
  console.log('Testing IP Lookup Service...\n');

  // Test IP address from your example
  const testIp = '99.199.126.206';

  console.log(`Test IP: ${testIp}`);
  console.log(`IP as Integer: ${ipToInt(testIp)}\n`);

  try {
    const result = await IpLookupService.lookupIp(testIp);
    console.log('Lookup Result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error during lookup:', error);
  }

  console.log('\n--- Getting Database Stats ---\n');
  try {
    const stats = await IpLookupService.getStats();
    console.log('Database Stats:');
    console.log(JSON.stringify(stats, null, 2));
  } catch (error) {
    console.error('Error getting stats:', error);
  }

  process.exit(0);
}

testIpLookup();
