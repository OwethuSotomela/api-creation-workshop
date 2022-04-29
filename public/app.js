let seasonFilter = 'All';
let genderFilter = 'All';

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');

// My app starts 
const missyTeeApp = document.querySelector('.missyTeeApp');
// my app ends 

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);

seasonOptions.addEventListener('click', function (evt) {
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function (evt) {
	genderFilter = evt.target.value;
	filterData();
});

function filterData() {
	axios
		.get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
		.then(function (result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments: result.data.garments
			})
		});
}

priceRangeElem.addEventListener('change', function (evt) {
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function (result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments: result.data.garments
			})
		});
});

filterData();

// start here 

function myLogin() {

	const username = document.querySelector('.username').value;

	axios
		.post('/api/login', { username })
		.then((result) => {
			console.log(result.data);
		})

	if (username && username === 'OwethuSotomela') {
		showApp()
	} else {
		console.log("We don't do that here..!!");
	}
}

function showApp() {
	var missyTeeApp = document.querySelector(".missyTeeApp");
	if (missyTeeApp.style.display === "none") {
		missyTeeApp.style.display = "block";
	} else {
		missyTeeApp.style.display = "none";
	}
}

loginBtn.addEventListener('click', myLogin)

// end here 

