import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import { getCurrentLoginUser } from 'stores/account/actions';
import { Home } from './Home/Home';
import { LeftMenu } from './LeftMenu/LeftMenu';
import { TopBar } from './TopBar/TopBar';
import { Users } from './Users/Users';

export const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentLoginUser()(dispatch);
  }, []);

  return (
    <Fragment>
      <LeftMenu />
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <TopBar />
          {/* Begin Page Content */}
          <div className="container-fluid">
            <Routes>
              <Route path='users' element={<Users />} />
              <Route path='' element={<Home />} />
            </Routes>
          </div>
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2021</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </Fragment>
  );
};
