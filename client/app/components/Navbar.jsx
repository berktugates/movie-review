export default function Navbar() {
  return (
    <>
      <div className="bg-white border-b border-b-navbar-border flex items-center justify-around h-16">
        <div id="brand">
        <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse ms-4"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                moviePortal
              </span>
            </a>
        </div>
        <div id="buttons">
          <ul className="flex gap-2">
            <li className="p-2 rounded-lg bg-yellow-500 font-semibold text-white hover:scale-105 hover:transition-all hover:text-black">
              <a href="/action-movies">Action</a>
            </li>
            <li className="p-2 rounded-lg bg-yellow-500 font-semibold text-white hover:scale-105 hover:transition-all hover:text-black">
             <a href="/drama-movies">Drama</a>
            </li>
            <li className="p-2 rounded-lg bg-yellow-500 font-semibold text-white hover:scale-105 hover:transition-all hover:text-black">
              <a href="romantic-movies">Romantic</a>
            </li>
            <li className="p-2 rounded-lg bg-navbar-button text-white font-semibold hover:scale-105 hover:text-black">
              <a href="https://github.com/berktugates" target="_blank">Project Author</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
