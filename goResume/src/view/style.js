import $ from "jquery";
import Prism from 'prismjs'
import { styles } from "../../common/data";
import { DELAY } from "../../common/config";


let timer_style;
let char_style = "";

const showStyles = (num, callback) => {

    let style_len = styles[num].length;
    let style_num = 0;

    timer_style = setInterval(function () {
        char_style = char_style + styles[num].substring(style_num, style_num + 1);
        style_num++;
        if (style_len >= style_num) {
            show(char_style);
        } else {
            clearInterval(timer_style);
            callback && callback();
            return;
        }
    }, DELAY);
}

const show = (params) => {
    goBottom($(".styles-wrap"), $(".styles-wrap pre"));
    $(".styles-wrap pre").html(Prism.highlight(params, Prism.languages.css));
    $(".styles-wrap style").html(params);
}

const goBottom = (wrap, inner) => {
    let top = inner.height() - wrap.height();
    if (top > 0) {
        wrap.scrollTop(top + 10);
    }
}


export default showStyles;