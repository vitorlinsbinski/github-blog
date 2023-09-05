import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { Profile } from "./pages/Profile";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>

        <Route path=":username/:repo" element={<Profile />}></Route>
        <Route path=":username/:repo/:issue" element={<Post />}></Route>
      </Route>
    </Routes>
  );
}
