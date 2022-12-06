const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const githubImage = document.querySelector(".github__image");
const userName = document.querySelector(".user__name");
const userName2 = document.querySelector(".user__name2");
const userBio = document.querySelector(".user__bio");
const userLocation = document.querySelector(".user__location");
const userWebsite = document.querySelector(".user__website");
const firstStatNumber = document.querySelector(".firstStatNumber");
const firstStatTitle = document.querySelector(".firstStatTitle");
const secondStatNumber = document.querySelector(".secondStatNumber");
const secondStatTitle = document.querySelector(".secondStatTitle");
const thirdStatNumber = document.querySelector(".thirdStatNumber");
const thirdStatTitle = document.querySelector(".thirdStatTitle");

const fetchUserData = async (userName) => {
	try {
		const response = await fetch(`https://api.github.com/users/${userName}`);
		const data = await response.json();
		renderProfile(data);
	} catch (error) {
		userNotFound();
	}
};

const renderProfile = (userData) => {
	githubImage.src = userData.avatar_url;
	userName.textContent = userData.name;
	userName2.textContent = `@${userData.login}`;
	userName2.setAttribute("href", userData.html_url);
	userBio.textContent = userData.bio;
	userLocation.innerHTML = `
        <i class="fa-solid fa-location-dot"></i>
        <p>${userData.location}</p>
    `;
	userWebsite.innerHTML = `
        <i class="fa-solid fa-link"></i>
		<a href="${userData.blog}" class="website__link" target="_blank">${userData.blog}</a>
    `;
	firstStatTitle.textContent = "Followers";
	firstStatNumber.textContent = userData.followers;
	secondStatTitle.textContent = "Following";
	secondStatNumber.textContent = userData.following;
	thirdStatTitle.textContent = "Repositories";
	thirdStatNumber.textContent = userData.public_repos;
};

const userNotFound = () => {};

searchButton.addEventListener("click", () => {
	fetchUserData(searchInput.value);
});
