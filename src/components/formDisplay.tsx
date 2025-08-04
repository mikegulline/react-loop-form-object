'use client';
import { useForm } from '@/hooks/useForm';
import { Form } from '@/components/form';
import { Table } from '@/components/table';

export const FormDisplay = () => {
  const { fields, data, ref, loading, error, update, submit } = useForm();

  if (loading) return <div>Loading…</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Form
        fields={fields}
        inputRef={ref}
        handleUpdateValue={update}
        handleSubmit={submit}
      />
      <Table data={data} />
    </>
  );
};
