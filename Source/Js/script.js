let $ = document

/////////////////////

// variables ///////////////////
const body = $.body
const searchInput = $.querySelector(".search-input")
const searchIcon = $.querySelector(".search-icon")
const suggestionsContainer = $.querySelector(".suggestions-container")

let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "YouTube Channel",
    "Blogger",
    "Bollywood",
    "Vlogger",
    "Vechiles",
    "Facebook",
    "Freelancer",
    "Facebook Page",
    "Designer",
    "Developer",
    "Web Designer",
    "Web Developer",
    "Login Form in HTML & CSS",
    "How to learn HTML & CSS",
    "How to learn JavaScript",
    "How to become Freelancer",
    "How to become Web Designer",
    "How to start Gaming Channel",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

let suggestedItems = []

// fucntions ////////////////////
function liveUserScreenHeight(){
    let userScreenHeight = visualViewport.height + "px"
    body.style.minHeight = userScreenHeight
}

function keyValidation(event){
    if(event.key === "Enter"){
        event.preventDefault()

        searchInputFocus()
    }
}

function searchInputFocus(){
    searchInput.focus()
}

function runAutoComplete(){
    let searchValue = searchInput.value.trim()

    suggestionsContainer.innerHTML = ""
    suggestedItems = []

    if(searchValue){
        searchInput.classList.add("active")
        suggestionsContainer.classList.add("show")

        let filteredSuggestions = suggestions.filter(function(word){
            return word.toLowerCase().includes(searchValue.toLowerCase())
        })

        if(filteredSuggestions){
            suggestionsGenerator(filteredSuggestions)
        }else{
            suggestionsGenerator([searchValue])
        }
    }else{
        searchInput.classList.remove("active")
        suggestionsContainer.classList.remove("show")
    }
}

function suggestionsGenerator(suggestions){
    let suggestionsFragment = $.createDocumentFragment()

    suggestions.forEach(function(item){
        let suggestedItem = $.createElement("li")
        suggestedItem.innerHTML = item
        suggestedItem.className = "seggested-item"
        suggestedItem.setAttribute("onclick" , "selectSuggestedItem("+ JSON.stringify(item) +")")

        suggestionsFragment.append(suggestedItem)
    })

    suggestionsContainer.append(suggestionsFragment)
}

function selectSuggestedItem(item){
    searchInput.value = item

    searchInput.classList.remove("active")
    suggestionsContainer.classList.remove("show")
}

// event listeners ////////////////////
window.addEventListener("load" , liveUserScreenHeight)
window.addEventListener("resize" , liveUserScreenHeight)
window.addEventListener("keydown" , keyValidation)
searchIcon.addEventListener("click" , searchInputFocus)
searchInput.addEventListener("input" , runAutoComplete)