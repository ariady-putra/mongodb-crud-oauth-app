import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as VinylRecords from "../utils/VinylRecords";
import Dialog, { openDialog } from "./Dialog";

function VinylList() {
  type SearchResult = {
    _id: string;
    title: string;
    artist: string;
    year: number | null;
    genre: string;
    condition: string;
    __v: number;
  };
  const [vinylRecords, setVinylRecords] = useState<SearchResult[]>([]);

  const [sortTitle, setSortTitle] = useState<number | undefined>();
  const [sortArtist, setSortArtist] = useState<number | undefined>();
  const [sortYear, setSortYear] = useState<number | undefined>();
  const [sortGenre, setSortGenre] = useState<number | undefined>();
  const [sortCondition, setSortCondition] = useState<number | undefined>();

  useMemo(
    () =>
      VinylRecords.fetchAll()
        .then((response) => setVinylRecords(response.data.results))
        .catch((error) => toast(error.response?.data?.error ?? `${error}`)),
    []
  );

  const resetSortOrder = () => {
    setSortTitle(undefined);
    setSortArtist(undefined);
    setSortYear(undefined);
    setSortGenre(undefined);
    setSortCondition(undefined);
  };

  const handleSort = (compareFn: (l: SearchResult, r: SearchResult) => number) => {
    const sorted = [...vinylRecords].sort(compareFn);
    setVinylRecords(sorted);
  };

  const handleDelete = (record: SearchResult) =>
    VinylRecords.deleteByID(record._id)
      .then((response) => {
        if (response.status == 204) {
          setVinylRecords(vinylRecords.filter((vinylRecord) => vinylRecord._id !== record._id));
          toast("Vinyl record deleted successfully");
        }
      })
      .catch((error) => toast(error.response?.data?.error ?? `${error}`));

  return (
    <div className="max-w-fit mx-auto my-3.5">
      {vinylRecords.length ? (
        <>
          <h2 className="text-center text-4xl font-bold">Vinyl Records List</h2>
          <div className="overflow-x-auto">
            <table className="table my-2">
              <thead>
                <tr>
                  <th className="text-center" />
                  <th className="text-center">
                    {/* {sortTitle == -1 ? "🔼" : sortTitle == 1 ? "🔽" : ""} */}
                    <button
                      className="link link-hover"
                      onClick={() => {
                        resetSortOrder();

                        const order = sortTitle ?? 1;
                        handleSort((l, r) => {
                          const l_title = l.title.toUpperCase();
                          const r_title = r.title.toUpperCase();
                          return order * (l_title < r_title ? -1 : l_title > r_title ? 1 : 0);
                        });

                        setSortTitle(order * -1);
                      }}
                    >
                      Title
                    </button>
                    {sortTitle == -1 ? "↑" : sortTitle == 1 ? "↓" : ""}
                  </th>
                  <th className="text-center">
                    <button
                      className="link link-hover"
                      onClick={() => {
                        resetSortOrder();

                        const order = sortArtist ?? 1;
                        handleSort((l, r) => {
                          const l_artist = l.artist.toUpperCase();
                          const r_artist = r.artist.toUpperCase();
                          return order * (l_artist < r_artist ? -1 : l_artist > r_artist ? 1 : 0);
                        });

                        setSortArtist(order * -1);
                      }}
                    >
                      Artist
                    </button>
                    {sortArtist == -1 ? "↑" : sortArtist == 1 ? "↓" : ""}
                  </th>
                  <th className="text-center">
                    <button
                      className="link link-hover"
                      onClick={() => {
                        resetSortOrder();

                        const order = sortYear ?? 1;
                        handleSort((l, r) => order * ((l.year ?? 0) - (r.year ?? 0)));

                        setSortYear(order * -1);
                      }}
                    >
                      Year
                    </button>
                    {!sortYear ? "" : sortYear < 0 ? "↑" : sortYear > 0 ? "↓" : ""}
                  </th>
                  <th className="text-center">
                    <button
                      className="link link-hover"
                      onClick={() => {
                        resetSortOrder();

                        const order = sortGenre ?? 1;
                        handleSort((l, r) => {
                          const l_genre = l.genre.toUpperCase();
                          const r_genre = r.genre.toUpperCase();
                          return order * (l_genre < r_genre ? -1 : l_genre > r_genre ? 1 : 0);
                        });

                        setSortGenre(order * -1);
                      }}
                    >
                      Genre
                    </button>
                    {sortGenre == -1 ? "↑" : sortGenre == 1 ? "↓" : ""}
                  </th>
                  <th className="text-center">
                    <button
                      className="link link-hover"
                      onClick={() => {
                        resetSortOrder();

                        const order = sortCondition ?? 1;
                        handleSort(
                          (l, r) =>
                            (VinylRecords.conditionOptions.findIndex((option) => option.value === l.condition) -
                              VinylRecords.conditionOptions.findIndex((option) => option.value === r.condition)) *
                            order
                        );

                        setSortCondition(order * -1);
                      }}
                    >
                      Condition
                    </button>
                    {sortCondition == -1 ? "↑" : sortCondition == 1 ? "↓" : ""}
                  </th>
                  <th className="text-center" />
                </tr>
              </thead>
              <tbody>
                {vinylRecords.map((record, nr) => {
                  const condition = VinylRecords.conditionOptions.find((option) => option.value === record.condition);

                  return (
                    <tr key={record._id} className="hover">
                      <th className="text-center">{nr + 1}</th>
                      <th className="text-center">{record.title}</th>
                      <th className="text-center">{record.artist}</th>
                      <th className="text-center">{record.year}</th>
                      <th className="text-center">{record.genre}</th>
                      <th className="text-center tooltip-info tooltip-success tooltip-warning tooltip-error text-info text-success text-warning text-error">
                        <span className={`tooltip tooltip-${condition?.color} text-${condition?.color}`} data-tip={condition?.label}>
                          {record.condition}
                        </span>
                      </th>
                      <th className="text-center">
                        <div className="join">
                          <a href={`/edit/${record._id}`} className="btn btn-outline btn-active join-item">
                            Edit
                          </a>
                          <a className="btn btn-outline join-item" onClick={() => openDialog(record._id)}>
                            Delete
                          </a>
                        </div>
                        <Dialog
                          id={record._id}
                          classes="backdrop-blur backdrop-saturate-50"
                          title={`Confirm delete ${record.title} by ${record.artist}`}
                          content={`Are you sure you want to delete ${record.title} by ${record.artist}?`}
                          actions={[
                            {
                              label: "Yes",
                              onClick: () => handleDelete(record),
                            },
                          ]}
                          closeLabel="No"
                        />
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex my-0">
        <div className="flex-1" />
        <div className="flex-none">
          <div className="join join-vertical">
            <div className="join-item" />
            <a href="/add" className="btn btn-outline btn-wide join-item">
              Add Record
            </a>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
}

export default VinylList;
