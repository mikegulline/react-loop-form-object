export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel';
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
