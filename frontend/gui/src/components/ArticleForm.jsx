import React from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import "./ArticleForm.scss";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class ArticleForm extends React.Component {
  state = {
    tags: null,
    article: null
  };

  async componentDidMount() {
    let res = await axios.get("http://127.0.0.1:8000/api/tag/");
    await this.setState({ tags: [...res.data] });
    await console.log(this.props);
    if (this.props.requestType === "put") {
      const articleID = await this.props.articleID;
      let res = await axios.get(
        `http://127.0.0.1:8000/api/articles/${articleID}/`
      );
      await this.setState({ article: res.data });
    }
  }

  handleChangeTag = value => this.setState({ selectedTag: value });

  handleFormSubmit = async (e, requestType, articleID) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

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
          let users = await axios.get("http://127.0.0.1:8000/api/users/");
          let userok = await users.data.filter(
            u => u.username === localStorage.user
          );
          let userID = await userok[0].id;
          const res = await axios.post(
            "http://127.0.0.1:8000/api/articles/create/",
            {
              title: title,
              content: content,
              created_date: date,
              tag: this.state.selectedTag,
              user: userID
            }
          );
          await console.log(res);
          return await this.forceUpdate();
        } catch (e) {
          return console.log(e);
        }

      case "put":
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/articles/${articleID}/update/`,
            {
              title: title,
              content: content,
              tag: this.state.selectedTag
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
    let tags = this.state.tags;
    let article = this.state.article ? this.state.article : null;
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
          <FormItem>
            <Input
              name="title"
              placeholder="Заголовок"
              defaultValue={article ? article.title : ""}
            />
          </FormItem>
          <FormItem>
            <TextArea
              autosize={{ minRows: 4, maxRows: 12 }}
              name="content"
              placeholder="Текст статьи"
              defaultValue={article ? article.content : "11"}
            />
          </FormItem>
          <FormItem>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.handleChangeTag}
              defaultValue={article ? article.tag.id : "11"}
              // onFocus={handleFocus}
              // onBlur={handleBlur}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {tags
                ? tags.map(tag => (
                    <Option key={tag.id} value={tag.id}>
                      {tag.name}
                    </Option>
                  ))
                : console.log(1)}
            </Select>
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
