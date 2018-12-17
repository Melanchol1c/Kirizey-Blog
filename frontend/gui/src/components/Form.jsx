import React from "react";

import { Form, Input, Button } from "antd";
import axios from "axios";

const FormItem = Form.Item;

class CustomForm extends React.Component {
  handleFormSubmit = (e, requestType, articleID) => {
    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

    switch (requestType) {
      case "post":
        return axios
          .post("http://127.0.0.1:8000/api/article/", {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(e => console.log(e));

      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/article/${articleID}/`, {
            title: title,
            content: content
          })
          .then(res => console.log(res))
          .catch(e => console.log(e));

      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <FormItem label="Title">
            <Input name="title" placeholder="input placeholder" />
          </FormItem>
          <FormItem label="Content">
            <Input name="content" placeholder="input placeholder" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
