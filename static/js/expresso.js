$(function(){

    // run at start
    $(document).ready(function(){

        // set navigation bar
        $(".navbar-all").removeClass("active");

        // hide results table
        $("#results-table").hide();

    });

    // analyze text and display results
    $("#analyze-text").click(function(){

        $("#analyze-text").blur();
        $("#analyze-text").button('loading');

        // hide results table
        $("#results-table").hide();

        // get text
        var text = $("#text-entry").val();
        console.log(text)

        if (text) {
            // send text to the server
            $.ajax({
                type: "POST",
                url: "/analyze-text",
                dataType: "json",
                data: {
                    text: text
                },
                success: function(result, textStatus, error) {
                    // display analysis results
                    console.log(result);
                    $("#word-count").text(result.word_count.toString());
                    $("#vocabulary-size").text(result.vocabulary_size.toString());
                    $("#sentence-count").text(result.sentence_count.toString());
                    $("#sentence-length").text((Math.round(result.sentence_length * 10) / 10).toString());
                    $("#declarative-ratio").text(Math.round(result.declarative_ratio * 100).toString() + "%");
                    $("#interrogative-ratio").text(Math.round(result.interrogative_ratio * 100).toString() + "%");
                    $("#exclamative-ratio").text(Math.round(result.exclamative_ratio * 100).toString() + "%");
                    $("#stopword-ratio").text(Math.round(result.stopword_ratio * 100).toString() + "%");
                    $("#word-freq").text(result.word_freq);
                    $("#bigram-freq").text(result.bigram_freq);
                    $("#trigram-freq").text(result.trigram_freq);
                    $("#results-table").show();
                    $("#analyze-text").button('reset');
                },
                error: function(request, textStatus, error) {
                    alert("Cannot analyze text: " + error);
                }
            });
        };

    });

});
