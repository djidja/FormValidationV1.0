import React, { Component } from "react";

const startFormConfig = {
  name: "",
  nameError: "",
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  phone: "",
  phoneError: "",
  url: "",
  urlError: "",
  formStatus: {
    text: "",
    color: ""
  }
};

class Form extends Component {
  state = startFormConfig;

  capitalize = nameToCapitalize => {
    this.setState({
      name:
        nameToCapitalize.charAt(0).toUpperCase() +
        nameToCapitalize.slice(1).toLowerCase()
    });
  };

  submited = event => {
    event.preventDefault();
    let res = this.validate();

    if (res) {
      this.setState({ formStatus: { text: "Form is valid!", color: "green" } });
      console.log("nema greske");
    } else {
      this.setState({ formStatus: { text: "Form is invalid!", color: "red" } });
      console.log("ima greske");
    }
    console.log(this.state.nameError.length, this.state.emailError.length);
  };

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let phoneError = "";
    let urlError = "";
    const emailFormat = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/); //check for string format; check out what regex is!
    const nameFormat = new RegExp(/^[A-Za-z]+$/);
    const phoneFormat = new RegExp(/^[0-9]+$/);
    const urlFormat = new RegExp(
      //eslint-disable-next-line
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
    );

    if (this.state.name.length < 3 || this.state.name.length > 30) {
      nameError = "Your name have to have between 3 and 30 characters!";
    } else if (
      !nameFormat.test(
        this.state.name
      ) /*already prepared rexeg is testing if form is compatible with name property*/
    ) {
      nameError = "Only english alphabet is allowed, no special signs!";
    }
    if (!emailFormat.test(this.state.email)) {
      emailError = "Email is not in a valid format!";
    }
    if (this.state.password.length < 6 || this.state.password.length > 16) {
      passwordError = "Password must contain between 6 and 16 characters!";
    }
    if (!phoneFormat.test(this.state.phone)) {
      phoneError = "Phone can only contain numbers!";
    } else if (this.state.phone.length !== 10) {
      phoneError = "Phone has to have 10 digits!";
    } else if (
      this.state.phone.charAt(0) === "0" ||
      this.state.phone.charAt(0) === "1"
    ) {
      phoneError = "Phone cant start with 0 or 1";
    }
    if (!urlFormat.test(this.state.url)) {
      urlError = "Invalid URL format!";
    }
    if (nameError || emailError || phoneError || passwordError || urlError) {
      this.setState({
        nameError,
        emailError,
        phoneError,
        passwordError,
        urlError
      });
      return false;
    } else {
      this.setState({
        nameError,
        emailError,
        phoneError,
        passwordError,
        urlError
      });
      return true;
    }
  };

  changed = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Forma ideale</h1>
        <form onSubmit={this.submited}>
          <div>
            <label>name</label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={this.state.name}
              onChange={
                (this.changed,
                event => {
                  this.capitalize(event.target.value);
                })
              }
            />
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.nameError}
            </div>
          </div>
          <div>
            <label>e-mail</label>
            <input
              // type="email" cant be submitted and therefore our error message dont appear!
              type="text"
              name="email"
              placeholder="Your email"
              value={this.state.email}
              onChange={this.changed}
            />
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.emailError}
            </div>
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={this.state.password}
              onChange={this.changed}
            />
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.passwordError}
            </div>
          </div>
          <div>
            <label>Phone</label>
            <input
              // type="url" cant be submitted and therefore our error message dont appear!
              type="text"
              name="phone"
              placeholder="3813503535"
              value={this.state.phone}
              onChange={this.changed}
            />
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.phoneError}
            </div>
          </div>
          <div>
            <label>URL</label>
            <input
              // type="url" cant be submitted and therefore our error message dont appear!
              type="text"
              name="url"
              placeholder="https://example.com"
              value={this.state.url}
              onChange={this.changed}
            />
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.urlError}
            </div>
          </div>
          <button type="submit">Submit here !</button>
        </form>
        <p style={{ color: this.state.formStatus.color }}>
          {this.state.formStatus.text}
        </p>
      </div>
    );
  }
}

export default Form;
