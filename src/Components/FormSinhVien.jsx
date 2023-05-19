import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addUser, setEditUser, setIsDisabled, updateUser } from '../redux/reducers/formReducer';
import { toSlug } from '../Utils/toSlug';
export default function FormSinhVien() {
  const dispatch = useDispatch();
  const { editUser, userList, isDisabled } = useSelector((state) => state.formReducer);

  const [user, setUser] = useState({
    id: '',
    phone: '',
    name: '',
    email: '',
    diaChi:'',
    });

  const [errors, setErrors] = useState({
    id: '',
    phone: '',
    name: '',
    email: '',
    diaChi:'',
  });

  useEffect(() => {
    if (editUser.id) {
      resetForm();
      dispatch(setIsDisabled(true));
      setUser(editUser);
    } else {
      dispatch(setIsDisabled(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editUser.id]);

  const resetForm = () => {
    setUser({
      id: '',
      phone: '',
      name: '',
      email: '',
      diaChi:'',
    });
    setErrors({
      id: '',
      phone: '',
      name: '',
      email: '',
      diaChi:'',
    });
  };

  const checkValidForm = () => {
    let isValid = true;

    // check init values of inputs
    for (let key in user) {
      if (user[key] === '') {
        isValid = false;
        setErrors((preErrors) => ({
          ...preErrors,
          [key]: 'Vui lòng không bỏ trống !',
        }));
      }
    }

    // check all errors
    for (let key in errors) {
      if (errors[key] !== '') {
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    let updatedErrors = { ...errors };

    // validation pattern
    const namePattern = /^([a-z]+)((\s{1}[a-z]+){1,})$/;
    const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    // validate
    if (value.trim() === '') {
      updatedErrors[name] = 'Thông tin không được để trống !';
    } else if (name === 'id' && value.length < 3) {
      updatedErrors.id = 'Nhập tối thiểu 3 ký tự !';
    } else if (name === 'id' && userList.find((user) => user.id === value)) {
      updatedErrors.id = 'mã số đã được sử dụng !';
    } else if (name === 'name' && !namePattern.test(toSlug(value))) {
      updatedErrors.name =
        'Thông tin không được chứa số và ký tự !';
    } else if (name === 'email' && !emailPattern.test(value)) {
      updatedErrors.email = 'Email không đúng định dạng !';
    } else if (name === 'phone' && !phonePattern.test(value)) {
      updatedErrors.phone = 'Số điện thoại không đúng định dạng !';
    } else {
      updatedErrors[name] = '';
    }

    setErrors(updatedErrors);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const isValid = checkValidForm();

    // dispatch add user to list
    if (isValid) {
      dispatch(addUser(user));
      resetForm();
    }
  };

  const handleUpdateUser = () => {
    const isValid = checkValidForm();

    if (isValid) {
      dispatch(updateUser(user));
      dispatch(setIsDisabled(false));
      resetForm();
      // reset edit user
      dispatch(setEditUser());
    }
  };

  return (
    <div className='container'>
      <h3 className='bg-dark text-white p-3'>Thông tin sinh viên</h3>

      <form onSubmit={handleAddUser}>
        <div className='row'>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='id' className='form-label'>
                Mã SV
              </label>
              <input
                type='number'
                className='form-control'
                id='id'
                name='id'
                value={user.id}
                min={0}
                onInput={handleChangeInput}
                disabled={isDisabled}
              />
              {errors.id && <div className='alert alert-danger mt-3'>{errors.id}</div>}
            </div>

            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Số điện thoại
              </label>
              <input
                type='number'
                className='form-control'
                id='phone'
                name='phone'
                value={user.phone}
                min={0}
                onInput={handleChangeInput}
              />
              {errors.phone && <div className='alert alert-danger mt-3'>{errors.phone}</div>}
            </div>
            
            <div className='mb-3'>
              <label htmlFor='diaChi' className='form-label'>
                Địa Chỉ
              </label>
              <input
                type='text'
                className='form-control'
                id='diaChi'
                name='diaChi'
                value={user.diaChi}
                onInput={handleChangeInput}
              />
              {errors.diaChi && <div className='alert alert-danger mt-3'>{errors.diaChi}</div>}
            </div>
          </div>

          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Họ tên
              </label>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={user.name}
                onInput={handleChangeInput}
              />
              {errors.name && <div className='alert alert-danger mt-3'>{errors.name}</div>}
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='text'
                className='form-control'
                id='email'
                name='email'
                value={user.email}
                onInput={handleChangeInput}
              />
              {errors.email && <div className='alert alert-danger mt-3'>{errors.email}</div>}
            </div>
          </div>
        </div>

        <button className='btn btn-primary me-3' type='submit' disabled={isDisabled}>
          Thêm sinh viên
        </button>
        <button className='btn btn-success' type='button' disabled={!isDisabled} onClick={handleUpdateUser}>
          Cập nhật sinh viên
        </button>
      </form>
    </div>
  );
}
