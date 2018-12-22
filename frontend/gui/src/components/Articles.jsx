import React from "react";
import { List, Icon } from "antd";
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
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 5
        }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText type="like-o" text={item.likes} />,
              <IconText type="message" text="2" />
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  <Link to={`/articles/${item.id}`}>{item.title}</Link>
                  <br />
                  <p className="username">{item.user.username}</p>
                </div>
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
