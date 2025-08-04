This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Building a React form that dynamically renders input fields based on API response, handles state updates, validates required fields, and, upon successful submission, clears the form and programmatically focuses the first input field.

```typescript
/*
  @/api/getFormFields.ts
*/

// interface for field objects
export interface FormField {
  name: string;
  type: string;
  required?: boolean;
  value?: string | number;
}

// type for api response
export type ApiResponse = Record<string, FormField>;

// api response payload
const apiResponse: ApiResponse = {
  userName: {
    name: 'User Name',
    type: 'text',
    required: true,
  },
  email: {
    name: 'Email Address',
    type: 'text',
    required: true,
  },
  phoneNumber: {
    name: 'Phone Number',
    type: 'text',
  },
};

// sudo api connection:
// with 10% fail rate
// and 2000 ms delay
export const getFormFields = (): Promise<ApiResponse> => {
  const isBad = Math.random() < 0.1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isBad) {
        reject(new Error('ERROR: Bad API response!'));
      } else {
        resolve(apiResponse);
      }
    }, 2000);
  });
};
```
