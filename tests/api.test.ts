import { test, expect } from '@playwright/test';

test('GET All Objects', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/objects`);
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});


let createdObjectId; 

test('create new object', async ({ request, baseURL }) => {
  const payload = {
    name: "Apple MacBook Pro 16",
    data: {
      year: 2019,
      price: 1800.00,
      "CPU model": "M1",
      "Hard disk size": "20 TB"
    }
  };

  const response = await request.post(`${baseURL}/objects`, {
    data: payload
  });

  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log(responseData);

  expect(responseData).toHaveProperty('id');
  expect(responseData.name).toBe(payload.name);

  createdObjectId = responseData.id; 
});




test('GET specific object', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/objects/${createdObjectId}`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data);

  expect(data.id).toBe(createdObjectId);
});


test('update object', async ({ request, baseURL }) => {
  const payload = {
    name: "blackberry Pro 16",
    data: {
      year: 2019,
      price: 1849.99,
      "CPU model": "M1",
      "Hard disk size": "15 TB"
    }
  };

  const response = await request.put(`${baseURL}/objects/${createdObjectId}`, {
    data: payload
  });

  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log(responseData);

  expect(responseData).toHaveProperty('id');
  expect(responseData).toHaveProperty('updatedAt');
  expect(responseData.name).toBe(payload.name);

  createdObjectId = responseData.id; 
});



test('delete object', async ({ request, baseURL }) => {
  

  const response = await request.delete(`${baseURL}/objects/${createdObjectId}`);
  expect(response.status()).toBe(200);

  expect(response.status()).toBe(200);

  const responseData = await response.json();
  console.log(responseData);
  expect(responseData.message).toBe(`Object with id = ${createdObjectId} has been deleted.`);

});