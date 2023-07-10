
//accessing the user input
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    fetch(`https://api.github.com/search/users?q=${form.search.value}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            displayResults(data)
        })

})

function displayResults(jsonData) {
    if (jsonData.total_count === 0) {
        //no user
        alert('User does not Exist')
    } else {
        //display user details
        const userContainer = document.createElement('div')
        userContainer.id = 'container'

        const image = document.createElement('img')
        image.src = jsonData.items[0].avatar_url
        image.alt = ''

        const user = document.createElement('p')
        user.innerText = jsonData.items[0].login
        user.id = 'username'
        user.className = 'detail'

        const gitHubLink = document.createElement('a')
        gitHubLink.href = jsonData.items[0].html_url
        gitHubLink.innerText = 'Go to Github Profile'
        gitHubLink.className = 'detail button'
        gitHubLink.id = 'link'

        const gitHubReposLink = document.createElement('a')
        gitHubReposLink.href = '#repos-list'
        gitHubReposLink.className = 'detail button'
        gitHubReposLink.innerText = 'View Repositories'
        gitHubReposLink.id = 'link'
        gitHubReposLink.addEventListener('click', () => {
            populateRepoList(jsonData.items[0].repos_url)
            
        })

        const bio = document.createElement('div')
        bio.id = 'bio'
        bio.className = 'detail'

        const bioDetails = document.createElement('p')
        bioDetails.id = 'bio-details'

        const bioSummary = document.createElement('p')
        bioSummary.id = 'bio-summary'

        bio.appendChild(bioDetails)
        bio.appendChild(bioSummary)

        const followDetails = document.createElement('div')
        followDetails.id = 'follow-detail'
        followDetails.className = 'detail'

        const followers = document.createElement('p')
        //followers.innerText = jsonData.items[0].followers_url
        followers.id = 'followers'

        const following = document.createElement('p')
        //following.innerText = jsonData.items[0].following_url
        following.id = 'following'

        followDetails.appendChild(followers)
        followDetails.appendChild(following)

        userContainer.appendChild(image)
        userContainer.appendChild(user)
        userContainer.appendChild(gitHubLink)
        userContainer.appendChild(gitHubReposLink)
        userContainer.appendChild(bio)
        userContainer.appendChild(followDetails)

        const listItem = document.createElement('li')
        listItem.appendChild(userContainer)

        document.getElementById('user-list').innerHTML = ''
        document.getElementById('user-list').appendChild(listItem)
    }

    function populateRepoList(url) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data.forEach(repoitem => {

                    const repolistitem = document.createElement('li')
                    repolistitem.className = 'repo-list-item'

                    const repoTitle = document.createElement('p')
                    repoTitle.className = 'repotitle'
                    repoTitle.innerText = repoitem.name

                    const repoDescription = document.createElement('p')
                    repoDescription.id = 'repodescription'
                    repoDescription.innerText = (repoitem.description === null) ? 'No description available' : repoitem.description

                    const linkTorepos = document.createElement('a')
                    linkTorepos.innerText = 'Go to repository'
                    linkTorepos.href = repoitem.html_url
                    linkTorepos.id = 'linktorepositories'

                    repolistitem.appendChild(repoTitle)
                    repolistitem.appendChild(repoDescription)
                    repolistitem.appendChild(linkTorepos)

                    document.getElementById('repos-list').append(repolistitem)
                });


            })
    }

}
