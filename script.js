// 사용자 프로필 정보를 가져오는 함수
function fetchGitHubProfile(username) {
  fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      displayProfile(data);
    })
    .catch(error => console.error('Error:', error));
}

// 사용자 레포지토리 정보를 가져오는 함수
function fetchGitHubRepositories(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(data => {
      displayRepositories(data);
      console.log(data)
    })
    .catch(error => console.error('Error:', error));
}

// 검색 이벤트 리스너
document.getElementById('searchUser').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const userText = document.getElementById('searchUser').value;

    if (userText !== '') {
      fetchGitHubProfile(userText);
      fetchGitHubRepositories(userText);
    } else {
      alert('Please enter full Username!')
    }
  }
});

document.querySelector('header').addEventListener('click', () => {
  clearResults();
});

function displayProfile(profileData) {
  const profileSection = document.getElementById('profile');
  profileSection.style.display = 'inherit';

  profileSection.innerHTML = '';

  const avatar = document.createElement('img');
  avatar.src = profileData.avatar_url;
  avatar.alt = 'User Avatar';
  avatar.className = 'avatar';

  const name = document.createElement('p');
  name.className = 'profile-name';
  name.textContent = profileData.name;

  const nickname = document.createElement('p');
  nickname.className = 'profile-nickname';
  nickname.textContent = profileData.login;

  const bio = document.createElement('p');
  bio.textContent = profileData.bio || 'No bio content';

  // ... Include other profile information as needed
  const viewProfileButton = document.createElement('a');
  viewProfileButton.href = profileData.html_url;
  viewProfileButton.textContent = 'View Profile';
  viewProfileButton.className = 'view-profile-btn';

  profileSection.appendChild(avatar);
  profileSection.appendChild(name);
  profileSection.appendChild(nickname);
  profileSection.appendChild(bio);
  profileSection.appendChild(viewProfileButton);
}

function displayRepositories(reposData) {
  const reposSection = document.getElementById('repositories');
  reposSection.style.display = 'flex';

  reposSection.innerHTML = '';

  const repoList = document.createElement('ul');
  repoList.className = 'repo-list';

  reposData.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.className = 'repo-item';

    const repoName = document.createElement('h3');
    repoName.textContent = repo.name;

    const repoStars = document.createElement('span');
    repoStars.textContent = `Stars: ${repo.stargazers_count}`;

    const repoWatchers = document.createElement('span');
    repoWatchers.textContent = `Watchers: ${repo.watchers_count}`;

    const repoForks = document.createElement('span');
    repoForks.textContent = `Forks: ${repo.forks_count}`;

    repoItem.appendChild(repoName);
    repoItem.appendChild(repoStars);
    repoItem.appendChild(repoWatchers);
    repoItem.appendChild(repoForks);

    repoList.appendChild(repoItem);
  });

  reposSection.appendChild(repoList);
}


function clearResults() {
  document.getElementById('searchUser').value = '';
  document.getElementById('profile').style.display = 'none';
  document.getElementById('profile').innerHTML = '';
  document.getElementById('repositories').style.display = 'none';
  document.getElementById('repositories').innerHTML = '';
}