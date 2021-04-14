//Variables
const courses = document.querySelector('#courses-list'),
      shoppingCartContent = document.querySelector('#cart-content tbody'),
      clearCartBtn = document.querySelector('#clear-cart');






//Listeners
loadEventListeners();

function loadEventListeners() {
    //When a new course is added
    courses.addEventListener('click', buyCourse);

    //When the remove button is click
    shoppingCartContent.addEventListener('click', removeCourse);

    //Clear cart Btn
    clearCartBtn.addEventListener('click', clearCart);

    //Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


//Functions

document.getElementById("submit-search-course").addEventListener("click", function(event){
   event.preventDefault()
  });


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
    //Create an object with course data
    const courseInfo = {
        image:course.querySelector('img').src,
        title:course.querySelector('h4').textContent,
        price:course.querySelector('.price span').textContent,
        id:course.querySelector('a').getAttribute('data-id')
    }
    //Insert into the shopping cart
    addIntoCart(courseInfo);
}
//Display the Selected course into the shopping cart

function addIntoCart(course){
    //Create a <tr>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    //Add into the shopping cart
    shoppingCartContent.appendChild(row);

    //Add course into storage
    saveIntoStorage(course);

}

//Add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //Add the course into the array
    courses.push(course);

    //Convert JSON to String
    localStorage.setItem('courses', JSON.stringify(courses));
}

//Get the contents from storage
function getCoursesFromStorage() {

    let courses;

    //if something exist on the storage then we get the value, otherwiaw create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}


//Remove course from the DOM
function removeCourse(e) {
    let course, courseId;
    //Remove from the DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    console.log(courseId);
    //Remove from the Local Storage
    removeCourseLocalStorage(courseId);
}
//Remove from LocalStorage
function removeCourseLocalStorage(id) {
    //Get the local storage data
    let coursesLS = getCoursesFromStorage();

    //Loop throught the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    
    //Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

//Clears the shopping cart
function clearCart() {
    //shoppingCartContent.innerHTML = '';

    while(shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //Clear from local storage
    clearLocalStorage();
}
//clear the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

//Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    //Loop through the courses and print into the cart
    coursesLS.forEach(function(course) {
        //Create the <tr>
        const row = document.createElement('tr');

        //Print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}