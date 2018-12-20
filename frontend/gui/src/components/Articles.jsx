import React from "react";
import { List, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./Articles.scss";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Articles extends React.Component {
  state = {};
  render() {
    console.log(this.props.data);
    return (
      <Row>
        <Col span={16}>
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
                  title={<Link to={`/articles/${item.id}`}>{item.title}</Link>}
                />
                {item.content.length > 200
                  ? item.content.substr(0, 200) + "..."
                  : item.content}
              </List.Item>
            )}
          />
        </Col>
        <Col span={8} />
      </Row>
    );
  }
}

export default Articles;
