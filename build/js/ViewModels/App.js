define(["knockout"],function(e){function t(){var t=new Date,n=this;this.date=e.observable({year:t.getFullYear(),month:t.getMonth()}),this.humanizeDate=e.computed(function(){return console.log(n.date().month),a[n.date().month]+" "+n.date().year}),this.upMonth=function(){var e=new Date(n.date().year,n.date().month+1);n.date({year:e.getFullYear(),month:e.getMonth()})},this.downMonth=function(){var e=new Date(n.date().year,n.date().month-1);n.date({year:e.getFullYear(),month:e.getMonth()})}}var a="January February March April May June July August September October November December".split(" ");return t});