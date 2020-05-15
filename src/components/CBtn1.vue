<template>
    <div class="loading-dock">
        <button class="submit" @click="handleBtmClick" :disabled='isAble'>
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
            close: false,        // 查号的图标  默认不显示
            isAble:false
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
    mounted () {
    //   console.log(this.isCan,"ddddddddd")  
    },
    methods: {
        handleBtmClick(e) {
            if(this.$parent.$refs['btn_out1']){
                this.setOtherBtnDisable('btn_out1');
            }

            if(this.$parent.$refs['btn_out2']){
                this.setOtherBtnDisable('btn_out2');
            }

            this.isAble = true;
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
            // e.currentTarget.setAttribute('disabled',true)
            
            self.$emit('inClick',true)
            setTimeout(function() {
                submit.classList.remove(btn_class);
                self.close = false;
                self.checkmark = false;
                self.$emit("outBtnClick", result);
                self.isAble = false;

            }, 500);

            setTimeout(()=>{
                //取消其他按钮不可用
                if(self.$parent.$refs['btn_out1']){
                    self.cancelDisable('btn_out1');
                }
                if(self.$parent.$refs['btn_out2']){
                    self.cancelDisable('btn_out2');
                }
            },1000)
        },

        //通过类名查找某元素的特定元素 返回一组元素
       getByClass(oParent, sClass){
            var aResult=[];
            var aEle=oParent.getElementsByTagName('*');
            for(var i=0;i<aEle.length;i++){
                if(aEle[i].className==sClass)
                {
                    aResult.push(aEle[i]);
                }
            }
            return aResult;
       },

        //设置按钮不可用
       setOtherBtnDisable(name){
            let oUl = this.$parent.$refs[name];
            let oBtn = this.getByClass(oUl,'submit');
            for(var i=0;i<oBtn.length;i++){
                oBtn[i].disabled = true;
            }
       },

        //设置按钮可用
       cancelDisable(name){
            let oUl = this.$parent.$refs[name];
            let oBtn = this.getByClass(oUl,'submit');
            for(var i=0;i<oBtn.length;i++){
                oBtn[i].disabled = false;
            }
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