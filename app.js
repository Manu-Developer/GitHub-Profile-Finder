// HTML elements
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const mainSection = document.querySelector(".main__section");
const user = document.querySelector(".user");
const searchError = document.querySelector(".error");
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
const userRepositories = document.querySelector(".user__repositories");
const userFollowers = document.querySelector(".user__followers");

const fetchUserData = async (userName) => {
	try {
		const response = await fetch(`https://api.github.com/users/${userName}`);
		const data = await response.json();

		if (data.login !== undefined) {
			renderProfile(data);
			renderUserRepositories(userName);
			renderUserFollowers(userName);
		} else {
			userNotFound();
		}
	} catch (error) {
		console.log(error);
	}
};

const renderProfile = (userData) => {
	user.style.display = "flex";
	searchError.style.display = "none";
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

const renderUserRepositories = async (userName) => {
	try {
		const response = await fetch(`https://api.github.com/users/${userName}/repos`);
		const repositories = await response.json();
		let HTMLContentToAppend = "";

		for (const repository of repositories) {
			HTMLContentToAppend += `
				<div class="repository">
					<a href="${repository.html_url}" class="repository__name" target="_blank">${repository.name}</a>
					<p class="repository__description">${repository.description}</p>
					<div class="repository__info">
						<p class="repository__languages">${repository.language}</p>
						<p class="repository__lastUpdate">Last Update: ${String(repository.updated_at).substring(0, 10)}</p>
					</div>
				</div>
		`;
		}

		userRepositories.innerHTML = `
			<h1 class="user__repositories__title">Repositories</h1>
			${HTMLContentToAppend}
		`;
	} catch (error) {
		console.log(error);
	}
};

const renderUserFollowers = async (userName) => {
	try {
		const response = await fetch(`https://api.github.com/users/${userName}/followers`);
		const followers = await response.json();
		let HTMLContentToAppend = "";

		for (const follower of followers) {
			HTMLContentToAppend += `
				<a href="${follower.html_url}" class="follower" target="_blank">
					<div class="follower__img">
						<img src="${follower.avatar_url}" alt="${follower.login}" />
					</div>
					<p class="follower__username">${follower.login}</p>
				</a>
		`;
		}

		userFollowers.innerHTML = `
			<h1 class="user__followers__title">Followers</h1>
			${HTMLContentToAppend}
		`;
	} catch (error) {
		console.log(error);
	}
};

const userNotFound = () => {
	user.style.display = "none";
	searchError.style.display = "block";
	userRepositories.innerHTML = "";
	userFollowers.innerHTML = "";
};

// Event Listeners
searchButton.addEventListener("click", () => {
	fetchUserData(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		fetchUserData(searchInput.value);
	}
});
