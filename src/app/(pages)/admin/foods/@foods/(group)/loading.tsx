const Loading = () => (
  <>
    <h1 className="text-2xl my-4 text-primary">Comidas</h1>
    <div className='flex overflow-x-auto no-scrollbar space-x-4 mx-2 w-full'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton w-32 h-32"></div>
      ))}
    </div>
  </>
);

export default Loading;