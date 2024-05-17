import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
// import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Homepage() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => {
  //     prevIndex < cards.length - 1 ? prevIndex + 1 : 0;
  //   });
  // };

  async function fetchUsers() {
    try {
      let { data } = await axios({
        method: "GET",
        url: "http://localhost:3000/find-matches",
        headers: { Authorization: localStorage.getItem("access_token") },
      });
      setMatchingUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {/* <Navbar></Navbar> */}
      <div className="flex">
        <Sidebar></Sidebar>
        {matchingUsers.map((e) => {
          return <MatchCard key={e.id} user={e}></MatchCard>;
          // return <Card key={e.id} cards={e}></Card>;
        })}
      </div>
    </>
  );
}
