import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login())
    }
  }, [dispatch])

  return (
    <>
      {isLoggedIn &&
        <header>
          <Header />
        </header>}
      <main>
        <Routes>
          {!isLoggedIn ?
            <>
              <Route path="/" element={<Auth />} />
              <Route path='/auth' element={<Auth />} /> </> :
            <>
              <Route path='/blogs' element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          }
        </Routes>
      </main>
    </>
  );
}

export default App;
