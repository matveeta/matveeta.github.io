﻿function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

ajax_get('https://unsplash.it/list', function (data) {

    var perPage = 20;
    var page = document.getElementById('page');
    var sizeFilters = document.getElementById('size_filters');
    var authorFilters = document.getElementById('author_filters');
    var paginator = document.querySelector(".paginator");
    var preview = document.querySelector('.preview');
    var filterLarge = 'Large';
    var filterMedium = 'Medium';
    var filterSmall = 'Small';
    var currentData = [];

    /**
     * working
     * @param page
     */
    function getDataPerPage(page) {
        return currentData.slice(page * perPage, (page * perPage) + perPage);
    }

    /**
     * working
     * @param pageData
     * @returns {Array}
     */
    function getPageHtml(pageData) {
        var html = [];
        for (var i = 0; i < pageData.length; i++) {
            var id = pageData[i]['id'];
            var newImage = document.createElement('IMG');
            var imageSrc = 'https://unsplash.it/100?image=' + id;

            if (i < perPage) {
                newImage.classList.add("image");
                newImage.setAttribute("src", imageSrc);
                newImage.setAttribute("data-id", id);
                html.push(newImage);
            }
        }
        return html;
    }

    /**
     * @param html
     */
    function createPage(html) {
        document.getElementById("page").innerHTML = '';
        html.forEach(function (elemet) {
            document.getElementById("page").appendChild(elemet);
        });
    }

    /**
     * @param page
     */
    function buildPagination(page) {
        paginator.innerHTML = '';
        var count = currentData.length;
        var pageCount = Math.ceil(count / perPage);
        var html = '';
        if (pageCount <= 1) {
            return false;
        }
        if (page > 0) {
            html += "<a href='#' data-page=\"" + (page - 1) + "\">&#60;</a>";
        }
        html += page;
        if (page < pageCount) {
            html += "<a href='#' data-page=\"" + (page + 1) + "\">&#62;</a>";
        }
        paginator.innerHTML = html;
    }

    /**
     * @param pageNumber
     */
    function loadPage(pageNumber) {
        var pageData = getDataPerPage(pageNumber);
        var html = getPageHtml(pageData);
        createPage(html);
        buildPagination(pageNumber);
        buildAuthorFilters();
        buildSizeFilters();
    }

    function buildAuthorFilters() {
        var html = '';
        var authors = [];
        data.forEach(function (element) {
            authors.push(element['author']);
        });
        authors.filter(onlyUnique).forEach(function (author) {
            html += "<a class ='author_filter' href='#' data-author=\"" + author + "\">" + author + "</a><br>";
        });

        authorFilters.innerHTML = html;
    }

    function buildSizeFilters() {
        var html = '';

        html += "<a href='#' class ='size_filter' data-size=\"" + filterLarge + "\">" + filterLarge + "</a><br>";
        html += "<a href='#' class ='size_filter' data-size=\"" + filterMedium + "\">" + filterMedium + "</a><br>";
        html += "<a href='#' class ='size_filter' data-size=\"" + filterSmall + "\">" + filterSmall + "</a><br>";

        sizeFilters.innerHTML = html;
    }

    /**
     * @param author
     * @returns {*|Array.<T>|{TAG, CLASS, ATTR, CHILD, PSEUDO}}
     */
    function filterDataByAuthor(author) {
        return data.filter(function (val) {
            return val.author === author;
        });
    }

    /**
     *
     * @param size
     * @returns {*|Array.<T>|{TAG, CLASS, ATTR, CHILD, PSEUDO}}
     */
    function filterDataBySize(size) {
        return data.filter(function (val) {
            if (size == filterLarge && (val.height >= 1500 || val.width >= 1500 )) {
                return true;
            } else if (size == filterMedium && (val.height > 800 && val.height < 1500 || val.width > 800 && val.width < 1500)) {
                return true;
            } else if (size == filterSmall && (val.height <= 800 || val.width <= 800)) {
                return true;
            }
            return false;
        });
    }

    /**
     * @param oPicture
     */
    function display(oPicture) {
        document.querySelector(".preview__content").innerHTML = '';
        var id = oPicture.dataset.id;
        var bigPicture = document.createElement('img');
        preview.classList.add("preview_shown");
        var bigPictureSrc = 'https://unsplash.it/700?image=' + id;
        bigPicture.setAttribute('src', bigPictureSrc);
        bigPicture.classList.add("preview__image");
        document.querySelector(".preview__content").appendChild(bigPicture);
    }

    page.onclick = function showPreview(event) {
        var target = event.target;
        current = target.dataset.id;
        display(target);
    };

    preview.onclick = function closePreview(event) {
        var target = event.target;
        stop();
        if (!event || target.classList.contains('preview__content')) {
            preview.classList.remove('preview_shown');
        }
    };

    document.getElementById('author').onclick = function myFunction() {
        var authoList = document.getElementById('author_filters');
        if (authoList.style.display === 'none') {
            authoList.style.display = 'block';
        } else {
            authoList.style.display = 'none';
        }
    };

    paginator.onclick = function pagination(e) {
        var target = e.target;
        if (target.tagName !== 'DIV') {
            var pageNumber = +target.dataset.page;
            loadPage(pageNumber);
        }
    };

    sizeFilters.onclick = function pagination(e) {
        var target = e.target;
        var size = target.dataset.size;
        currentData = filterDataBySize(size);
        loadPage(0);
    };

    authorFilters.onclick = function pagination(e) {
        var target = e.target;
        var author = target.dataset.author;
        currentData = filterDataByAuthor(author);
        loadPage(0);
    };

    currentData = data;
    loadPage(0);

});





