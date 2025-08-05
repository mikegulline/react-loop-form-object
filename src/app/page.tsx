import { FormDisplay } from '@/components/formDisplay';

export default function Home() {
  return (
    <div className='p-4 max-w-md m-auto flex flex-col gap-4'>
      <h1 className='font-semibold text-xl'>Newsletter Sign Up</h1>
      <p>This form does not save or post any data.</p>
      <p>
        Fill out the required fields and click submit <em>(or press enter)</em>{' '}
        to see the results displayed below.
      </p>
      <hr className='border-gray-400' />
      <FormDisplay />
    </div>
  );
}
