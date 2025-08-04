import { FormEventHandler, RefObject } from 'react';
import { Input } from './input';
import { ApiResponse } from '@/api/getFormFields';
import { Submit } from './submit';

interface FormI {
  fields: ApiResponse;
  inputRef?: RefObject<HTMLInputElement | null>;
  handleUpdateValue: (id: string, value: string | number) => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const Form = ({
  fields,
  inputRef,
  handleUpdateValue,
  handleSubmit,
}: FormI) => {
  const isDisabled = !Object.values(fields).reduce((acc, field) => {
    if (!acc) return false;
    if (field.required && !field.value) return false;
    return true;
  }, true);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {Object.entries(fields ?? {}).map(([key, field], index) => (
        <Input
          key={key}
          id={key}
          field={field}
          setValue={handleUpdateValue}
          inputRef={index === 0 ? inputRef : undefined}
        />
      ))}
      <div>
        <Submit disabled={isDisabled} />
      </div>
    </form>
  );
};
