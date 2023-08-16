import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../features/Auth/AuthSlice";

const SearchMemberDisplay = ({ users }) => {
  const dispatch = useDispatch();

  const getUser = (user) => {
    dispatch(selectUser(user));
  };
  return (
    <>
      {users ? (
        <div className="mt-4 h-48 p-2 overflow-auto">
          <>
            {users.map((user) => (
              <div
                onClick={() => getUser(user)}
                className="bg-gray-200 p-2 mb-2 rounded-2xl hover:cursor-pointer hover:bg-gray-300"
                key={user._id}
              >
                <div>
                  <div className="flex items-center mb-2">
                    <img
                      className="w-12 rounded-full"
                      src={user.pic}
                      alt="user pic"
                    />
                    <div className="ml-2 font-right">
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchMemberDisplay;
