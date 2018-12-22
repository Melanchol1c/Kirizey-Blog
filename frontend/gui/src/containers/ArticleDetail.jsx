import React from "react";
import axios from "axios";
import { Button, Modal, Input, Card, Icon } from "antd";
import ArticleForm from "../components/ArticleForm";
import "./ArticleDetail.scss";

class ArticleDetail extends React.Component {
  state = {
    article: null,
    currentUserId: null
  };

  async componentDidMount() {
    const articleID = await this.props.match.params.articleID;

    await axios
      .get(`http://127.0.0.1:8000/api/article/${articleID}/`)
      .then(res => this.setState({ article: res.data }));
  }

  handleDelete = async e => {
    const articleID = await this.props.match.params.articleID;
    await axios.delete(`http://127.0.0.1:8000/api/article/${articleID}/`);
    await this.forceUpdate();
    await this.props.history.push("/");
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  setLike = async () => {
    console.log(this.state.article.likes);
    let likes = await (this.state.article.likes + 1);
    console.log(typeof likes);
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/article/${this.state.article.id}/`,
        {
          title: this.state.article.title,
          content: this.state.article.content,
          likes: likes
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        }
      );
      return console.log(res);
    } catch (e) {
      return console.log(e);
    }
  };

  render() {
    let article = this.state.article;
    console.log(article);
    const { TextArea } = Input;
    return (
      <React.Fragment>
        {this.state.article ? (
          <div>
            <Card
              title={article.title}
              extra={
                <h3 className="article_author">
                  {article.tag.name ? (
                    <p className="article_author">{article.tag.name}</p>
                  ) : (
                    <React.Fragment />
                  )}
                </h3>
              }
              actions={[
                <Icon type="like" onClick={this.setLike} />,
                <Icon type="edit" onClick={this.showModal} />,
                <Icon type="delete" onClick={this.handleDelete} />
              ]}
            >
              <p>{this.state.article.content}</p>
            </Card>

            <br />
            <TextArea rows={4} placeholder="Оставьте комментарий" />
            <br />
            <Button
              onClick={this.setLike}
              className="comment_btn"
              type="primary"
            >
              Комментировать
            </Button>
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              centered
              footer={null}
            >
              <h2>Update an article</h2>
              <ArticleForm
                requestType="put"
                articleID={this.props.match.params.articleID}
                btnText="Update"
              />
            </Modal>
          </div>
        ) : (
          <p>No data</p>
        )}
      </React.Fragment>
    );
  }
}

export default ArticleDetail;
