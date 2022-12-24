import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://github.com'>Статичный сайт
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://github.com'>Адаптивный сайт
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://github.com'>Одностраничное приложение
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
