document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector(".theme-toggle-area")
    const modeText = document.querySelector(".mode-text")
    const main = document.querySelector("main")
    const nav = document.querySelector("nav")
    const flagsSection = document.querySelector(".flags-section")
    const backBtn = document.querySelector(".back-btn")
    const flagDetailSection = document.querySelector(".flag-detail-section")
    const searchSection = document.querySelector(".input-section")
    let toggleCount = 0
    const search = document.querySelector("#search")


    toggle.addEventListener("click", () => {
        toggleCount++
        toggleTheme(toggleCount)
    })


    backBtn.addEventListener("click", () => {
        flagsSection.style.display = "flex"
        searchSection.style.display = "block"
        flagDetailSection.style.display = "none" 
    })


    fetch('data.json')
        .then(response => {
            if(!response.ok) {
                throw new Error("Response was not ok")
            }
            return response.json()
        })
        .then(countries => {
            countries.forEach(country => {
                createFlag(country)
            })
            displayCountryDetails(countries)
            searchCountries(countries)
        })
        .catch(error => {console.error("Error: ", error)})


    function searchCountries(countries) {
        const flagSections = document.querySelectorAll(".flag-section")
        search.addEventListener("input", () => {
            const searchTerm = search.value.trim().toLowerCase()
            countries.forEach(country => {
                // flagSections.forEach(flagSection => {
                //     if(country.name.includes(search.value)) {
                //         flagSection.style.display = "none"
                //     }
                // })
                flagSections.forEach(flagSection => {
                    const countryName = flagSection.querySelector(".name").textContent.toLowerCase()
                    if(countryName.includes(searchTerm)) {
                        flagSection.style.display = "block"
                    }
                    else {
                        flagSection.style.display = "none"
                    }
                })
            })
        })
    }


    function toggleTheme(toggleCount) {
        const flagSection = document.querySelectorAll(".flag-section")

        // Light Mode
        if(toggleCount % 2 == 0) {
            modeText.textContent = "Dark Mode"
            main.style.backgroundColor = "var(--very-light-gray-light-mode-background)"
            main.style.color = "var(--very-dark-blue-light-mode-text)"
            nav.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
            flagSection.forEach(flag => {
                flag.style.backgroundColor = "white"
            })
            backBtn.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
            backBtn.style.color = "var(--very-dark-blue-light-mode-text)"
            flagDetailSection.style.backgroundColor = "var(--very-light-gray-light-mode-background)"
            searchSection.style.color = "var(--dark-gray-light-mode-input)"
            search.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
            search.style.color = "var(--very-dark-blue-light-mode-text)"
            search.classList.remove("placeholder-dark")
            search.classList.add("placeholder-light")
        }

        // Dark Mode
        else {
            modeText.textContent = "Light Mode"
            main.style.backgroundColor = "var(--very-dark-blue-dark-mode-background)"
            main.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            nav.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            flagSection.forEach(flag => {
                flag.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            })
            backBtn.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            backBtn.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            flagDetailSection.style.backgroundColor = "var(--very-dark-blue-dark-mode-background)"
            searchSection.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            search.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            search.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            search.classList.add("placeholder-dark")
            search.classList.remove("placeholder-light")
        }
    }


    function createFlag(dataItem) {
        const flagSection = document.createElement("div")
        flagSection.classList.add("flag-section")

        const flagImage = document.createElement("img")
        flagImage.src = dataItem.flags.png
        flagImage.classList.add("flag-img")
        flagSection.appendChild(flagImage)

        const flagText = document.createElement("div")
        flagText.classList.add("flag-text")

        const name = document.createElement("p")
        name.classList.add("name")
        name.textContent = dataItem.name
        flagText.appendChild(name)

        const populationLine = document.createElement("p")
        populationLine.classList.add("population-line")
        populationLine.innerHTML = `Population: <span class="population">${dataItem.population}</span>`
        flagText.appendChild(populationLine)

        const regionLine = document.createElement("p")
        regionLine.classList.add("region-line")
        regionLine.innerHTML = `Region: <span class="region">${dataItem.region}</span>`
        flagText.appendChild(regionLine)

        const capitalLine = document.createElement("p")
        capitalLine.classList.add("capital-line")
        capitalLine.innerHTML = `Capital: <span class="capital">${dataItem.capital}</span>`
        flagText.appendChild(capitalLine)

        flagSection.appendChild(flagText)
        flagsSection.appendChild(flagSection)
    }


    function displayCountryDetails(countries) {
        const flagSections = document.querySelectorAll(".flag-section")
        flagSections.forEach(flagSection => {
            flagSection.addEventListener("click", () => {
                // console.log(flagSection.querySelector(".name").textContent)
                flagsSection.style.display = "none"
                searchSection.style.display = "none"
                flagDetailSection.style.display = "block"

                const countryName = flagSection.querySelector(".name").textContent
                const country = countries.find(country => country.name.toLowerCase() === countryName.toLowerCase())

                // Set details
                setDetailPageImage(flagSection)
                setDetailPageName(flagSection)
                setDetailPageList1(flagSection, country)
                setDetailPageList2(flagSection, country)
            })
        })
    }


    function setDetailPageImage(flagSection) {
        const flagImg = flagSection.querySelector(".flag-img")
        flagDetailSection.querySelector(".flag-detail-img").src = flagImg.src
    }


    function setDetailPageName(flagSection) {
        const flagName = flagSection.querySelector(".name")
        flagDetailSection.querySelector(".detail-name").textContent = flagName.textContent
    }


    function setDetailPageList1(flagSection, country) {
        const native = document.querySelector(".detail-native")
        native.textContent = country.nativeName

        const population = document.querySelector(".detail-population")
        population.textContent = country.population

        const region = document.querySelector(".detail-region")
        region.textContent = country.region

        const subregion = document.querySelector(".detail-subregion")
        subregion.textContent = country.subregion

        const capital = document.querySelector(".detail-capital")
        capital.textContent = country.capital
    }


    function setDetailPageList2(flagSection, country) {
        const topLevelDomain = document.querySelector(".detail-topLevelDomain")
        let str = ""
        let count = 0
        country.topLevelDomain.forEach(domain => {
            if(count > 0) { str += ", " }
            str += domain
            count++
        })
        topLevelDomain.textContent = str

        const currencies = document.querySelector(".detail-currencies")
        str = ""
        count = 0
        country.currencies.forEach(currency => {
            if(count > 0) { str += ", " }
            str += currency.name
            count++
        })
        currencies.textContent = str

        const languages = document.querySelector(".detail-languages")
        str = ""
        count = 0
        country.languages.forEach(language => {
            if(count > 0) { str += ", " }
            str += language.name
            count++
        })
        languages.textContent = str
    }
})
