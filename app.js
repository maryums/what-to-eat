

const form = document.querySelector('#searchForm')
const form2 = document.querySelector('#searchCharacters')
const displayContainer = document.querySelector('.display-container')
const selectOptions = document.querySelector('#cuisine')
const newDiv = document.querySelector('.newDiv')


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    console.log(searchTerm)
    const selectedOption = form.elements.cuisine.value
    console.log(selectedOption)

    axios({
        method: 'get',
        url: `https://api.documenu.com/v2/restaurants/zip_code/${searchTerm}`,
        headers: { 'X-API-KEY': '159927e582343bbf91bee83ca75eafd5' },
    })
        .then(function (response) {
            const restaurants = response.data.data;

            //loop through restaurants
            restaurants.forEach(restaurant => {
                console.log(restaurant.cuisines)
                const cuisineTypes = restaurant.cuisines
                if (selectedOption === "All") {
                    console.log(restaurant)
                    const newDiv = document.createElement("div")
                    newDiv.className = "cards"
                    const menu = document.createElement("div")
                    menu.className = "menu"
                    const restName = restaurant.restaurant_name
                    const address = restaurant.address.formatted
                    const phoneNumber = restaurant.restaurant_phone
                    const hours = restaurant.hours
                    const restID = restaurant.restaurant_id


                    newDiv.innerHTML = `${restName}
                                        <p>${address}</p>
                                        <p>${phoneNumber}</p>
                                        <p>Hours: ${hours}</p>
                                        <button onclick="myFunction() " id="menu_${restID}" > Menu </button>
                    `;

                    displayContainer.append(newDiv)

                    document.querySelector(`#menu_${restID}`).addEventListener("click", function (event) {

                        event.preventDefault();

                        axios({
                            method: 'get',
                            url: `https://api.documenu.com/v2/restaurant/${restID}/menuitems`,
                            headers: { 'X-API-KEY': '159927e582343bbf91bee83ca75eafd5' },
                        })
                            .then(function (response) {
                                // handle success

                                const restaurantMenuItems = response.data.data;
                                console.log(response.data.data)

                                //loop through menu items
                                restaurantMenuItems.forEach(menuItem => {
                                    const menuItemName = menuItem.menu_item_name
                                    const menuItemPrice = menuItem.menu_item_price

                                    const menu = document.createElement("div")
                                    menu.className = "menu"

                                    menu.innerHTML = `${menuItemName} - ${menuItemPrice} `

                                    newDiv.append(menu)

                                })

                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    })

                }
                else if (cuisineTypes.includes(selectedOption)) {
                    console.log(restaurant)
                    const newDiv = document.createElement("div")
                    newDiv.className = "cards"
                    const menu = document.createElement("div")
                    menu.className = "menu"
                    const restName = restaurant.restaurant_name
                    const address = restaurant.address.formatted
                    const phoneNumber = restaurant.restaurant_phone
                    const hours = restaurant.hours
                    const restID = restaurant.restaurant_id


                    newDiv.innerHTML = `${restName}
                                        <p>${address}</p>
                                        <p>${phoneNumber}</p>
                                        <p>Hours: ${hours}</p>
                                        <button onclick="myFunction() " id="menu_${restID}" > Menu </button>
                    `;

                    displayContainer.append(newDiv)

                    document.querySelector(`#menu_${restID}`).addEventListener("click", function (event) {

                        event.preventDefault();

                        axios({
                            method: 'get',
                            url: `https://api.documenu.com/v2/restaurant/${restID}/menuitems`,
                            headers: { 'X-API-KEY': '159927e582343bbf91bee83ca75eafd5' },
                        })
                            .then(function (response) {
                                // handle success

                                const restaurantMenuItems = response.data.data;
                                console.log(response.data.data)

                                //loop through menu items
                                restaurantMenuItems.forEach(menuItem => {
                                    const menuItemName = menuItem.menu_item_name
                                    const menuItemPrice = menuItem.menu_item_price

                                    const menu = document.createElement("div")
                                    menu.className = "menu"

                                    menu.innerHTML = `${menuItemName} - ${menuItemPrice} `

                                    newDiv.append(menu)

                                })

                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            });
                    })

                }

            });

        })
        .catch(function (error) {
            console.log(error)
        })

})



