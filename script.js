document.getElementById('fetch-joke').addEventListener('click', function() {
    fetchJoke();
});

document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

function fetchJoke() {
    const category = document.getElementById('category-select').value;
    const type = document.getElementById('type-select').value;
    const url = `https://v2.jokeapi.dev/joke/${category}?type=${type}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayJoke(data);
        })
        .catch(error => {
            console.error('Error fetching joke: ', error);
        });
}

function displayJoke(data) {
    const jokeContainer = document.getElementById('joke-container');
    if (data.type === 'single') {
        jokeContainer.innerHTML = `<p>${data.joke}</p>`;
    } else {
        jokeContainer.innerHTML = `<p>${data.setup}</p><p>${data.delivery}</p>`;
    }
    jokeContainer.style.display = 'block';
}

document.getElementById('share-twitter').addEventListener('click', function() {
    const jokeHTML = document.getElementById('joke-container').innerHTML;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(jokeHTML)}`;
    window.open(tweetUrl, '_blank');
});
document.getElementById('share-facebook').addEventListener('click', function() {
    const jokeHTML = document.getElementById('joke-container').innerHTML;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jokeHTML)}`;
    window.open(facebookUrl, '_blank');
});

document.getElementById('share-instagram').addEventListener('click', function() {
    const jokeText = document.getElementById('joke-container').innerText;
    const instagramUrl = `https://www.instagram.com/intent/post?text=${encodeURIComponent(jokeText)}`;
    window.open(instagramUrl, '_blank');
});

