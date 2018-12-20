import React from "react";
import Articles from "../components/Articles";
import axios from "axios";
import CustomForm from "../components/Form";
import { Modal, Button } from "antd";

const listData = [];
for (let i = 0; i < 21; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

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

        <Button type="primary" onClick={this.showModal}>
          Написать статью
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          centered
          footer={null}
        >
          <h2>Create an article</h2>
          <CustomForm requestType="post" articleID={null} btnText="Create" />
        </Modal>
      </React.Fragment>
    );
  }
}

export default ArticleList;
