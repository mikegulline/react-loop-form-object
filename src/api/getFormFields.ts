export interface FormField {
  name: string;
  type: string;
  required?: boolean;
  value?: string | number;
}

export type ApiResponse = Record<string, FormField>;

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
