AUI.add("aui-ace-editor-keybinding-emacs",function(a){define("ace/keyboard/keybinding/emacs",["require","exports","module","ace/keyboard/state_handler"],function(h,g,l){var k=h("ace/keyboard/state_handler").StateHandler,j=h("ace/keyboard/state_handler").matchCharacterOnly,i={start:[{key:"ctrl-x",then:"c-x"},{regex:["(?:command-([0-9]*))*","(down|ctrl-n)"],exec:"golinedown",params:[{name:"times",match:1,type:"number",defaultValue:1}]},{regex:["(?:command-([0-9]*))*","(right|ctrl-f)"],exec:"gotoright",params:[{name:"times",match:1,type:"number",defaultValue:1}]},{regex:["(?:command-([0-9]*))*","(up|ctrl-p)"],exec:"golineup",params:[{name:"times",match:1,type:"number",defaultValue:1}]},{regex:["(?:command-([0-9]*))*","(left|ctrl-b)"],exec:"gotoleft",params:[{name:"times",match:1,type:"number",defaultValue:1}]},{comment:"This binding matches all printable characters except numbers as long as they are no numbers and print them n times.",regex:["(?:command-([0-9]*))","([^0-9]+)*"],match:j,exec:"inserttext",params:[{name:"times",match:1,type:"number",defaultValue:"1"},{name:"text",match:2}]},{comment:"This binding matches numbers as long as there is no meta_number in the buffer.",regex:["(command-[0-9]*)*","([0-9]+)"],match:j,disallowMatches:[1],exec:"inserttext",params:[{name:"text",match:2,type:"text"}]},{regex:["command-([0-9]*)","(command-[0-9]|[0-9])"],comment:"Stops execution if the regex /meta_[0-9]+/ matches to avoid resetting the buffer."}],"c-x":[{key:"ctrl-g",then:"start"},{key:"ctrl-s",exec:"save",then:"start"}]};g.Emacs=new k(i);}),define("ace/keyboard/state_handler",["require","exports","module"],function(g,f,j){function h(b){this.keymapping=this.$buildKeymappingRegex(b);}var i=!1;h.prototype={$buildKeymappingRegex:function(b){for(state in b){this.$buildBindingsRegex(b[state]);}return b;},$buildBindingsRegex:function(b){b.forEach(function(c){c.key?c.key=new RegExp("^"+c.key+"$"):Array.isArray(c.regex)?(c.key=new RegExp("^"+c.regex[1]+"$"),c.regex=new RegExp(c.regex.join("")+"$")):c.regex&&(c.regex=new RegExp(c.regex+"$"));});},$composeBuffer:function(l,k,p){if(l.state==null||l.buffer==null){l.state="start",l.buffer="";}var o=[];k&1&&o.push("ctrl"),k&8&&o.push("command"),k&2&&o.push("option"),k&4&&o.push("shift"),p&&o.push(p);var n=o.join("-"),m=l.buffer+n;k!=2&&(l.buffer=m);return{bufferToUse:m,symbolicName:n};},$find:function(k,d,o,n,m){var l={};this.keymapping[k.state].some(function(p){var e;if(p.key&&!p.key.test(o)){return !1;}if(p.regex&&!(e=p.regex.exec(d))){return !1;}if(p.match&&!p.match(d,n,m,o)){return !1;}if(p.disallowMatches){for(var c=0;c<p.disallowMatches.length;c++){if(!!e[p.disallowMatches[c]]){return !1;}}}if(p.exec){l.command=p.exec;if(p.params){var b;l.args={},p.params.forEach(function(q){q.match!=null&&e!=null?b=e[q.match]||q.defaultValue:b=q.defaultValue,q.type==="number"&&(b=parseInt(b)),l.args[q.name]=b;});}k.buffer="";}p.then&&(k.state=p.then,k.buffer=""),l.command==null&&(l.command="null"),i&&console.log("KeyboardStateMapper#find",p);return !0;});if(l.command){return l;}k.buffer="";return !1;},handleKeyboard:function(k,d,o){if(d==0||o!=""&&o!=String.fromCharCode(0)){var n=this.$composeBuffer(k,d,o),m=n.bufferToUse,l=n.symbolicName;n=this.$find(k,m,l,d,o),i&&console.log("KeyboardStateMapper#match",m,l,n);return n;}return null;}},f.matchCharacterOnly=function(k,e,m,l){return e==0?!0:e==4&&m.length==1?!0:!1;},f.StateHandler=h;});},"@VERSION@",{requires:["aui-ace-editor-base"],skinnable:false});