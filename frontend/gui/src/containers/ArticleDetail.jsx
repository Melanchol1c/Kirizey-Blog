import React from "react";
import axios from "axios";
import { Button, Modal, Input, Card, Icon, List, Avatar } from "antd";
import ArticleForm from "../components/ArticleForm";
import "./ArticleDetail.scss";

class ArticleDetail extends React.Component {
  state = {
    article: null,
    currentUserId: null,
    comment: null,
    comments: [],
    liked: false
  };

  async componentDidMount() {
    const articleID = await this.props.match.params.articleID;

    await axios
      .get(`http://127.0.0.1:8000/api/articles/${articleID}/`)
      .then(res => this.setState({ article: res.data }));

    await axios
      .get(`http://127.0.0.1:8000/api/comments/`)
      .then(res => this.setState({ comments: [...res.data] }));

    let comments = await this.state.comments;
    await console.log(comments);
    comments = await comments.filter(
      c => c.article.id === this.state.article.id
    );
    await this.setState({ comments: [...comments] });
    await console.log(...this.state.comments);
  }

  handleDelete = async e => {
    const articleID = await this.props.match.params.articleID;
    await axios.delete(
      `http://127.0.0.1:8000/api/articles/${articleID}/delete/`
    );
    await this.forceUpdate();
    await this.props.history.push("/");
  };

  showModal = () => this.setState({ visible: true });

  handleCancel = () => this.setState({ visible: false });

  setLike = async liked => {
    let { article } = await this.state;
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/articles/${article.id}/update/`,
        {
          title: article.title,
          content: article.content,
          likes: liked ? (article.likes -= 1) : (article.likes += 1)
        }
      );
      await this.setState({ liked: !this.state.liked });
      return await console.log(res);
    } catch (e) {
      return await console.log(e);
    }
  };

  handleSendComment = async e => {
    e.preventDefault();
    let { article } = await this.state;

    if (this.state.comment && localStorage.user !== undefined) {
      let users = await axios.get("http://127.0.0.1:8000/api/users/");
      let userok = await users.data.filter(
        u => u.username === localStorage.user
      );
      let userID = await userok[0].id;

      let comment = {
        content: this.state.comment,
        article: this.state.article.id,
        user: userID
      };
      let res = await axios.post(
        "http://127.0.0.1:8000/api/comments/create/",
        comment
      );

      if (res.data) {
        await this.setState({ comments: [...this.state.comments, comment] });
        axios.put(`http://127.0.0.1:8000/api/articles/${article.id}/update/`, {
          title: article.title,
          content: article.content,
          comments_count: (article.comments_count += 1)
        });
        return await document.location.reload(true);
      }
      await console.log(res);
    }
  };

  hadleComment = e => this.setState({ comment: e.target.value });

  render() {
    let { article, comments, liked, visible } = this.state;
    const { TextArea } = Input;
    return (
      <React.Fragment>
        {article ? (
          <div>
            <Card
              title={article.title}
              extra={
                <h3 className="article_author">
                  {article.tag ? (
                    <p className="article_author">
                      {article.tag.name} <br />
                      {article.created_date}
                    </p>
                  ) : (
                    <React.Fragment />
                  )}
                </h3>
              }
              actions={[
                localStorage.user !== undefined ? (
                  <Icon
                    type="like"
                    style={liked ? { color: "red" } : { color: "gray" }}
                    onClick={() => this.setLike(liked)}
                  />
                ) : (
                  <React.Fragment />
                ),
                localStorage.user === article.user.username ? (
                  <Icon type="edit" onClick={this.showModal} />
                ) : (
                  <React.Fragment />
                ),

                localStorage.user === article.user.username ? (
                  <Icon type="delete" onClick={this.handleDelete} />
                ) : (
                  <React.Fragment />
                )
              ]}
            >
              <p>{article.content}</p>
            </Card>

            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="#">{item.user.username}</a>}
                    description={item.content}
                  />
                </List.Item>
              )}
            />
            <br />
            {localStorage.user !== undefined ? (
              <React.Fragment>
                <TextArea
                  rows={4}
                  name="comment"
                  placeholder="Оставьте комментарий"
                  onChange={this.hadleComment}
                />
                <Button
                  className="comment_btn"
                  type="primary"
                  onClick={this.handleSendComment}
                >
                  Комментировать
                </Button>
              </React.Fragment>
            ) : (
              <p className="please_login">
                Войдите, чтобы оставить комментарий
              </p>
            )}

            <br />

            <Modal
              title="Редактировать статью"
              visible={visible}
              onCancel={this.handleCancel}
              centered
              footer={null}
            >
              <ArticleForm
                requestType="put"
                articleID={this.props.match.params.articleID}
                btnText="Обновить"
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
