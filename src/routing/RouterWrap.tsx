import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import App from "../App"
import PeopleTable from "../features/table/PeopleTable"
import SignUp from "../features/signUp/SignUp"

import ProtectedRoute from "./ProtectedRoute"

const RouterWrap = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <div>Oops! There was an error.</div>,
      children: [
        {
          index: true,
          element: <SignUp />,
        },
        {
          path: "table",
          element: (
            <ProtectedRoute>
              <PeopleTable />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Navigate to="/" replace={true} />,
        },
      ],
    },
  ])

  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  )
}

export default RouterWrap
