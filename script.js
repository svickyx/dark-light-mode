const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const imageInnovation = document.getElementById('image-innovation');
const imageSolution = document.getElementById('image-solution');
const imageConcept = document.getElementById('image-concept');
const textBox = document.getElementById('text-box');


// there are two childs under toggleIcon from index.html, toggle-text and fas fa-sun, so we use array to get them and change their state
function switchToDarkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    switchImageColor('dark');
}

// 1) replace -- add/remove classList
// toggleIcon.children[1].classList.remove('fa-sun');
// toggleIcon.children[1].classList.add('fa-moon');
// ----> a easy way:
// toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');

// 2) use function to avoid repetation
// imageInnovation.src = 'img/innovative_dark.svg';
// imageSolution.src = 'img/problem-solving-1-dark.svg';
// imageConcept.src = 'img/concept-dark.svg'
// ----> function switchImageColor, pass color as a parameter

function switchImageColor(color) {
    imageInnovation.src = `img/innovative_${color}.svg`;
    imageSolution.src = `img/problem-solving-${color}.svg`;
    imageConcept.src = `img/concept-${color}.svg`
}


function switchToLightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    switchImageColor('light')
}

// function switchMode(event) {
//     console.log(event.target.checked);
// }
// when we create this function, and change the state of the toogle switch, and console.log the event, event.target.checked will switch between 'true' and 'false'
// so we use that ture/false to switch between light and dark mode
// document.documentElement is to change every element and give them a new attribute('color-theme' in style.css) by setAttribute

function switchMode(event) {
    if(event.target.checked) {
        document.documentElement.setAttribute('color-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        switchToDarkMode();
    } else {
        document.documentElement.setAttribute('color-theme', 'light');
        localStorage.setItem('theme', 'light');
        switchToLightMode();
    }
}

// window.localStorage
// 1. window.localStorage (key = 'theme', value = 'dark'); once we setItem of the localStorage, in inspect-application-localStorage-website-url, we will find key and value.
// when we switch to dark mode, the key = 'theme', value = 'dark', up to this point, we successfully store the status
// 2. use getItem to retrieve(找回) the value


toggleSwitch.addEventListener('change', switchMode);

// Check Local storage for theme
const currentTheme = localStorage.getItem('theme');
// and whenever you use localStorage, it's important to check if the localStorage has any key and value before retrieving it, so use if statement to check
// so if there is a currentTheme, we will set rootElement to currentTheme, and if the currentTheme is dark theme, the toggleSwitch status needs to be true, and also trigger the switchToDarkMode function to change all the images and other elements to dark mode color
if(currentTheme) {
    document.documentElement.setAttribute('color-theme', currentTheme);

    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        switchToDarkMode();
    }
}