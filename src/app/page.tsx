'use client';
import { useState, useEffect, useCallback, FormEvent, useRef } from 'react';
import { getFormFields, ApiResponse } from '@/api/getFormFields';
import type { FormField } from '@/api/getFormFields';
import { Input } from '@/components/input';
import { Submit } from '@/components/submit';

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

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const tableData: FormField[] = [];

      Object.entries(formFields ?? {}).map(([key, field]) => {
        tableData.push({ ...field });
        handleUpdateValue(key, '');
      });

      setTableData(tableData);
      if (ref.current) ref.current.focus();
    },
    [formFields]
  );

  if (loading) return <div className='p-4'>Loading…</div>;
  if (error) return <div className='p-4'>{error}</div>;

  return (
    <div className='p-4 max-w-md m-auto'>
      <form onSubmit={handleSubmit} className='max-w-md flex flex-col gap-4'>
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
          <Submit disabled={isDisabled} />
        </div>
      </form>
      {tableData.length > 0 ? (
        <div className='mt-4 max-w-md overflow-hidden rounded border border-gray-400'>
          <table className='table-auto border-collaps w-full '>
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
        </div>
      ) : null}
    </div>
  );
}
