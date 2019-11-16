"use strict";function CssHandler(t,e){this._style=new CssTokenizer(t,e).parse()}function CssTokenizer(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.res=this.initClass(e),this._state="SPACE",this._buffer=t,this._sectionStart=0,this._index=0,this._name="",this._content="",this._list=[],this._comma=!1}var CanIUse=require("./api.js").versionHigherThan("2.7.1");

CssHandler.prototype.match=function(t,e){var s=this._style[t]?this._style[t]+";":"";if(e.id&&(s+=this._style["#"+e.id]?this._style["#"+e.id]+";":""),e.class){var i=!0,n=!1,o=void 0;try{for(var r,a=e.class.split(" ")[Symbol.iterator]();!(i=(r=a.next()).done);i=!0){var h=r.value;s+=this._style["."+h]?this._style["."+h]+";":""}}catch(t){n=!0,o=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw o}}}return s},CssTokenizer.prototype.initClass=function(t){var e=JSON.parse(JSON.stringify(t));return e.a="display:inline;color:#366092;word-break:break-all;"+(e.a||""),e.address="font-style:italic;"+(e.address||""),e.blockquote=e.blockquote||"background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px;",e.center="text-align:center;"+(e.center||""),e.cite="font-style:italic;"+(e.cite||""),e.code=e.code||"padding:0 1px 0 1px;margin-left:2px;margin-right:2px;background-color:#f8f8f8;border:1px solid #cccccc;border-radius:3px;",e.dd="margin-left:40px;"+(e.dd||""),e.img="max-width:100%;"+(e.img||""),e.mark="display:inline;background-color:yellow;"+(e.mark||""),e.pre="overflow:scroll;"+(e.pre||"background-color:#f6f8fa;padding:5px;border-radius:5px;"),e.s="display:inline;text-decoration:line-through;"+(e.s||""),e.u="display:inline;text-decoration:underline;"+(e.u||""),CanIUse||(e.big="display:inline;font-size:1.2em;"+(e.big||""),e.small="display:inline;font-size:0.8em;"+(e.small||""),e.pre="font-family:monospace;white-space:pre;"+e.pre),e},CssTokenizer.prototype.SPACE=function(t){/[a-zA-Z.#]/.test(t)?(this._sectionStart=this._index,this._state="InName"):"@"==t?this._state="Ignore1":"/"==t&&(this._state="BeforeComment")},CssTokenizer.prototype.BeforeComment=function(t){"*"==t?this._state="InComment":(this._index--,this._state="SPACE")},CssTokenizer.prototype.InComment=function(t){"*"==t&&(this._state="AfterComment")},CssTokenizer.prototype.AfterComment=function(t){"/"==t?this._state="SPACE":(this._index--,this._state="InComment")},CssTokenizer.prototype.InName=function(t){"{"==t?(this._list.push(this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=this._index+1,this._state="InContent"):","==t?(this._list.push(this._buffer.substring(this._sectionStart,this._index)),this._sectionStart=this._index+1,this._comma=!0):"."!=t&&"#"!=t||this._comma?/\s/.test(t)?(this._name=this._buffer.substring(this._sectionStart,this._index),this._state="NameSpace"):/[>:\[]/.test(t)?this._list.length?this._state="IgnoreName":this._state="Ignore1":this._comma=!1:this._buffer=this._buffer.splice(this._index,1," ")},CssTokenizer.prototype.NameSpace=function(t){"{"==t?(this._list.push(this._name),this._sectionStart=this._index+1,this._state="InContent"):","==t?(this._comma=!0,this._list.push(this._name),this._sectionStart=this._index+1,this._state="InName"):/\S/.test(t)&&(this._comma?(this._sectionStart=this._index,this._index--,this._state="InName"):this._list.length?this._state="IgnoreName":this._state="Ignore1")},CssTokenizer.prototype.InContent=function(t){if("}"==t){this._content=this._buffer.substring(this._sectionStart,this._index);var e=!0,s=!1,i=void 0;try{for(var n,o=this._list[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var r=n.value;this.res[r]=(this.res[r]||"")+";"+this._content}}catch(t){s=!0,i=t}finally{try{!e&&o.return&&o.return()}finally{if(s)throw i}}this._list=[],this._comma=!1,this._state="SPACE"}},CssTokenizer.prototype.IgnoreName=function(t){","==t?(this._sectionStart=this._index+1,this._state="InName"):"{"==t&&(this._sectionStart=this._index+1,this._state="InContent")},CssTokenizer.prototype.Ignore1=function(t){";"==t?(this._state="SPACE",this._sectionStart=this._index+1):"{"==t&&(this._state="Ignore2")},CssTokenizer.prototype.Ignore2=function(t){"}"==t?(this._state="SPACE",this._sectionStart=this._index+1):"{"==t&&(this._state="Ignore3")},CssTokenizer.prototype.Ignore3=function(t){"}"==t&&(this._state="Ignore2")},CssTokenizer.prototype.parse=function(){for(;this._index<this._buffer.length;this._index++)this[this._state](this._buffer[this._index]);return this.res},module.exports=CssHandler;