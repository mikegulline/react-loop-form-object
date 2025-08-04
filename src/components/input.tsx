import { FormField } from '@/api/getFormFields';
import { RefObject } from 'react';

export interface InputI {
  id: string;
  field: FormField;
  setValue: (id: string, value: string | number) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export const Input = ({ id, field, setValue, inputRef }: InputI) => {
  return (
    <div>
      <label htmlFor={id} className='text-xs'>
        {field.name}
        {field.required ? '*' : null}
      </label>
      <input
        id={id}
        name={id}
        type={field.type}
        onChange={(e) => setValue(id, e.target.value)}
        value={field.value || ''}
        required={field.required ?? false}
        ref={inputRef}
        className='appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight'
      />
    </div>
  );
};
