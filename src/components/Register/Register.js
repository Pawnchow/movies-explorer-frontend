import AuthForm from "../AuthForm/AuthForm";

function Register({ onRegister, error }) {
  const text = {title: 'Добро пожаловать!', buttonText:'Зарегистрироваться', questText:'Уже зарегистрированы?'}
  return (
    <AuthForm type={'signup'} text={text} onSubmitForm={onRegister} error={error}/>
  )
}

export default Register;