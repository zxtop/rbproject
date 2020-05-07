<template>
    <div class="loading-dock">
        <button class="submit" @click="handleBtmClick">
            <i class="ivu-icon ivu-icon-ios-checkmark" v-if="checkmark"></i>
            <i class="ivu-icon ivu-icon-ios-close" v-if="close"></i>
            {{showZimu}}
        </button>
    </div>
</template>
<script>
export default {
    name: "acbd",
    props: ["option", "answer","zimuText"],
    data() {
        return {
            checkmark: false,      //对号的图标 默认不显示
            close: false           // 查号的图标  默认不显示
        };
    },
    computed: {
        showZimu() {
            if (!this.checkmark && !this.close) {
                return this.zimuText;
            } else {
                return "";
            }
        }
    },
    methods: {
        handleBtmClick(e) {
            var submit = e.currentTarget;
            var result = false;
            var btn_class ='wrong'
            var self = this;
            if (this.option == this.answer) {
                result = true;
                btn_class ='correct'
                self.checkmark = true;
            }else{
                self.close = true;
            }
            submit.blur();
            submit.classList.add(btn_class);
            setTimeout(function() {
                
                setTimeout(function() {
                    submit.classList.remove(btn_class);
                    self.close = false;
                    self.checkmark = false;
                    self.$emit("outBtnClick", result);
                }, 1000);
            }, 500);
        }
    }
};
</script>
<style scoped>
html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-dock {
    width: 5em;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
}

button.submit {
    cursor: pointer;
    width: 50px;
    height: 50px;
    font-size: 17px;
    font-weight: 600;
    color: #56a1f1;
    background-color: white;
    border-radius: 50%;
    border: 2px solid #56a1f1;
    transition: all 0.2s;
    letter-spacing: 1px;
    font-family: "Helvetica Neue", sans-serif;
}

button.submit i {    
    font-size: 2em;    
}

button.submit.correct {
    animation: fade-to-original 0.5s linear;
}
button.submit.correct {
    background: #58c996;
    color: white;
    border: 2px solid #58c996;
}

button.submit.wrong {
    animation: fade-to-original 0.5s linear;
}
button.submit.wrong {
    background: #ea2a3c;
    color: white;
    border: 2px solid #ea2a3c;
}

</style>