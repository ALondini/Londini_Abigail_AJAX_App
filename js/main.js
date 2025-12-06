(() => {

    //variables
    const hotspots = document.querySelectorAll(".hotspot");
    const material_template = document.querySelector("#material_template");
    const material_list = document.querySelector("#material_list");
    const material_loader = document.querySelector("#material_loader");

    const info_box_template = document.querySelector("#info_box_template"); // Add this in HTML
    const info_box_container = document.querySelector("#info_box_container");
    const info_loader = document.querySelector("#info_loader");


    //functions
    function load_info_boxes() {
        if (info_loader) info_loader.style.display = "block";

        fetch("https://swiftpixel.com/earbud/api/infoboxes")
            .then(response => response.json())
            .then(info_boxes => {
                if (info_loader) info_loader.style.display = "none";

                console.log(info_boxes);

                info_boxes.forEach((info_box, index) => {
                    let selected = document.querySelector(`#hotspot-${index + 1}`);
                    if (!selected) return;

                    const title_element = document.createElement('h2');
                    title_element.textContent = info_box.heading;

                    const text_element = document.createElement('p');
                    text_element.textContent = info_box.description;

                    selected.appendChild(title_element);
                    selected.appendChild(text_element);
                });
            })

            .catch(error => {
                console.log(error);
                if (info_box_container) {
                    const error_message = document.createElement("p");
                    error_message.textContent = "Oops, something went wrong. It may be your internet connection or it may be a problem with us. Sorry, please try again later.";
                    info_box_container.appendChild(error_message);
                }
            });
    }
    load_info_boxes();

    function load_material_info() {

        if (material_loader) material_loader.style.display = "block";

        fetch("https://swiftpixel.com/earbud/api/materials")
            .then(response => response.json())
            .then(materials => {
                if (material_loader) material_loader.style.display = "none";

                console.log(materials);

                if (!material_template || !material_list) return;

                materials.forEach(material => {
                    // clone the template li with h3 and p inside
                    const clone = material_template.content.cloneNode(true);
                    // populate the cloned template
                    const material_heading = clone.querySelector(".material-heading");
                    material_heading.textContent = material.heading;

                    const material_description = clone.querySelector(".material_description");
                    material_description.textContent = material.description;

                    //Hide the loader

                    //Append the populated template to the list
                    material_list.appendChild(clone);
                });
            })
            .catch(error => {
                console.log(error);
                if (material_list) {
                    const error_message = document.createElement("p");
                    error_message.textContent = "Oops, something went wrong. Please try again later.";
                    material_list.appendChild(error_message);
                }
                if (material_loader) material_loader.style.display = "none";
            });
    }
    load_material_info();


    function show_info() {
        let selected = document.querySelector(`#${this.dataset.slot}`);
        if (selected) gsap.to(selected, { autoAlpha: 1, duration: 1 });
    }

    function hide_info() {
        let selected = document.querySelector(`#${this.dataset.slot}`);
        if (selected) gsap.to(selected, { autoAlpha: 0, duration: 1 });
    }

    //Event listeners

    hotspots.forEach(function (hotspot) {
        hotspot.addEventListener("mouseenter", show_info);
        hotspot.addEventListener("mouseleave", hide_info);
    });

})();

