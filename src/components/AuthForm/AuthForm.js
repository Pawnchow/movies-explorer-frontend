import './AuthForm.css';
import logoMain from '../../images/logo.svg'
import { Link } from "react-router-dom";
import useForm from '../../hooks/useForm';

function AuthForm({ type, text, onSubmitForm, error }) {

  const { values, errors, isFormValid, handleChange, resetForm } = useForm();

  function signupFormMarkup() {
    if (type === 'signup') {
      return (
        <div className='auth__form-item'>
          <label className='auth__label'>Имя</label>
          <input
            className={`auth__input ${errors.name ? 'error' : ''}`}
            name='name'
            id='name'
            placeholder='Имя'
            type='text'
            value={values.name || ''}
            onChange={handleChange}
            required
            pattern='^[A-Za-zА-Яа-яЁё \s -]+$'
          />
          <span className='auth__error'>{errors.name}</span>
        </div>
      )
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitForm(values);
    resetForm();
  }

  return (
    <form className='auth' onSubmit={handleSubmit}>
      <Link to='/'>
        <img className='auth__logo' src={logoMain} alt='Логотип' />
      </Link>
      <h1 className='auth__title'>{text.title}</h1>
      {signupFormMarkup()}
      <div className='auth__form-item'>
        <label className='auth__label'>E-mail</label>
        <input
          className={`auth__input ${errors.email ? 'error' : ''}`}
          name='email'
          placeholder='E-mail'
          type='email'
          id='email'
          value={values.email || ''}
          onChange={handleChange}
          required
        />
        <span className='auth__error'>{errors.email}</span>
      </div>
      <div className='auth__form-item'>
        <label className='auth__label'>Имя</label>
        <input
          className={`auth__input ${errors.password ? 'error' : ''}`}
          name='password'
          id='password'
          placeholder='Пароль'
          type='password'
          value={values.password || ''}
          onChange={handleChange}
          required
        />
        <span className='auth__error'>{errors.password}</span>
      </div>
      <div className='auth__response-error'>{error}</div>
      <div className='auth__buttons'>
        <button className='auth__btn' type='submit' disabled={!isFormValid}>{text.buttonText}</button>
        <p className='auth__question'>{text.questText}
          {
            type === 'signup'
              ? (<Link className='auth__link' to='/signin'>Войти</Link>)
              : (<Link className='auth__link' to='/signup'>Регистрация</Link>)
          }
        </p>
      </div>
    </form>
  )
}

export default AuthForm;
