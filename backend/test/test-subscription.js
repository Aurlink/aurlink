import dotenv from 'dotenv';
dotenv.config();

const testSubscription = async () => {
  const testEmail = `test${Date.now()}@example.com`;
  
  console.log('🧪 Testing subscription endpoint...');
  
  try {
    const response = await fetch('http://localhost:3001/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        referralCode: 'test123'
      }),
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Subscription test PASSED');
    } else {
      console.log('❌ Subscription test FAILED');
    }
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
};

// Test configuration first
const testConfig = async () => {
  console.log('🔧 Testing configuration...');
  
  try {
    const response = await fetch('http://localhost:3001/api/debug/config');
    const data = await response.json();
    console.log('Configuration:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ Configuration test failed - is server running?');
  }
};

const runTests = async () => {
  await testConfig();
  await testSubscription();
};

runTests();