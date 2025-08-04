'use client';
import { useState, useEffect, FormEvent, useRef, RefObject } from 'react';
import {
  getFormFields,
  ApiResponse,
  type FormField,
} from '@/api/getFormFields';

export default function Home() {
  const [formFields, setFormFields] = useState<ApiResponse>();
  const [tableData, setTableData] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFormFields();
        setFormFields(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUpdateValue = (id: string, value: string | number) =>
    setFormFields((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          value,
        },
      };
    });

  const isDisabled = !Object.values(formFields ?? {}).reduce((acc, field) => {
    if (!acc) return false;
    if (field.required && !field.value) return false;
    return true;
  }, true);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const tableData: FormField[] = [];

    Object.entries(formFields ?? {}).map(([key, field]) => {
      tableData.push({ ...field });
      handleUpdateValue(key, '');
    });

    setTableData(tableData);
    if (ref.current) ref.current.focus();
  };

  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className=' max-w-3xs flex flex-col gap-4'>
        {Object.entries(formFields ?? {}).map(([key, field], index) => (
          <Input
            key={key}
            id={key}
            field={field}
            setValue={handleUpdateValue}
            inputRef={index === 0 ? ref : undefined}
          />
        ))}
        <div>
          <button
            type='submit'
            disabled={isDisabled}
            className={`${
              isDisabled
                ? 'bg-blue-200'
                : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'
            }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Submit
          </button>
        </div>
      </form>
      <div className='py-4'>
        {Object.entries(formFields ?? {}).map(([key, field]) => {
          return (
            <div key={key}>
              <strong>{field.name}:</strong> {field.value}
            </div>
          );
        })}
      </div>
      {tableData.length > 0 ? (
        <table className='table-auto border-collaps max-w-3xs w-full border border-gray-400 max'>
          <thead>
            <tr>
              <th className='text-left p-2 bg-gray-100 text-xs'>Field</th>
              <th className='text-left p-2 bg-gray-100 text-xs'>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((field: FormField) => {
              return (
                <tr key={field.name}>
                  <td className='border-t border-gray-400 border-solid p-2 text-xs'>
                    {field.name}
                  </td>
                  <td className='border-t border-gray-400 border-solid p-2 font-mono'>
                    {field.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

interface InputI {
  id: string;
  field: FormField;
  setValue: (id: string, value: string | number) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const Input = ({ id, field, setValue, inputRef }: InputI) => {
  return (
    <div>
      <label htmlFor={id}>
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
        className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
      />
    </div>
  );
};
