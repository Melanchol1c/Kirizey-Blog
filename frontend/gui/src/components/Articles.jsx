import React from "react";
import { List, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";
import "./Articles.scss";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Articles extends React.Component {
  state = {
    likedArticles: []
  };

  render() {
    let { data } = this.props;
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ pageSize: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="like-o" text={item.likes} />,
              <IconText type="message" text={item.comments_count} />
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <React.Fragment>
                  <p className="username">Автор: {item.user.username}</p>
                  <Link to={`/articles/${item.id}`}>{item.title}</Link>
                </React.Fragment>
              }
              description={item.name}
            />
            {item.content.length > 200
              ? item.content.substr(0, 200) + "..."
              : item.content}
          </List.Item>
        )}
      />
    );
  }
}

export default Articles;
