async function getCourses(){
    try{
        const data = await axios.get(`http://195.161.41.245:3001/courses/all`)
        const div = document.querySelector('#courses_from_db')
        for (const course of data.data.message) {
            div.innerHTML += `<div class="course__item exam">
      <div class="course__box">
        <img src="${course.img}" alt="" class="course__img">
        <div class="course__tag">${course.coursetypename}</div>
      </div>
      <div class="course__content">
        <div class="course__meta">
          <div class="course__lesson">
            <i class="uil uil-book-alt"></i>${course.meta.lessonsCount}
          </div>

          <div class="course__rating">
            <i class="uis uis-star">★</i> ${course.meta.rating} ${course.meta.ratingCount}
          </div>
        </div>
        <h3 class="course__title">${course.coursename}</h3>
        <div class="course__teacher">
          <img src="${course.teacherImg}" alt="" class="course__teacher-img">
          <h3 class="course__teacher-title">${course.teachername} ${course.teachersecondname}</h3>
        </div>
      </div>

      <div class="course__more">
        <div class="course__prices">
          <span class="course__discount">${course.meta.newPrice} ₽</span>
          <span class="course__price">${course.meta.oldPrice} ₽</span>
        </div>

        <span class="course__button" onclick="openCourse(${course.courseid})">Узнать подробнее</span>
      </div>
    </div>`
        }
    }
    catch ( e ) {
        if(e.response.status === 403){
            localStorage.removeItem('token')
            window.close()
            window.open('./auth.html')
        }
        console.log(e.response.status)
    }

}
getCourses()

function openCourse (id) {
    localStorage.setItem('lastCourse',id)
    window.open('./courses__details.html')
}