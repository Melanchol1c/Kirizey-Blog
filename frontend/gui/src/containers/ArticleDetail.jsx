import React from "react";
import axios from "axios";
import { Card, Button, Modal, Input } from "antd";
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
    const { TextArea } = Input;
    return (
      <React.Fragment>
        <Card title={this.state.article.title}>
          <p>{this.state.article.content}</p>
        </Card>
        <br />

        <TextArea rows={4} placeholder="Оставьте комментарий" />
        <Button type="primary" onClick={this.showModal}>
          Комментировать
        </Button>
        <Button type="primary" onClick={this.showModal}>
          Редактировать
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <h2>Update an article</h2>
          <CustomForm
            requestType="put"
            articleID={this.props.match.params.articleID}
            btnText="Update"
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ArticleDetail;
