import React from "react";
import Articles from "../components/Articles";
import axios from "axios";
import ArticleForm from "../components/ArticleForm";
import { Modal, Button } from "antd";

class ArticleList extends React.Component {
  state = {
    articles: [],
    visible: false
  };

  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/article/")
      .then(res => this.setState({ articles: [...res.data] }));
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Articles data={this.state.articles} />
        {localStorage.user ? (
          <Button type="primary" onClick={this.showModal}>
            Написать статью
          </Button>
        ) : (
          <p>Авторизируйтесь, чтобы написать статью.</p>
        )}

        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <h2>Create an article</h2>
          <ArticleForm
            requestType="post"
            articleID={null}
            btnText="Create"
            {...this.props}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ArticleList;
