export default function Home() {
  return (
    <>
      <h1 className="text-center">Handcraft Haven</h1>
      <div className="container mx-auto">
        <div className="flex flex-row flex-wrap py-4">
          <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
            <div className="sticky top-0 p-4 w-full">
              {/** Navigation / Search */}
              <ul className="flex flex-col overflow-hidden">
                <p>Search</p>
                <p>Landing Page</p>
                <p>Other Navigation</p>
                <p>Mockup</p>
              </ul>
            </div>
          </aside>
          <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            {/** Featured Cards */}
            <h1>Featured Items</h1>
            <div className="grid grid-cols-3 gap-2">
              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>
            </div>
            {/** Newest Cards */}
            <h1>Newest Items</h1>
            <div className="grid grid-cols-4 gap-2">
            <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>

              <a className="group black relative overflow-hidden rounded-lg" href="#">
                <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image">
                  {/** Price Here */}
                </img>
              </a>
            </div>
          </main>
        </div>
      </div>
      {/** Footer */}
      <footer className="mt-auto">
          <h1 className="text-center">Footer</h1>
      </footer>
    </>
  );
}
