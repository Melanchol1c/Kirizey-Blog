import React from "react";

import { Form, Input, Button } from "antd";
import axios from "axios";
import "./ArticleForm.scss";

const FormItem = Form.Item;
const { TextArea } = Input;

class ArticleForm extends React.Component {
  handleFormSubmit = async (e, requestType, articleID) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

    let users = await axios.get("http://127.0.0.1:8000/api/users/");
    let userok = await users.data.filter(u => u.username === localStorage.user);
    let userID = await userok[0].id;

    let date = await new Date();
    var dd = await date.getDate();
    var mm = (await date.getMonth()) + 1; //January is 0!

    var yyyy = await date.getFullYear();
    if (dd < 10) {
      dd = (await "0") + dd;
    }
    if (mm < 10) {
      mm = (await "0") + mm;
    }
    date = await `${dd}.${mm}.${yyyy}`;

    switch (requestType) {
      case "post":
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/article/", {
            title: title,
            content: content,
            user: userID,
            created_date: date
            // tag: { id: 1 }
          });
          return console.log(res);
        } catch (e) {
          return console.log(e);
        }

      case "put":
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/article/${articleID}/`,
            {
              title: title,
              content: content
            }
          );
          return console.log(res);
        } catch (e) {
          return console.log(e);
        }

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
          <FormItem label="">
            <Input name="title" placeholder="Заголовок" />
          </FormItem>
          <FormItem label="">
            <TextArea rows={6} name="content" placeholder="Текст статьи" />
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

export default ArticleForm;
