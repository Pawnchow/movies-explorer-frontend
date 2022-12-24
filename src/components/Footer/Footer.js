import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__wrap'>
        <p className='footer__copyright'>&#169; 2022</p>
        <ul className='footer__links'>
          <li className='footer__link-wrap'>
            <a className='footer__link' target='_blank' rel='noreferrer' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
          </li>
          <li className='footer__link-wrap'>
            <a className='footer__link' target='_blank' rel='noreferrer' href='https://github.com'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
