// Test script to verify API fallback functionality
import { fetchQuizQuestionsWithFallback, FALLBACK_QUIZ_DATA } from './api';

export const testAPIFallback = async () => {
  console.log('Testing API fallback functionality...');
  
  try {
    // Test with a small amount to avoid rate limiting
    const data = await fetchQuizQuestionsWithFallback({ amount: 5 });
    console.log('✅ API test successful:', data);
    return data;
  } catch (error) {
    console.log('❌ API test failed:', error.message);
    console.log('📋 Fallback data available:', FALLBACK_QUIZ_DATA);
    return FALLBACK_QUIZ_DATA;
  }
};

// Run test if this file is imported directly
if (typeof window !== 'undefined') {
  testAPIFallback();
}
