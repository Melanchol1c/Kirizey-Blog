import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticleList from "./containers/ArticleList";
import ArticleDetail from "./containers/ArticleDetail";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={ArticleList} />
    <Route path="/articles/:articleID/" component={ArticleDetail} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
  </Switch>
);

export default BaseRouter;
