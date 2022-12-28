import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id={`about-project`}>
      <h2 className='section-title'>О проекте</h2>
      <div className='about-project__desc'>
        <div className='about-project__desc-block'>
          <h4 className='about-project__desc-title'>Дипломный проект включал 5 этапов</h4>
          <p className='about-project__desc-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__desc-block'>
          <h4 className='about-project__desc-title'>На выполнение диплома ушло 5 недель</h4>
          <p className='about-project__desc-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
    <div className='about-project__timeline'>
      <div className='about-project__timeline-block'>
        <p className='about-project__timeline-time about-project__timeline-time_backend'>1 неделя</p>
        <p className='about-project__timeline-desc'>Back-end</p>
      </div>
      <div className='about-project__timeline-block'>
        <p className='about-project__timeline-time about-project__timeline-time_frontend'>4 недели</p>
        <p className='about-project__timeline-desc'>Front-end</p>
      </div>
    </div>
    </section>
  )
}

export default AboutProject;
