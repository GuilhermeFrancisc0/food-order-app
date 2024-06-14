const Loading = () => (
  <>
    <div className='flex items-center mb-5'>
      <h1 className="text-2xl text-primary">Categorias</h1>
    </div>
    <div className='flex overflow-x-auto no-scrollbar space-x-4 mx-2 w-full'>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton w-32 h-32"></div>
      ))}
    </div>
  </>
);

export default Loading;