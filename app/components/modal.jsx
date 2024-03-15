"use client";
function Modal({ winner }) {
  return (
    <div>
      <div className="fixed left-0 top-25 flex h-full w-full items-center justify-center bg-slate-700 bg-opacity-900 py-10">
        <div className="max-h-full w-3/4 max-w-3/4 overflow-y-auto sm:rounded-2xl ">
          <div className="w-full">
            <div className="m-8 my-20 max-w-2/4 mx-auto">
              <div className="mb-8 justify-center">
                <h1 className="mb-4 text-8xl font-extrabold justify-end text-center ">
                  🏆
                </h1>
                <h1 className="mb-4 text-4xl font-extrabold justify-end text-center text-orange-500 animate-bounce">
                  {winner} Win🌟
                </h1>
              </div>
              <div className="space-y-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
