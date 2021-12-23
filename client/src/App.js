import React, { cloneElement, Component } from 'react';
import HomePage from './views/home';
import StudentLogin from './views/studentLogin';
import ErrorPage from './views/error';
import { Navigate, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentProfile from './views/studentProfile';
import OfficialLogin from './views/officialLogin';
import OfficialProfile from './views/officialProfile';

class App extends Component {

  render() {
    return (
      <>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/student-login" element={<LoginRoute redirectTo="/student-profile" role="student"><StudentLogin /></LoginRoute>} />
          <Route exact path="/student-profile" element={<ProtectedRoute redirectTo="/student-login" role="student"><StudentProfile /></ProtectedRoute>} />
          <Route exact path="/official-login" element={<LoginRoute redirectTo="/official-profile" role="official"><OfficialLogin /></LoginRoute>} />
          <Route exact path="/official-profile" element={<ProtectedRoute redirectTo="/official-login" role="official"><OfficialProfile /></ProtectedRoute>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer 
            position="top-center"
            autoClose={3000}
            hideProgressBar
            pauseOnHover
            draggable
        />
      </>
    );
  }
}

const checkLoginStatus = async (loggedInCallback, role) => {
  try {
    // const response = (role === 'student') ? await fetch('/api/auth/checkLoginStatus') : await fetch('/api/auth/checkOfficialLoginStatus');
    let response;
    if(role === 'student') {
      response = await fetch('/api/auth/checkStudentLoginStatus');
    }
    else {
      response = await fetch('/api/auth/checkOfficialLoginStatus');
    }
    // console.log(response.status);
    if(response.status === 200) {
      loggedInCallback();
    }
  } catch(err) {
    console.log(err);
  }
}

const PageLoader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
      <span className="fa fa-spinner fa-pulse fa-3x text-primary-color"></span>
    </div> 
  );
}

class ProtectedRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false
    }
  }

  async componentDidMount() {
    await checkLoginStatus(() => {this.setState({loggedIn: true});}, this.props.role);
    this.setState({loading: false});
  }

  logout = async () => {
    await fetch('/api/auth/logout');
    this.setState({loggedIn: false});
    toast.success('Logout successfull!');
  }

  render() {
    return(
      (this.state.loading) ? <PageLoader /> :
      (this.state.loggedIn) ? cloneElement(this.props.children, {logout: this.logout}) :
      <Navigate to={this.props.redirectTo} replace />
    );
  }
}

class LoginRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loggedIn: false
    }
  }

  async componentDidMount() {
    await checkLoginStatus(() => {this.setState({loggedIn: true});}, this.props.role);
    this.setState({loading: false});
  }

  async componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState({loading: true, loggedIn: false});
      await checkLoginStatus(() => {this.setState({loggedIn: true});}, this.props.role);
      this.setState({loading: false});
    }
  }

  render() {
    return(
      (this.state.loading) ? <PageLoader /> :
      (!this.state.loggedIn) ? this.props.children :
      <Navigate to={this.props.redirectTo} replace />
    );
  }
}

export default App;