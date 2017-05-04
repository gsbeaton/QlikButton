Qv.AddExtension("Post_Button",
        function () {
            /*
            |------------------------------------------------------------
            | Initialise Variables
            |------------------------------------------------------------
            | 
            | These variables get the text from the properties boxes
            | for use later in this script.
            |
            | Note the buttonState variable requires a QlikView
            | expression that parses out to '1' for for the button
            | to be enabled.
            |
            */
            var button_text = this.Layout.Text0.text;
            var service_URL = this.Layout.Text1.text;
            var parameters  = this.Layout.Text2.text;
            var buttonState = this.Layout.Text3.text == 1 ? false : true;  

            /*
            |------------------------------------------------------------
            | Add CSS
            |------------------------------------------------------------
            | 
            | This statement injects our CSS file into the head of the
            | QlikView web page.
            |
            */
            Qva.LoadCSS(Qva.Remote + (Qva.Remote.indexOf('?') >= 0 ? '&' : '?') + 'public=only' + '&name=' + "Extensions/Post_Button/Post_Button.css");

            /*
            |------------------------------------------------------------
            | Create the Submit Button
            |------------------------------------------------------------
            | 
            | QlikView extensions require the HTML to be injected into
            | the DOM. TO do this, we create a variable containing the
            | HTML along with all the parsed QlikView expressions 
            | contained in variables set at the start of this page.
            |
            | Finally, this is appened to the correct HTML node using
            | the jQuery 'append' function.
            |
            */
            this.Element.innerHTML = "<div class=\"Post_Button\"></div>";
            var mysnippet =  "<form action=\""+service_URL+"\" method=\"post\" target=\"_blank\">";
                mysnippet += "<button type=\"submit\" class=\"Post_Button_Extension\" >"+button_text+"</button>";
                mysnippet += "<input type=\"hidden\" name=\"postData\" value=\""+parameters+"\" />";
                mysnippet += "</form>";
            $('.Post_Button').append(mysnippet)
                             .click(function(e){
                                e.preventDefault();

                                $.ajax({
                                type: "GET",
                                url: service_URL,
                                data: parameters,
                                success: console.log('ok'),
                                dataType: "json"
                              });


                             })

            /*
            |------------------------------------------------------------
            | Enable / Disable Submit Button
            |------------------------------------------------------------
            | 
            | This statement uses jQuery's 'prop' function to set the
            | state of the button.  The button can only be disabled
            | or enabled (identified with either a 0 or a 1).
            |
            | It does not set a listener as QlikView handles the re-
            | execution of this code depending on page calculation
            | conditions.
            |
            */
            $('.Post_Button_Extension').prop('disabled', buttonState);
        });
