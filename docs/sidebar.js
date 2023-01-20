// Un-active everything when you click it
Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function(el) {
    el.addEventHandler("click", function() {
        Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function(el) {
            el.classList.remove("active");
        });
        el.classList.add("active");
    });
});

// Toggle pagetoc display
function pagetocToggle() {
  var x = document.getElementsByClassName("pagetoc")[0];
  if (x.style.display === "none") {
    x.style.display = "block";
    localStorage.setItem('pagetoc-display','block')
  } else {
    x.style.display = "none";
    localStorage.setItem('pagetoc-display','none')
  }
}

var updateFunction = function() {

    var id;
    var elements = document.getElementsByClassName("header");
    Array.prototype.forEach.call(elements, function(el) {
        if (window.pageYOffset >= el.offsetTop) {
            id = el;
        }
    });

    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function(el) {
        el.classList.remove("active");
    });

    Array.prototype.forEach.call(document.getElementsByClassName("pagetoc")[0].children, function(el) {
        if (id.href.localeCompare(el.href) == 0) {
            el.classList.add("active");
        }
    });
};

// Populate sidebar on load
window.addEventListener('load', function() {
    var pagetoc = document.getElementsByClassName("pagetoc")[0];
    pagetoc.style.display = localStorage.getItem("pagetoc-display");

    var elements = document.getElementsByClassName("header");

    // Only build pagetoc if there is more than the page Heading
    var elements = document.getElementsByClassName("header");
    if (elements.length > 1) {
        Array.prototype.forEach.call(elements, function(el) {
            var link = document.createElement("a");

            // Indent shows hierarchy
            var indent = "";
            switch (el.parentElement.tagName) {
                case "H2":
                    indent = "20px";
                    break;
                case "H3":
                    indent = "40px";
                    break;
                case "H4":
                    indent = "60px";
                    break;
                default:
                    break;
            }

            link.appendChild(document.createTextNode(el.text));
            link.style.paddingLeft = indent;
            link.href = el.href;
            pagetoc.appendChild(link);
        });
        updateFunction.call();
    }
});



// Handle active elements on scroll
window.addEventListener("scroll", updateFunction);
