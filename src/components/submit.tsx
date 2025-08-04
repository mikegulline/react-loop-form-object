export const Submit = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={`${
        disabled
          ? 'bg-blue-200'
          : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'
      }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    >
      Submit
    </button>
  );
};
