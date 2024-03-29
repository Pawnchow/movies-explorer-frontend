import AuthForm from "../AuthForm/AuthForm";

function Login({ onLogin, error }) {
  const text = {title: 'Рады видеть!', buttonText:'Войти', questText:'Ещё не зарегистрированы?'}
  return (
    <AuthForm type={'signin'} text={text} onSubmitForm={onLogin} error={error}/>
  )
}

export default Login;