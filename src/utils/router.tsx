import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Course from "../components/Course";
import Courses from "../components/Courses";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<NotFound />}>
        <Route path="/error" element={<NotFound />} />
        <Route index element={<Courses />} />
          <Route path=":page" element={<Courses />} />
          <Route path="courses/:courseId" element={<Course />} />
      </Route>
    )
  )

export default router;