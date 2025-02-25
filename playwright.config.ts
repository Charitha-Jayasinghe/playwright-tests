import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where tests are located
  use: {
    baseURL: 'https://api.restful-api.dev', // Set your API base URL
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      // You can add authentication headers if required
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
  },
  reporter: [['html', { open: 'never' }]], // Generates an HTML report
});
