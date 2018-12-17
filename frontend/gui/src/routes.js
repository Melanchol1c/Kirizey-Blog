import React from "react";
import { Switch, Route } from "react-router-dom";
import ArticleList from "./containers/ArticleList";
import ArticleDetail from "./containers/ArticleDetail";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={ArticleList} />
    <Route path="/:articleID" component={ArticleDetail} />
  </Switch>
);

export default BaseRouter;
