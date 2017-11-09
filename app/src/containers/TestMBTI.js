import React, { Component } from 'react';
import axios from 'axios';
import LinearProgress from 'material-ui/LinearProgress';
import { connect } from 'react-redux';
import * as mbtiTest from '../tools/mbtiTest';
import './TestMBTI.css';

class TestMBTI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      step: 0,
      answers: [],
      error: [{ param: '', msg: '' }],
      typeMBTI: '',
      profileLoaded: false,
    };
  }

  componentDidMount() {
    const url = '/api/me';
    axios({ url, method: 'GET' })
    .then(({ data: { error, user } }) => {
      if (error.length) {
        this.setState({ error });
      } else {
        const { answers, typeMBTI } = user.profile;
        console.log(user);
        this.setState({
          answers,
          typeMBTI,
          profileLoaded: true,
        });
      }
    });
  }

  onChange = (e) => {
    e.preventDefault();
    const answers = [...this.state.answers, parseInt(e.currentTarget.value, 10)];
    const step = this.state.step + 1;
    const completed = Math.floor((step / 70) * 100);
    if (step >= 70) {
      const typeMBTI = this.computeResult(answers);
      this.postResult(answers, typeMBTI);
      this.setState({ answers, step: 0, completed, typeMBTI });
    } else {
      this.setState({ answers, step, completed });
    }
  }

  computeLetter = (array, answers) => {
    let letter = 0;
    array.forEach((value) => {
      letter = letter + answers[value - 1];
    });
    return letter;
  }

  postResult = (answers, typeMBTI) => {
    const infos = { id: 'result-form', answers, typeMBTI };
    const url = '/api/me';
    axios.post(url, infos)
    .then(({ data }) => {
      const { error } = data;
      if (error.length) {
        this.setState({ error });
      } else {
        this.setState({
          error: [{ param: '', msg: '' }],
        });
      }
    })
    .catch(err => console.error('Error: ', err));
  }


  computeResult = (answers) => {
    let result = [
      mbtiTest.firstLetter,
      mbtiTest.secondLetter,
      mbtiTest.thirdLetter,
      mbtiTest.fourthLetter,
    ];

    result = result.map(array => (this.computeLetter(array, answers)));
    const profil = [
      result[0] <= 0 ? 'E' : 'I',
      result[1] <= 0 ? 'S' : 'N',
      result[2] <= 0 ? 'T' : 'F',
      result[3] <= 0 ? 'J' : 'P',
    ];
    return profil.join('');
  }

  render() {
    const {
      step,
      error,
      typeMBTI,
      profileLoaded,
    } = this.state;

    const question = mbtiTest.questions[step];
    const errorMessage = error[0].msg ? this.props.intl.formatMessage({ id: error[0].msg }) : '';

    return (
      // <div style={{ color: 'hsla(215, 5%, 50%, 1)' }}>
      <div className="mbtiTest">
        <h1>Test MBTI</h1>
        {profileLoaded && typeMBTI &&
          <h2>You are {typeMBTI}</h2>
        }
        {step <= 69 && profileLoaded && !typeMBTI &&
          <div>
            <h2>{question.q}</h2>
            <section>
              <div>
                <input type="radio" id="control_01" name="select" value="-1" onClick={this.onChange} />
                <label htmlFor="control_01">
                  <h2>{question.a[0]}</h2>
                </label>
              </div>
              <div>
                <input type="radio" id="control_02" name="select" value="1" onClick={this.onChange} />
                <label htmlFor="control_02">
                  <h2>{question.a[1]}</h2>
                </label>
              </div>
            </section>
            <div>
              <LinearProgress mode="determinate" value={this.state.completed} />
              <h3>{this.state.completed}%</h3>
            </div>
            <div className="infos-error">{errorMessage}</div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ i18n: { locale } }) => ({
  locale,
});

export default connect(mapStateToProps)(TestMBTI);
