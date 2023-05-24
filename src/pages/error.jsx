import React from "react";
import { Outlet, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return <h1>{error.message}</h1>;
};

export default ErrorPage;
