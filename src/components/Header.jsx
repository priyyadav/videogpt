import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/AppSlice";

import { cacheResults } from "../utils/searchSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";


const Header = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const handleSignOut = () => {
   props.onLogout()
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
       if (user) {
         const { uid, email, displayName, photoURL } = user;
         dispatch(
           addUser({
             uid: uid,
             email: email,
             displayName: displayName,
             photoURL: photoURL,
           })
         );
         navigate("/");
       } else {
         dispatch(removeUser());
         navigate("/");
       }
     });
     console.log("kok")
 
     // Unsiubscribe when component unmounts
     
   }, []);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      
        getSearchSugsestions();
      
    }, 200);
    console.log("kokkkk")

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSugsestions = async () => {
    let YOUTUBE_SEARCH=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=AIzaSyCMrSg3nn-0q0KlPx0AJ7Q2l3VOwOT90oc`
    const data=await fetch(YOUTUBE_SEARCH)
    const json = await data.json();
   
    setSuggestions(json.items);


    dispatch(
      cacheResults({
        [searchQuery]: json.items,
      })
    );
  };
    
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  console.log(suggestions,"su")
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://w7.pngwing.com/pngs/147/745/png-transparent-video-production-freemake-video-er-video-icon-free-angle-text-rectangle-thumbnail.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
  <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
    <ul>
      {suggestions?.map((suggestion) => (
        <li key={suggestion.id.videoId} className="py-2 px-3 shadow-sm hover:bg-gray-100">
          🔍 {suggestion.snippet.title}
        </li>
      ))}
    </ul>
  </div>
)}
      </div>
      <div className="col-span-1 flex">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
        <button onClick={handleSignOut} className="font-bold text-black -mt-4 ">
            (Sign Out)
          </button>
      </div>
    </div>
  );
};

export default Header;
