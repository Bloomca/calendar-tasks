define(["knockout"],function(e){function t(e){var t=[],n=e,a=n.getDay();if(a){n.setDate(-(a-1));for(var r=n.getDate(),o=0;a>o;o++)t.push(r++)}var d=new Date(e.getFullYear(),e.getMonth()+1,0);for(o=0;o<d.getDate();o++)t.push(o+1);var c=t.length%7;for(o=0;c>o;o++)t.push(o+1);return t}var n="SUN MON TUES WEN THU FRI SAT".split(" ");e.bindingHandlers.calendarGrid={init:function(e,a){for(var r=a(),o=new Date(r.year,r.month),d=document.createElement("tbody"),c=document.createElement("tr"),i=0;7>i;i++){var l=document.createElement("td");l.appendChild(document.createTextNode(n[i])),c.appendChild(l)}d.appendChild(c);var u=t(o);console.log(u);var f=u/7;for(i=0;f>i;i++);}}});