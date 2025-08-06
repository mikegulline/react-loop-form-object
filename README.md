This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## React Form From API Response

```bash
npm run dev
```

Building a dynamic React form that renders input fields from an API response, auto-focuses the first field, manages state updates, validates required fields, and—on successful submission—clears the form and displays the submitted data in a table.

```typescript
/*
  @/api/getFormFields.ts
*/
export interface FormField {
  name: string;
  type: string;
  required?: boolean;
  value?: string | number;
}

export type ApiResponse = Record<string, FormField>;

const apiResponse: ApiResponse = {
  firstName: {
    name: 'First Name',
    type: 'text',
    required: true,
  },
  lastName: {
    name: 'Last Name',
    type: 'text',
    required: true,
  },
  email: {
    name: 'Email Address',
    type: 'email',
    required: true,
  },
  phoneNumber: {
    name: 'Phone Number',
    type: 'tel',
  },
};

export const getFormFields = (): Promise<string> => {
  const isBad = Math.random() < 0.1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isBad) {
        reject(new Error('ERROR: Bad API response!'));
      } else {
        resolve(JSON.stringify(apiResponse));
      }
    }, 2000);
  });
};
```
