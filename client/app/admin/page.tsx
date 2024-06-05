export default function Admin() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="my-2 font-semibold text-2xl">Welcome to Admin Panel!</h1>
        <div className="flex gap-4">
          <a href="/admin/movies" className="bg-navbar-button p-2 rounded-lg text-white hover:scale-105 hover:transition-all">
            Movie List
          </a>
          <a href="/admin/categories" className="bg-navbar-button p-2 rounded-lg text-white hover:scale-105 hover:transition-all">
            Category List
          </a>
          <a href="/admin/persons" className="bg-navbar-button p-2 rounded-lg text-white hover:scale-105 hover:transition-all">
            Person List
          </a>
        </div>
      </div>
    </>
  );
}
