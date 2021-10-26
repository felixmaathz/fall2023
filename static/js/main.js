$(document).ready(function () {
    var tracks = document.getElementsByClassName('track');

    for (var i = 0; i < tracks.length; i++) {
        tracks[i].onclick = function () {
            if (window.innerWidth > 993) {
                var id = this.id + '-modal';
                document.getElementById(id).style.display = "block";
            } else {
                this.classList.toggle('focus');
                this.lastElementChild.classList.toggle('visible');
            }
        }
    }

    document.getElementById('mobile-get-involved').onclick = function () {
        document.getElementById('get-involved-modal').style.display = "block";
    }

    document.getElementById('get-involved').onclick = function () {
        document.getElementById('get-involved-modal').style.display = "block";
    }

    $('.close').on('click', function () {
        $(this).closest('.modal').css("display", "none");
    })

    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    }

    $.getJSON("/static/assets/faq.json", function (data) {
        data.forEach(function (question) {
            var $faq = $('<div>');
            var $header = $('<h2>')

            $header.append($('<img>', { "src": "static/assets/images/art/lantern.svg", "alt": "Lantern" }));
            $header.append(question['question']);
            $faq.append($header);
            $faq.append(
                $('<p>')
                    .html(question['answer'])
            )
            $('#faq-container').append($faq);
        });
    });

    $.getJSON("/static/assets/schedule.json", function (data) {

        var $header = $('<div>');
        var $tables = $('<div>', { "style": "position: relative;" });

        var i = 0;

        data.forEach(function (date) {
            $header.append(
                $('<button>', { "class": (i == 0 ? "day-selector active" : "day-selector"), "id": "day" + i })
                    .text(date['date'])
                    .on('click', function () {
                        $('.day-selector').each(function () {
                            $(this).removeClass('active');
                        }) 
                        $('table').each(function() {
                            $(this).removeClass('active');
                        })
                        $(this).addClass('active');
                        let id = $(this).attr('id').slice(-1);
                        $('#table' + id).addClass('active');
                    })
            );

            var $table = $('<table>', { "class": (i == 0 ? "active" : ""), "id": "table" + i++ });
            var $schBody = $('<tbody>');

            $table.append(
                $('<thead>').append(
                    $('<tr>')
                        .append($('<th>', { "style": "width:17.5%; text-align: left;" }).text('Time (Eastern)'))
                        .append($('<th>', { 'style': "width:25%; text-align: left;" }).text('Type'))
                        .append($('<th>', { "style": "width:57.5%; text-align: left;" }).text('Event'))
                )
            );

            var j = 0;

            date['schedule'].forEach(function (element) {
                $schBody.append(
                    $('<tr>', { "class": (j++ % 2 == 0 ? "table-row-even" : "table-row-odd") })
                        .append($('<td>').html(element['time']))
                        .append($('<td>').html(element['type']))
                        .append($('<td>').html(element['event']))
                )
            });

            $table.append($schBody);
            $tables.append($table);
        });

        $("#schedule-container").append($header);
        $tables.append(
            $('<img>', { "class": "sch-img hide-on-med-and-down", "src": "/static/assets/images/art/kraken.svg" })
        );
        $("#schedule-container").append($tables);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
