import React from "react";
import axios from "axios";
import { Card, Button } from "antd";
import CustomForm from "../components/Form";

class ArticleDetail extends React.Component {
  state = {
    article: {}
  };

  componentDidMount() {
    const articleID = this.props.match.params.articleID;

    axios
      .get(`http://127.0.0.1:8000/api/article/${articleID}/`)
      .then(res => this.setState({ article: res.data }));
  }

  handleDelete = e => {
    const articleID = this.props.match.params.articleID;
    axios.delete(`http://127.0.0.1:8000/api/article/${articleID}/`);
    this.props.history.push("/");
    this.forceUpdate();
  };

  render() {
    return (
      <React.Fragment>
        <Card title={this.state.article.title}>
          <p>{this.state.article.content}</p>
        </Card>
        <br />
        <h2>Update article</h2>
        <CustomForm
          requestType="put"
          articleID={this.props.match.params.articleID}
          btnText="Update"
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default ArticleDetail;
