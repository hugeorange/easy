import $ from "jquery";
import marked from "marked";
import { DELAY } from "../../common/config";
import { resumeMarkdown } from "../../common/data";

let timer_resume;
let char_resume = "";
const showResume = (callback) => {
    var resume_len = resumeMarkdown.length;
    var resume_num = 0;
    timer_resume = setInterval(function () {
        char_resume = char_resume + resumeMarkdown.substring(resume_num, resume_num + 1);
        resume_num++;
        if (resume_len >= resume_num) {
            show(char_resume);
        } else {
            clearInterval(timer_resume);
            callback && callback();
            return;
        }
    }, DELAY);
}

const markDown = (callback) => {
    $(".resume-tag").html(marked(char_resume));
    $(".resume-wrap pre").hide();
    callback && callback();
}
const show = (params) => {
    $(".resume-wrap pre").html(params);
}

export { showResume, markDown };