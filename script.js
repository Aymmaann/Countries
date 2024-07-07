document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector(".theme-toggle-area")
    const toggleIcon = document.querySelector("#toggle-icon")
    const modeText = document.querySelector(".mode-text")
    const main = document.querySelector("main")
    const nav = document.querySelector("nav")
    const flagsSection = document.querySelector(".flags-section")
    const backBtn = document.querySelector(".back-btn")
    const flagDetailSection = document.querySelector(".flag-detail-section")
    const searchSection = document.querySelector(".input-section")
    const filterSection = document.querySelector(".filter-section")
    const filterOptions = document.querySelector(".filter-options")
    const listItems = document.querySelectorAll(".list-item")
    const search = document.querySelector("#search")
    const borderCountriesSection = document.querySelector(".border-countries-section")
    let toggleCount = 0
    let filterCount = 0


    fetch('data.json')
        .then(response => {
            if(!response.ok) {
                throw new Error("Response was not ok")
            }
            return response.json()
        })
        .then(countries => {
            window.countryData = countries;
            countries.forEach(country => {
                createFlag(country)
            })
            displayCountryDetails(countries)
            searchCountries(countries)
            filterSearch(countries)
        })
        .catch(error => {console.error("Error: ", error)})


    toggle.addEventListener("click", () => {
        toggleCount++
        toggleTheme(toggleCount)
    })


    backBtn.addEventListener("click", () => {
        flagsSection.style.display = "flex"
        searchSection.style.display = "block"
        filterSection.style.display = "flex"
        flagDetailSection.style.display = "none" 
    })


    filterSection.addEventListener("click", () => {
        filterCount++
        if(filterCount % 2 != 0) {
            filterSection.innerHTML =  `<p>Filter by Region</p>
                                        <i class="fa-solid fa-angle-up"></i>`
            filterOptions.style.display = "block"
        }
        else {
            filterSection.innerHTML =  `<p>Filter by Region</p>
                                        <i class="fa-solid fa-angle-down"></i>`
            filterOptions.style.display = "none"
        }
    })
    

    function filterSearch(countries) {
        const flagSections = document.querySelectorAll(".flag-section")
        listItems.forEach(listItem => {
            listItem.addEventListener("click", () => {
                const searchRegion = listItem.textContent.trim().toLowerCase()
                flagSections.forEach(flagSection => {
                    const countryName = flagSection.querySelector(".name").textContent.toLowerCase()
                    const country = countries.find(country => country.name.toLowerCase() === countryName)

                    if(searchRegion != "all") {
                        if(country.region.toLowerCase() === searchRegion) {
                            flagSection.style.display = "block"
                        }
                        else {
                            flagSection.style.display = "none"
                        }
                    }
                    else {
                        flagSection.style.display = "block"
                    }
                })
            })
        })
    }


    function searchCountries(countries) {
        const flagSections = document.querySelectorAll(".flag-section")
        search.addEventListener("input", () => {
            const searchTerm = search.value.trim().toLowerCase()
            countries.forEach(country => {
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
            toggle.innerHTML = `<i class="fa-solid fa-moon" id="toggle-icon"></i>
                                <p class="mode-text">Dark Mode</p>`
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
            filterSection.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
            filterOptions.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
            filterOptions.style.color = "var(--very-dark-blue-light-mode-text)"
            const borderCountryDivs = document.querySelectorAll(".border-country")
            borderCountryDivs.forEach(borderCountry => {
                borderCountry.style.backgroundColor = "var(--white-dark-mode-text-light-mode-elements)"
                borderCountry.style.color = "var(--very-dark-blue-light-mode-text)"
            })
        }

        // Dark Mode
        else {
            toggle.innerHTML = `<i class="fa-solid fa-sun" id="toggle-icon"></i>
                                <p class="mode-text">Light Mode</p>`
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
            filterSection.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            filterOptions.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
            filterOptions.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            const borderCountryDivs = document.querySelectorAll(".border-country")
            borderCountryDivs.forEach(borderCountry => {
                borderCountry.style.backgroundColor = "var(--dark-blue-dark-mode-elements)"
                borderCountry.style.color = "var(--white-dark-mode-text-light-mode-elements)"
            })
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
                if(filterCount % 2 != 0) {
                    filterCount = filterCount > 0? filterCount-- : 0
                    filterOptions.style.display = "none"
                    filterSection.innerHTML =  `<p>Filter by Region</p>
                                        <i class="fa-solid fa-angle-down"></i>`
                }
                flagsSection.style.display = "none"
                searchSection.style.display = "none"
                filterSection.style.display = "none"
                flagDetailSection.style.display = "block"

                const countryName = flagSection.querySelector(".name").textContent
                const country = countries.find(country => country.name.toLowerCase() === countryName.toLowerCase())
                let borderCodes = []
                setBorderCountries(countries, countryName)

                // Set details
                setDetailPageImage(flagSection)
                setDetailPageName(flagSection)
                setDetailPageList1(country)
                setDetailPageList2(country)
            })
        })
    }


    function setBorderCountries(countries, countryName) {
        const borderCountries = countries.find(country => {
            if(countryName.toLowerCase() === country.name.toLowerCase()) {
                borderCodes = country.borders
                borderCountriesSection.innerHTML = `<p class="border-text">Border Countries: </p>`

                if(country.borders && borderCodes.length > 0) {
                    borderCodes.forEach(borderCode => {
                        const borderCountry = countries.find(country => country.alpha3Code === borderCode)
                        createBorderCountryTag(borderCountry.name)
                    })
                }
                else {
                    borderCountriesSection.innerHTML = `<p class="border-text">Border Countries: </p>
                                                <p class="border-country-name">No Bordering Countries</p>`
                }
            }
        })

        const borderCountryDivs = document.querySelectorAll(".border-country")
        borderCountryDivs.forEach(borderCountry => {
            borderCountry.addEventListener("click", () => {
                const borderCountryName = borderCountry.querySelector(".border-country-name").textContent
                const borderCountryNameJSON = countries.find(country => country.name.toLowerCase() === borderCountryName.toLowerCase())

                updateDetailImage(borderCountryName, borderCountryNameJSON)
                updateDetailPageName(borderCountryName)
                setDetailPageList1(borderCountryNameJSON)
                setDetailPageList2(borderCountryNameJSON)
                setBorderCountries(countries, borderCountryName)
            })
        })
    }


    function updateDetailImage(borderCountryName, country) {
        if (country) {
            const flagDetailImg = flagDetailSection.querySelector(".flag-detail-img");
            if (country.flags && country.flags.png) {
                flagDetailImg.src = country.flags.png;
            } else {
                flagDetailImg.src = ""; 
            }
        } else {
            console.error(`Country '${borderCountryName}' not found.`);
        }
    }

    function updateDetailPageName(borderCountryName) {
        const flagName = document.querySelector(".detail-name")
        flagName.textContent = borderCountryName
    }


    function createBorderCountryTag(countryName) {
        const borderCountry = document.createElement("div")
        borderCountry.classList.add("border-country")

        const para = document.createElement("p")
        para.classList.add("border-country-name")
        para.textContent = countryName
        borderCountry.appendChild(para)

        if(toggleCount % 2 === 0) {

        }

        borderCountriesSection.appendChild(borderCountry)
    }


    function setDetailPageImage(flagSection) {
        const flagImg = flagSection.querySelector(".flag-img")
        flagDetailSection.querySelector(".flag-detail-img").src = flagImg.src
    }


    function setDetailPageName(flagSection) {
        const flagName = flagSection.querySelector(".name")
        flagDetailSection.querySelector(".detail-name").textContent = flagName.textContent
    }


    function setDetailPageList1(country) {
        const native = document.querySelector(".detail-native")
        if(country.nativeName && country.nativeName.length > 0) {
            native.textContent = country.nativeName
        }
        else {
            native.textContent = "N/A"
        }

        const population = document.querySelector(".detail-population")
        population.textContent = country.population

        const region = document.querySelector(".detail-region")
        region.textContent = country.region

        const subregion = document.querySelector(".detail-subregion")
        subregion.textContent = country.subregion

        const capital = document.querySelector(".detail-capital")
        if(country.capital && country.capital.length > 0) {
            capital.textContent = country.capital
        }
        else {
            capital.textContent = "No capital city"
        }
    }


    function setDetailPageList2(country) {
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
        if(country.currencies && country.currencies.length > 0) {
            country.currencies.forEach(currency => {
                if(count > 0) { str += ", " }
                str += currency.name
                count++
            })
        }
        else {
            str = "No Currency"
        }
        currencies.textContent = str

        const languages = document.querySelector(".detail-languages")
        str = ""
        count = 0
        if(country.languages && country.languages.length > 0) {
            country.languages.forEach(language => {
                if(count > 0) { str += ", " }
                str += language.name
                count++
            })
        }
        else {
            str = "No official language"
        }
        languages.textContent = str
    }
})
