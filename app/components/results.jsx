"use client";
function Results({ state }) {
  let allWinners = localStorage.getItem("allWinners");
  const existingData = allWinners ? JSON.parse(allWinners) : [];

  return (
    <div className="  ">
      <div className=" h-screen fixed   top-25  w-full items-start  px-4  py-1 bg-slate-100  dark:bg-slate-900 rounded" onClick={() => state(false)}>
        <table className="w-full mb-4 mt-2  borde r-2 border-orang e-500 rounded shadow-md shadow-whit shadow-slate-500">
          <thead className="bg-blue-700 flex text-black dark:text-white w-full rounded-t">
            <tr className="flex w-full mb-4">
              <th className="p-1 w-1/4">#</th>
              <th className="p-1 w-1/4">Team</th>
              <th className="p-1 w-1/4">W</th>
              <th className="p-1 w-1/4">L</th>
            </tr>
          </thead>
          <tbody
            className="bg-slate-200 bg-opacity-10 first-letter: divide-y divide-slate-500 font-semibold text-black dark:text-white flex flex-col items-center text-center  overflow-y-scroll w-full"
            style={{ height: "40vh" }}
          >
            {existingData &&
              existingData.map((winner, i) => {
                return (
                  <tr
                    className={
                      (i % 2 == 0 ? "bg-slate- " : "") + "flex w-full "
                    }
                    key={i}
                  >
                    <td className=" p-1 w-1/4    ">#{i + 1}</td>
                    <td className=" p-1 w-1/4  ">{winner.winner}</td>
                    <td
                      className={
                        (winner.win > winner.loss
                          ? "text-green-500"
                          : "text-red-500") + "  p-1 w-1/4 "
                      }
                    >
                      {winner.win}
                    </td>
                    <td
                      className={
                        (winner.win > winner.loss
                          ? "text-red-500"
                          : "text-green-500") + "  p-1 w-1/4 "
                      }
                    >
                      {winner.loss}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
       
        <div className="  w-full grid gap-2">
         
          <button
            className="bg-gray-500 rounded-full font-bold dark:text-white p-2 max-w-40 min-w-32 justify-center text-center mx-auto"
            onClick={() => (
              localStorage.removeItem("allWinners"), state(false)
            )}
          >
            Clear
          </button>
          <button
            className="bg-red-500 rounded-full font-bold dark:text-white p-2 max-w-40 min-w-32 justify-center text-center mx-auto"
            onClick={() => state(false)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
