//Variables
const courses = document.querySelector('#courses-list');






//Listeners
loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    courses.addEventListener('click', buyCourse);
}







//Functions

function buyCourse(e) {
  e.preventDefault();

    //Use Delegation to find the course that was added 
    if(e.target.classList.contains('add-to-cart')) {
        //Read the Course value
        const course = e.target.parentElement.parentElement;

        //Read the values
        getCourseInfo(course);
    }
}
//Reads the HTML information of the selected course

function getCourseInfo(course) {
    console.log(course);
}