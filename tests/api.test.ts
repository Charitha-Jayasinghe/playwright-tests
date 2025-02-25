import { test, expect } from '@playwright/test';

test('GET request example', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/objects`);
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});
