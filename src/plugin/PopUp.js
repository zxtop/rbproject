export default {
    install(Vue, options) {
        Vue.prototype.$popUp = function (title, val) {
            let popDom = document.createElement('div');     // 创建弹窗dom
            let popTitle = document.createElement('div');   // 创建弹窗标题
            let popContent = document.createElement('div'); // 创建弹窗内容
            popDom.classList.add('pop-Up');            // 给dom添加class
            popTitle.classList.add('pop-title');
            popTitle.innerHTML = title;
            popContent.classList.add('pop-content');
            popContent.innerHTML = val;
            popDom.appendChild(popTitle);
            popDom.appendChild(popContent);
            document.getElementById("app").appendChild(popDom);// 在ref="eggexp"元素内添加dom
            setTimeout(() => {
                popDom.remove()
            }, 1500);
        }
    }
}