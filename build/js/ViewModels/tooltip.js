define(["knockout"],function(t){function e(){this.active=t.observable(null),this.tasks=t.observableArray(),this.showTooltip=t.observable(!1),this.note=t.observable(""),this.addNote=function(){var t=this.note();this.note(""),this.tasks.push({title:t,body:t})}}var o=(document.getElementById("app"),document.getElementById("tooltip")),n=new e;return t.applyBindings(n,o),n});