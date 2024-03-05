import { FormEvent, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as VinylRecords from "../utils/VinylRecords";

function VinylEdit() {
  // console.log(useParams);
  const { vinylRecordID } = useParams();

  const inputtedTitle = useRef<HTMLInputElement>(null);
  const inputtedArtist = useRef<HTMLInputElement>(null);
  const inputtedYear = useRef<HTMLInputElement>(null);
  const inputtedGenre = useRef<HTMLInputElement>(null);
  const selectedCondition = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (vinylRecordID)
      VinylRecords.findByID(vinylRecordID)
        .then((response) => {
          const record = response.data.result;
          inputtedTitle.current!.value = record.title;
          inputtedArtist.current!.value = record.artist;
          inputtedYear.current!.value = record.year;
          inputtedGenre.current!.value = record.genre;
          selectedCondition.current!.value = record.condition;
        })
        .catch((error) => {
          toast(error.response?.data?.error ?? `${error}`);
        });
  }, [vinylRecordID]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (vinylRecordID)
      VinylRecords.editByID(vinylRecordID, {
        title: inputtedTitle.current!.value,
        artist: inputtedArtist.current!.value,
        year: Number.parseInt(inputtedYear.current!.value),
        genre: inputtedGenre.current!.value,
        condition: selectedCondition.current!.value,
      })
        .then((response) => {
          toast(response.data.message);
          navigate("/"); // navigate route to default List view
        })
        .catch((error) => toast(error.response?.data?.error ?? `${error}`));
  };

  /**
   * Navigates route to default List view.
   * @returns `() => navigate("/")`
   */
  const handleCancel = () => navigate("/");

  return (
    <div className="max-w-fit mx-auto my-3.5">
      <h2 className="text-center text-4xl font-bold">Edit Vinyl Record</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex join join-vertical">
          <div className="my-2 join-item">
            <input className="label label-text w-full" type="text" placeholder="Title" ref={inputtedTitle} required />
          </div>
          <div className="my-2 join-item">
            <input className="label label-text w-full" type="text" placeholder="Artist" ref={inputtedArtist} required />
          </div>
          <div className="my-2 join-item">
            <input className="label label-text w-full" type="text" placeholder="Year" pattern="\d{4}" title="4-digit numbers only" ref={inputtedYear} />
          </div>
          <div className="my-0 join-item">
            <input className="label label-text w-full" type="text" placeholder="Genre" ref={inputtedGenre} />
          </div>
          <div className="-my-0 join-item">
            <label className="label label-text">
              <span className="w-full">Condition</span>
              <select className="label label-text w-full" ref={selectedCondition}>
                {VinylRecords.conditionOptions.map((option: { label: string; value: string }) => (
                  <option key={option.label} value={option.value} className="text-left">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex my-0 join-item">
            <button type="submit" className="btn btn-outline join-item flex-1">
              Edit Record
            </button>
            <button type="button" className="btn btn-outline join-item flex-1" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default VinylEdit;
