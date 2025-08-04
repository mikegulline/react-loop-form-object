import { useState, useEffect, useCallback, FormEvent, useRef } from 'react';
import { getFormFields, ApiResponse } from '@/api/getFormFields';
import type { FormField } from '@/api/getFormFields';

export const useForm = () => {
  const [formFields, setFormFields] = useState<ApiResponse>();
  const [tableData, setTableData] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async (retry = 0) => {
      try {
        const data = await getFormFields();
        setFormFields(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message + `${retry ? `(retrying: ${retry})` : ''}`);
        } else {
          setError('Unknown error occurred.');
        }
        fetchData(retry + 1);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  return {
    fields: formFields ?? {},
    data: tableData,
    ref,
    loading,
    error,
    update: handleUpdateValue,
    submit: handleSubmit,
  };
};
