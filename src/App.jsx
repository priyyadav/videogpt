import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import Login from "./components/Login"; // Assuming you have a Login component
import store from "./utils/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./utils/firebase";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);

function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };


  return (
    <Provider store={store}>
      <div>
        {user ? (
          <>
            <Header onLogout={handleLogout} />
            <RouterProvider router={appRouter}>
              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="watch" element={<WatchPage />} />
              </Routes>
            </RouterProvider>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Provider>
  );
}

export default App;
