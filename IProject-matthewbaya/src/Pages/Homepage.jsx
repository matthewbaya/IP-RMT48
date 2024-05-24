import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/user/userSlice";

export default function Homepage() {
  const dispatch = useDispatch();
  const [matchingUsers, setMatchingUsers] = useState([]);
  const availableUsers = useSelector((state) => state.user.list);

  // async function fetchUsersss() {
  //   try {
  //     let { data } = await axios({
  //       method: "GET",
  //       url: "http://localhost:3000/find-matches",
  //       headers: { Authorization: localStorage.getItem("access_token") },
  //     });
  //     setMatchingUsers(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    dispatch(fetchUsers());
    // fetchUsers();
  }, []);
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div className="flex">
        <Sidebar></Sidebar>
        {availableUsers.map((e) => {
          return <MatchCard key={e.id} user={e}></MatchCard>;
          // return <Card key={e.id} cards={e}></Card>;
        })}
      </div>
    </>
  );
}
