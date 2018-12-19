
import _ from 'lodash';
import '@/style.css';
import component from "@/component";


// console.log(process);
// if (process.env.NODE_ENV !== 'production') {
//     console.log('development');
// } else {
//     console.log("production");
// }

let demoComponent = "";
demoComponent = component();
document.getElementsByClassName("divWrap")[0].innerHTML = "";
document.getElementsByClassName("divWrap")[0].appendChild(demoComponent);

if (module.hot) {
  module.hot.accept();
}
