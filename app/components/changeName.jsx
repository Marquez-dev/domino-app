"use client";

import { useState, useEffect } from "react";

function Results({ state }) {
  let allWinners = localStorage.getItem("allWinners");
  const existingData = allWinners ? JSON.parse(allWinners) : [];
  const [Team1, setTeam1] = useState();
  const [Team2, setTeam2] = useState();

  useEffect(() => {
    const teamsNames = localStorage.getItem("teams") || "Them,Us";
    const [team1, team2] = teamsNames.split(",");
    setTeam1(team1 || "Them");
      setTeam2(team2 || "Us");
    return () => {
    
    };
  }, []);

  return (
    <div className="  ">
      <div className=" h-screen fixed   top-25  w-full items-start  px-4  py-1 bg-slate-200  dark:bg-slate-900 rounded " >
        <div className=" space-y-4 gap-3 mb-3   text-center p-2">
          <span className="text-orange-500 text-2xl font-extrabold">
            Change Team Names
          </span>
          <input
            type="text"
            className="p-2 text-center rounded w-4/6 border-2 border-blue-800 dark:border-none"
            placeholder={Team1}
            onChange={(e) => setTeam1(e.target.value)}
          />
          <input
            type="text"
            className="p-2 text-center  rounded w-4/6 border-2 border-red-700 dark:border-none"
            placeholder={Team2}
            onChange={(e) => setTeam2(e.target.value)}
          />
          <button
            className="bg-green-500 rounded-full font-bold dark:text-white p-2 max-w-40 min-w-32 justify-center text-center mx-auto"
            onClick={() => (
              localStorage.setItem("teams", [Team1, Team2]), state(false)
            )}
          >
            Save
          </button>
          <hr className="text-black bg-black dark:text-white h-0.5" />
          <span className="text-orange-500 text-2xl font-extrabold">
            {" "}
            Kapicua Value:{" "}
          </span>

          <input
            type="number"
            name="paso"
            id="paso"
            className="p-1 font-bold text-center rounded w-1/6 border-2 border-red-600 dark:border-none"
            defaultValue={localStorage.getItem("kapicua") || 30}
            pattern="[0-9]*"
          />
          <button
            className="ms-2 px-3 py-1 bg-blue-600 rounded-full text-lg font-semibold text-white"
            onClick={() =>
              localStorage.setItem(
                "kapicua",
                document.getElementById("paso").value || 25
              )
            }
          >
            Change
          </button>
        </div>

        <div className="  w-full grid gap-4">
          <button
            className="bg-gray-500 rounded-full font-bold text-white p-2 max-w-40 min-w-32 justify-center text-center mx-auto"
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
