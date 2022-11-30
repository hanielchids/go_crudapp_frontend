import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import axios from "axios";
import moment from "moment";

function EachUser({ user, fetchData }) {
  const [nameValue, setNameValue] = useState(user.name);
  const [emailValue, setEmailValue] = useState(user.email);
  const [dateValue, setDateValue] = useState(
    moment(user.date).format("YYYY-MM-DD")
  );
  const [cityValue, setCityValue] = useState(user.city);
  const [countryValue, setCountryValue] = useState(user.country);

  const openModal = () => {
    document.getElementById("new-modal-" + user.ID).classList.remove("hidden");
  };
  const closeModal = () => {
    document.getElementById("new-modal-" + user.ID).classList.add("hidden");
  };
  const completeForm = () => {
    closeModal();
    fetchData();
  };

  const updateUser = (e) => {
    e.preventDefault();
    var form = document.getElementById(`editform-${user.ID}`);
    var formData = new FormData(form);
    axios
      .patch(`${API_URL}/users/${user.ID}`, formData)
      .then((res) => completeForm())
      .catch((error) => console.log(error.response));
  };

  const deleteUser = () => {
    if (window.confirm("Are you sure you want to delete this user??") == true) {
      axios
        .delete(`${API_URL}/users/${user.ID}`)
        .then((res) => fetchData())
        .catch((error) => console.log(error.response));
    } else {
      console.log("You canceled!");
    }
  };

  return (
    <div>
      <table className="table-auto mx-1">
        {/* <thead>
          <tr>
            <th className="border border-slate-600 w-10 p-2 ">ID</th>
            <th className="border border-slate-600 w-40 p-2">Name</th>
            <th className="border border-slate-600 w-48  p-2">Email</th>
            <th className="border border-slate-600 w-40 p-2">Date</th>
            <th className="border border-slate-600 w-40 p-2">City</th>
            <th className="border border-slate-600 w-40 p-2">Country</th>
            <th className="border border-slate-600 w-10 p-2">Edit</th>
            <th className="border border-slate-600 w-10 p-2">Delete</th>
          </tr>
        </thead> */}
        <tbody>
          <tr className="border border-slate-600">
            <td className="border-t-0 border-slate-600 w-10 p-1">{user.ID}</td>
            <td className="border border-slate-600 w-1/6 p-1">{user.name}</td>
            <td className="border border-slate-600 w-48 p-1">{user.email}</td>
            <td className="border border-slate-600 w-40 p-1">{user.date}</td>
            <td className="border border-slate-600 w-40 p-1">{user.city}</td>
            <td className="border border-slate-600 w-40 p-1">{user.country}</td>
            <td className="border border-slate-600 w-10 p-2">
              {/* <Link to={`/profile/${user.ID}`}>View Profile</Link> */}
              <button
                onClick={openModal}
                className="bg-green-700 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </td>
            <td className="border border-slate-600 w-10 p-2">
              <button
                onClick={deleteUser}
                className="bg-red-600 text-white px-3 py-1.5 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Start Modal */}
      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        id={`new-modal-${user.ID}`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="relative inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full">
              <form
                id={`editform-${user.ID}`}
                onSubmit={updateUser}
                method="post"
              >
                <div className="bg-white">
                  <div className="flex justify-between px-8 py-4 border-b">
                    <h1 className="font-medium">Update user</h1>
                    <button type="button" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                  <div className="px-8 py-8">
                    <div className="mb-5">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={cityValue}
                        onChange={(e) => setCityValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-10">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={countryValue}
                        onChange={(e) => setCountryValue(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 text-white py-1.5 px-4 rounded"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal */}
    </div>
  );
}

export default EachUser;
