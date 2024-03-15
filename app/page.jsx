/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import React, { useEffect, useState } from "react";
import Modal from "./components/modal";
import Results from "./components/results";
import ChangeName from "./components/changeName";

function Home() {
  const [Manos, setManos] = useState([]);
  const [Them, setThem] = useState(0);
  const [Us, setUs] = useState(0);
  const [Partidas, setPartidas] = useState(1);
  const [Total, setTotal] = useState({});
  const [TotalGanar, setTotalGanar] = useState(200);
  const [isEditable, setIsEditable] = useState(false);
  const [winner, setWinner] = useState(null);
  const [seeResults, setSeeresults] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [teamName1, setTeamName1] = useState();
  const [teamName2, setTeamName2] = useState();

  const addMano = () => {
    if (Them <= 0 && Us <= 0) {
      return;
    }
    setPartidas((partidas) => partidas + 1);

    setManos((oldManos) => [
      ...oldManos,
      {
        p: Partidas,
        them: Them,
        us: Us,
      },
    ]);
  };
  useEffect(() => {
    if (Total.totalthem >= TotalGanar)
      setWinner(teamName1),
        saveLocal(teamName1, Total.totalthem, Total.totalus);
    if (Total.totalus >= TotalGanar)
      setWinner(teamName2),
        saveLocal(teamName2, Total.totalus, Total.totalthem);
    //  console.log(Total)

    return () => {};
  }, [Total]);

  useEffect(() => {
    // setWinner(null)
    let totalthem = 0;
    let totalus = 0;
    Manos.map((mano) => {
      totalthem = totalthem + Number(mano.them);
      totalus = totalus + Number(mano.us);
    });

    setTotal({
      totalthem,
      totalus,
    });

    setThem(0);
    setUs(0);
    const teamsNames = localStorage.getItem("teams") || "Them,Us";
    const [team1, team2] = teamsNames.split(",");
    setTeamName1((team1 || "Them").toUpperCase());
    setTeamName2((team2 || "Us").toUpperCase());
    return () => {};
  }, [Manos, changeName, setTeamName1]);

  const handleRemove = (id) => {
    const newmanos = Manos.filter((mano) => mano.p !== id);
    setManos(newmanos);
  };

  const handleDoubleClick = () => {
    setIsEditable(!isEditable);
  };

  function saveLocal(winner, win, loss) {
    const existingJsonString = localStorage.getItem("allWinners");

    const existingData = existingJsonString
      ? JSON.parse(existingJsonString)
      : [];

    const newData = {
      winner: winner,
      win: win,
      loss: loss,
    };

    existingData.push(newData);
    const updatedJsonString = JSON.stringify(existingData);

    localStorage.setItem("allWinners", updatedJsonString);
  }

  function quickAdd(them = null, us = null) {
    if (them) {
      setPartidas((partidas) => partidas + 1);

      setManos((oldManos) => [
        ...oldManos,
        {
          p: Partidas,
          them: them,
          us: Us,
        },
      ]);
      return;
    }
    if (us) {
      setPartidas((partidas) => partidas + 1);

      setManos((oldManos) => [
        ...oldManos,
        {
          p: Partidas,
          them: Them,
          us: us,
        },
      ]);
      return;
    }
  }

  const toggleDark = () => {
    // if set via local storage previously
    //  localStorage.s
    if (typeof window !== "undefined") {
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    }
  };

  return (
    <>
    
      {winner ? <Modal winner={winner} /> : ""}
      {seeResults ? <Results state={setSeeresults} /> : ""}
      {changeName ? <ChangeName state={setChangeName} /> : ""}
      <div className={winner && "opacity-0"}>
        <div>
          <div className="group fixed bottom-0  left-0 p-2  flex items-end justify-start w-24 h-24 ">
            <div className="text-blue-4 00 shadow-xl flex items-center justify-center p-3 rounded-full bg-gray-600  z-50 absolute  border-orang-500 border dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 group-hover:rotate-90   transition-all duration-[0.6s]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133W51.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="absolute -right-3  rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-0  flex  p-2 hover:p-3 bg-green-500 hover:bg-green-600  text-black">
              <button onClick={toggleDark} className="text-black">
                🌓
                {/* 💡 */}
              </button>
            </div>
            <div className="absolute right-0  rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-12  flex  p-2 hover:p-3 bg-blue-500 hover:bg-blue-400  text-white">
              <button onClick={() => setChangeName(true)}>✏️</button>
            </div>
            <div className="absolute right-0 rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-16 group-hover:-translate-x-12   flex  p-2 hover:p-3 bg-yellow-500 hover:bg-yellow-400 text-white">
              <button onClick={() => setSeeresults(true)}>👀</button>
            </div>
          </div>
        </div>
        <div className="flex p-0 gap-8 m-2 text-center justify-center ">
          <div className="grid">
            <button
              className="font-extrabold text-xl text-blue-700 mb-2 dark:text-blue-500"
              onDoubleClick={() =>
                quickAdd(localStorage.getItem("kapicua") || 25, null)
              }
            >
              {teamName1}
              {Number(Total.totalthem) > Number(Total.totalus) && "💪"}
            </button>

            <input
              type="number"
              className="rounded p-2 max-w-32 font-semibold shadow-lg border-2 border-blue-700 text-2xl text-center dark:border-none"
              onChange={(e) => setThem(e.target.value)}
              value={Them}
              onFocus={(e) => e.target.select()}
              pattern="[0-9]*"
            />
          </div>
          <div className="grid ">
            <button
              className="font-extrabold  text-xl text-red-700 mb-2 dark:text-red-600"
              onDoubleClick={() =>
                quickAdd(null, localStorage.getItem("kapicua") || 25)
              }
            >
              {teamName2}
              {Total.totalthem < Total.totalus && "💪"}
            </button>

            <input
              type="number"
              className="rounded p-2 max-w-32 font-semibold shadow-lg border-2 border-red-700 text-2xl text-center dark:border-none "
              onChange={(e) => setUs(e.target.value)}
              value={Us}
              onFocus={(e) => e.target.select()}
              pattern="[0-9]*"
            />
          </div>
        </div>
        <div className=" justify-center text-center mt-6 flex">
          <button
            className="bg-green-700 w-2/6 p-3  rounded-full shadow-md shadow-slate-600 font-bold text-white text-xl flex justify-center "
            onClick={addMano}
          >
            Add  <svg className="w-6 h-6 text-white ms-2  my-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z" clipRule="evenodd"/>
  </svg>
  
  
          </button>
        </div>
        <div className="grid justify-center text-center mt-4 font-bold text-2xl first-letter:xl ">
          <button onDoubleClick={handleDoubleClick}>
            🏆
            <input
              type="number"
              onBlur={() => setIsEditable(false)}
              className={
                (isEditable
                  ? "bg-white w-20"
                  : " text-orange-600 bg-transparent") +
                " ms-1 p-2 rounded bg-none w-20 text-center font-bold   text-3xl"
              }
              autoFocus={isEditable}
              value={TotalGanar}
              onChange={(e) => setTotalGanar(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </button>
          {isEditable && (
            <span className="mt-2 text-orange-500 text-xs">Add New Amount</span>
          )}
        </div>
        <div className=" mt-4 w-5/6  mx-auto">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                <div className="overflow-hidden rounded ">
                  <table className="min-w-full text-center   ">
                    <thead className=" bg-slate-800 text-white shadow shadow-slate-100">
                      <tr className="border-4 border-slate-700 rounded">
                        <th
                          scope="col"
                          className="text-lg px-1 py-2 bg-slate-600 s  div"
                        >
                          Total
                        </th>
                        <th scope="col" className="text-2xl px-2  py-2 ">
                          <span className="text-sm  bg-blue-800 px-0 py-1 rounded-full mb-2 grid">
                            {teamName1}
                          </span>
                          <hr />

                          <p
                            className={
                              Total.totalthem > Total.totalus
                                ? "text-green-500 "
                                : ""
                            }
                          >

                            {Total.totalthem}
                          </p>
                        </th>
                        <th scope="col" className="text-2xl px-2 py-2 ">
                          <span className="text-sm bg-red-700 px-0 py-1 rounded-full mb-2 grid">
                            {teamName2}
                          </span>
                          <hr />
                          <p
                            className={
                              Total.totalus > Total.totalthem
                                ? "text-green-500 "
                                : ""
                            }
                          >
                            {Total.totalus}
                          </p>
                        </th>
                        <th scope="col" className="text-lg px-0 py-2"></th>
                      </tr>
                    </thead>
                    <tbody className="font-semibold text-white border-4 border-slate-700 ">
                      {Manos &&
                        Manos.map((mano) => {
                          return (
                            <tr className="text-2xl font-bold" key={mano.p}>
                              <td className=" px-1 py-2  bg-blue-800 text-white text-xl">
                                ✋{mano.p}
                              </td>
                              <td
                                className={
                                  (mano.them > mano.us
                                    ? "text-green-700 dark:text-green-500"
                                    : "text-red-700") + "   px-2 py-2 "
                                }
                              >
                                {mano.them}
                              </td>
                              <td
                                className={
                                  (mano.them < mano.us
                                    ? "text-green-700 dark:text-green-500"
                                    : "text-red-700") + "   px-2 py-2 "
                                }
                              >
                                {mano.us}
                              </td>
                              <td className="   px-0 py-2 ">
                                <button
                                  className=""
                                  onClick={() => handleRemove(mano.p)}
                                >
                                  ❌
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Home;
