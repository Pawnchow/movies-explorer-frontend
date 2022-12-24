import './AboutMe.css';
import myPhoto from '../../images/myPhoto_lol.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='section-title'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__bio'>
          <h4 className='about-me__name'>Сергей</h4>
          <p className='about-me__desc'>Фронтенд-разработчик, 32 года</p>
          <p className='about-me__text'>Я родился и живу в Челябинске, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className='about-me__links' target='_blank' rel='noreferrer' href='https://github.com/'>Github</a>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='фото'/>
      </div>
    </section>
  )
}

export default AboutMe;
