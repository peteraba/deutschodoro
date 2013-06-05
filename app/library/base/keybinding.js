define(
    ['vendor/jquery', 'helper/dom'],
    function($, dom){
        function init(){
            var gui = dom.get(document);

            gui.keyup(guiKeybinding);
        }

        function guiKeybinding(event) {
            var key = String.fromCharCode(event.which);

            console.log(key, event.which);

            switch (key) {
                case '1':
                case 'a':
                case '#':
                    dom.get('input', dom.get('#answerOptions li').eq(0)).click();
                    break;
                case '2':
                case 'b':
                case '(':
                    dom.get('input', dom.get('#answerOptions li').eq(1)).click();
                    break;
                case '3':
                case 'c':
                case '"':
                    dom.get('input', dom.get('#answerOptions li').eq(2)).click();
                    break;
                default:
                    if (event.which == 13) {
                        dom.get('#submit').click();
                    }
            }
        }

        $(document).ready(init);

        return {
            init: init
        }
    }
);