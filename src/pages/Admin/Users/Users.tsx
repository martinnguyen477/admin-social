import { Pagination } from 'components/Pagination';
import { UrlConstants } from 'constants/constants';
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from 'stores';
import { loadUsersPaging } from 'stores/users/actions';
import { IUser } from 'stores/users/types';

export const Users = () => {
    const users: IUser[] = useSelector((state: AppState) => state.users.items);
    const totalItems = useSelector((state: AppState) => state.users.total);
    const pageSize = useSelector((state: AppState) => state.users.pageSize);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        loadUsersPaging(searchKeyword, currentPage)(dispatch);
    }, [dispatch, currentPage, searchKeyword]);

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        loadUsersPaging(searchKeyword, pageNumber)(dispatch);
    };

    const handleKeywordPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const clearSearch = () => {
        setSearchKeyword('');
        loadUsersPaging(searchKeyword, 1)(dispatch);
    };
    const userElements: JSX.Element[] = users.map((user) => {
        return (
            <tr key={`user_${user._id}`}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
            </tr>
        );
    });
    return (
        <Fragment>
            <div>
                <h1 className='h3 mb-2 text-gray-800'>Danh sách người dùng</h1>
                {showSearch && (
                    <div className='row mb-3'>
                        <div className='col-xl-12 col-md-12 mb-12'>
                            <div className='card'>
                                <h5 className='card-header'>Tìm kiếm</h5>
                                <div className='header-buttons'>
                                    <button
                                        className='btn btn-default'
                                        onClick={() => setShowSearch(false)}
                                    >
                                        Đóng
                                        <i className='fas fa-times'></i>
                                    </button>
                                </div>
                                <div className='card-body'>
                                    <form className='form-inline'>
                                        <div className='col-auto'>
                                            <input
                                                type='text'
                                                value={searchKeyword}
                                                onChange={handleKeywordPress}
                                                className='form-control'
                                                placeholder='Từ khoá'
                                            />
                                        </div>

                                        <button
                                            type='button'
                                            onClick={() =>
                                                loadUsersPaging(searchKeyword, currentPage)(dispatch)
                                            }
                                            className='btn btn-primary my-1'
                                        >
                                            Tìm kiếm
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => clearSearch()}
                                            className='btn btn-default my-1'
                                        >
                                            Xoá
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* DataTales Example */}
                <div className='card shadow mb-4'>
                    <div className='card-header py-3'>
                        <h6 className='m-0 font-weight-bold text-primary'>
                            Danh sách người dùng
                        </h6>
                    </div>
                    <div className='header-buttons'>
                        <button
                            type='button'
                            className='btn btn-link'
                            onClick={() => setShowSearch(true)}
                        >
                            Tìm kiếm
                        </button>

                        <Link
                            to={UrlConstants.USER_ADD}
                            className='btn btn-outline-success btn-sm'
                        >
                            <span className='fa fa-plus'></span> Thêm mới
                        </Link>
                    </div>
                    <div className='card-body'>
                        <div className='table-responsive'>
                            <table
                                className='table table-bordered'
                                id='dataTable'
                                width='100%'
                                cellSpacing={0}
                            >
                                <thead>
                                    <tr>
                                        <th>Tên</th>
                                        <th>Họ</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>{userElements}</tbody>
                            </table>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <Pagination
                            totalRecords={totalItems}
                            pageLimit={5}
                            pageSize={pageSize}
                            onPageChanged={onPageChanged}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
