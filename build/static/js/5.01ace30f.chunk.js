(this.webpackJsonpchrahlifront=this.webpackJsonpchrahlifront||[]).push([[5],{707:function(e,t,a){"use strict";a.r(t);var n=a(664),l=a(665),r=a(667),c=a(666),i=a(0),s=a.n(i),o=a(160),d=a(116),m=a(68),u=a(655),g=a(708),h=a(32),p=a(712),E=a(713),y=a(714),f=[{title:s.a.createElement(h.a,{id:"columns.name"}),dataIndex:"name",align:"right"},{title:s.a.createElement(h.a,{id:"columns.operation"}),dataIndex:"",key:"x",render:function(e){e.id;return s.a.createElement("span",null,s.a.createElement(o.a,{type:"primary",icon:s.a.createElement(p.a,null)}," \u062a\u0639\u062f\u064a\u0644 "))},align:"right"}],b=[],w=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,r=new Array(l),c=0;c<l;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={selectedRowKeys:[],loading:!1},e.start=function(){e.setState({loading:!0}),setTimeout((function(){e.setState({selectedRowKeys:[],loading:!1})}),1e3)},e.onSelectChange=function(t){console.log("selectedRowKeys changed: ",t),e.setState({selectedRowKeys:t})},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this.state,t=e.loading,a=e.selectedRowKeys,n={selectedRowKeys:a,onChange:this.onSelectChange},l=a.length>0;return s.a.createElement(d.a,null,s.a.createElement(m.a,{span:24},s.a.createElement(u.a,{title:s.a.createElement("h1",null,s.a.createElement(h.a,{id:"sidebar.Cities"}))},s.a.createElement(o.a,{size:"large",icon:s.a.createElement(E.a,null),type:"primary"}),s.a.createElement(o.a,{size:"large",icon:s.a.createElement(y.a,null),disabled:!l,type:"danger",loading:t}),s.a.createElement("div",{className:"gx-mb-3"},s.a.createElement("span",{style:{marginLeft:8}},l?"\u062a\u0645 \u062a\u062d\u062f\u064a\u062f ".concat(a.length," \u0639\u0646\u0627\u0635\u0631"):"")),s.a.createElement(g.a,{dir:"rtl",bordered:!0,className:"gx-table-responsive",rowSelection:n,columns:f,dataSource:b}))))}}]),a}(s.a.Component);t.default=w}}]);
//# sourceMappingURL=5.01ace30f.chunk.js.map