import { useMemo, useState } from "react";

const DATA_THEME = "data-theme";

const themes = [
  //
  // "black",
  // "business",
  // "coffee",
  "dark",
  "dracula",
  // "forest",
  "halloween",
  "luxury",
  "night",
  "synthwave",
];

function NavBar() {
  const [theme, setTheme] = useState(localStorage.getItem(DATA_THEME) ?? "luxury");

  useMemo(() => {
    localStorage.setItem(DATA_THEME, theme);
    document.querySelector("html")?.setAttribute(DATA_THEME, theme);
  }, [theme]);

  return (
    <>
      <div className="navbar glass fixed z-10">
        <div className="max-w-7xl mx-auto flex-auto">
          <div className="flex-none">
            <a href="/" className="btn sm:btn-ghost max-sm:btn-outline max-sm:btn-square text-xl">
              <span className="max-sm:hidden">Vinyl</span>
              <span className="loading loading-infinity -mx-2" />
              <span className="max-sm:hidden">Records</span>
            </a>
          </div>
          <div className="flex-1" />
          <div className="flex-none">
            <div className="join">
              <a href="/add" className="btn btn-outline btn-active join-item">
                Add Record
              </a>
              {/* <a href="/edit" className="btn btn-outline join-item">
                Edit
              </a> */}
              {/* </div> */}
              {/* </div> */}
              {/* <div className="flex-1" /> */}
              {/* <div className="flex-none"> */}
              <select className="btn btn-outline outline-none join-item" defaultValue="theme" onChange={(e) => setTheme(e.target.value)}>
                <option disabled value="theme" hidden>
                  Theme
                </option>
                {themes.map((theme) => (
                  <option key={theme} value={theme} className="text-left">
                    {`${theme.charAt(0).toUpperCase()}${theme.slice(1)}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
}

export default NavBar;
