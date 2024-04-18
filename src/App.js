import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import { Navbar } from "./components/navbar/Navbar";
import Bookmarks from "./pages/bookmarks/Bookmarks";

function App() {
  const HomeLayout = () => {
    return (
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/bookmarks",
          element: <Bookmarks />,
        },
      ],
    },

    // error page path
    //  {
    //    path: "/*",
    //    element: <Error404 />,
    //  },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
