import { FormField } from '@/api/getFormFields';

export const Table = ({ data }: { data: FormField[] }) => {
  if (!data.length) return null;
  return (
    <div className='max-w-md overflow-hidden rounded border border-gray-400 fade-up'>
      <table className='table-auto border-collaps w-full '>
        <thead>
          <tr>
            <th className='text-left p-2 bg-gray-100 text-xs'>Field</th>
            <th className='text-left p-2 bg-gray-100 text-xs'>Value</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((field: FormField) => {
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
  );
};
