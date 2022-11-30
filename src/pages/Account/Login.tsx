import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { logout } from '../../stores/account/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../stores';
import { useLocation, useNavigate } from 'react-router';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../../stores/account/types';
import { userService } from '../../services';
import { Loading } from '../../components/Loading';
import { LocationState } from '../../components/LocationState';

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });


  const [submitted, setSubmitted] = useState(false);

  const loading = useSelector<AppState>((state) => state.account.loading);

  const { email, password } = inputs;

  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate();


  useEffect(() => {
    dispatch(logout());
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      const { from } = location.state  as LocationState|| { from: { pathname: '/' } };
      dispatch({
        type: LOGIN_REQUEST,
        payload: {
          email: email,
          password: password,
        },
      });

      userService.login(email, password).then(
        (res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res
          });
          navigate('/');
        }, (error) => {
          dispatch({
            type: LOGIN_FAILURE,
            payload: { error: error.toString() }
          });
        }
      );
    }
  };

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input type="email"
                          className={
                            "form-control form-control-user "
                            + (submitted && !email ? 'is-invalid' : '')}
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          onChange={handleChange} name="email" />
                        {submitted && !email && (
                          <div className='invalid-feedback'>
                            Email không được bỏ trống !
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <input type="password"
                          className={
                            "form-control form-control-user "
                            + (submitted && !password ? 'is-invalid' : '')}
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={handleChange}
                          name="password"
                        />
                        {submitted && !password && (
                          <div className='invalid-feedback'>
                            Password không được bỏ trống !
                          </div>
                        )}
                      </div>
                      <div className='form-group'>
                        <button className="btn btn-primary btn-user btn-block">
                          <Loading isLoading={loading}/>
                          Login
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="register.html">Create an Account!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
