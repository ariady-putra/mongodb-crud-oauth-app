import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as VinylRecords from "../utils/VinylRecords";

function VinylAdd() {
  const inputtedTitle = useRef<HTMLInputElement>(null);
  const inputtedArtist = useRef<HTMLInputElement>(null);
  const inputtedYear = useRef<HTMLInputElement>(null);
  const inputtedGenre = useRef<HTMLInputElement>(null);
  const selectedCondition = useRef<HTMLSelectElement>(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    VinylRecords.add({
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
      <h2 className="text-center text-4xl font-bold">Add Vinyl Record</h2>
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
            {/* <div className="flex-1" /> */}
            {/* <div className="flex-none join"> */}
            <button type="submit" className="btn btn-outline join-item flex-1">
              Add Record
            </button>
            <button type="button" className="btn btn-outline join-item flex-1" onClick={handleCancel}>
              Cancel
            </button>
            {/* </div> */}
            {/* <div className="flex-1" /> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default VinylAdd;
