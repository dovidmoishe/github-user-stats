const form = document.getElementById("search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchInputValue = document.getElementById("search").value;
  var select = document.getElementById("select-theme");
  var selectedTheme = select.options[select.selectedIndex].value;

  const searchName = searchInputValue.split(" ").join("");

  fetch(`https://api.github.com/users/${searchName}`)
    .then((response) => response.json())
    .then((data) => {
      const userInfo = document.getElementById("profilestats");

      userInfo.innerHTML = `
                <div class="user-info">
                    <div class="image">
                        <img src="${data.avatar_url}" class="user-avatar"/>
                    </div>
                    <div class="user-description">
                        <h1>${data.name != null ? data.name : data.login}</h1>
                        <p>${data.bio != null ? data.bio : "User doesn't have a bio"}</p>
                    </div>
                </div>
                
                <div class="user-stats">
                    <h1>${data.name != null ? data.name : data.login}'s stats</h1>
                    <img src="https://github-readme-stats.vercel.app/api?username=${data.login}&theme=${selectedTheme}&show_icons=true"/>
                    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${data.login}&layout=compact"/>    
                </div>
            `;


    })
    .catch((error) => {
      console.error(error);
    });
});
