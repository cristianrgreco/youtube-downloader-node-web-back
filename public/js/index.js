$(function () {
    var searchField = $('#searchField');
    var downloadsTable = $('.downloadsTable tbody');

    $('#startDownload').on('click', function () {
        var url = searchField.val();
        searchField.val('');

        var row = $('<tr>');
        var cells = {
            id: $('<td>'),
            downloadType: $('<td>'),
            name: $('<td>'),
            percentageComplete: $('<td>'),
            downloadCell: $('<td>')
        };
        for (var i in cells) {
            row.append(cells[i]);
        }
        console.log(row);
        downloadsTable.append(row);

        cells.id.text(getParameterByName(url, 'v').toUpperCase());
        var downloadTypeText = $('.downloadTypeGroup input[name=downloadType]:checked').val();
        cells.downloadType.append('<i class="fa ' + (downloadTypeText === 'video' ? 'fa-film' : 'fa-music') + '"></i>');
        var percentageComplete = $('<progress value="0" max="100">');
        cells.percentageComplete.append(percentageComplete);
        var downloadButton = $('<button class="download">Download</button>');
        cells.downloadCell.append(downloadButton);

        $.get('title/' + encodeURIComponent(url), function (result) {
            cells.name.text(result.title);
        });
    });
});

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
