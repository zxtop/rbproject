webpackJsonp([0],{Quw4:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"login",data:function(){return{percent:0,showPress:!0}},mounted:function(){this.init()},methods:{init:function(){localStorage.setItem("farmDate",null),this.$nextTick(function(){this.$store.dispatch("loadgame")}),this.loadPage()},loadPage:function(){var t=this,e=setInterval(function(){t.percent<100?(t.percent+=50,t.showPress=!0):(clearInterval(e),t.showPress=!1)},100)},fullScreen:function(){this.$router.push({path:"/start",query:this.otherQuery})}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",{staticClass:"loading"},[t._m(0),t._v(" "),s("div",{staticClass:"press"},[t.showPress?s("p",[s("Progress",{attrs:{percent:t.percent,"stroke-width":15,"text-inside":""}})],1):t._e(),t._v(" "),t.showPress?t._e():s("p",{on:{click:t.fullScreen}},[s("Button",{attrs:{type:"success",ghost:""}},[t._v("进入游戏")])],1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pic"},[e("div",{attrs:{id:"preloader_6"}},[e("span"),this._v(" "),e("span"),this._v(" "),e("span"),this._v(" "),e("span")])])}]},i=s("VU/8")(n,r,!1,null,null,null);e.default=i.exports}});