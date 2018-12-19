import "./src/css/base.css";
import showStyles from "./src/view/style";
import { showResume, markDown } from "./src/view/markdown";

showStyles(0, () => {
    showResume(() => {
        showStyles(1, () => {
           markDown(() => {
                showStyles(2);
            }); 
        });
    })
});


