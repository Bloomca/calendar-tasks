define(["knockout","ViewModels/dayTasks","Tasks"],function(e,t,n){function a(e){var t=[],n=new Date(+e),a=n.getDay(),d=e.getMonth(),l=e.getFullYear()+"-"+d+"-";if(a){n.setDate(-(a-1));for(var r=n.getDate(),i=0;a>i;i++)t.push({num:r,date:n.getFullYear()+"-"+n.getMonth()+"-"+r++,anotherMonth:!0})}var o=new Date(e.getFullYear(),e.getMonth()+1,0);for(i=0;i<o.getDate();i++)t.push({num:i+1,date:l+(i+1)});var s=Math.floor(t.length/7),u=7*(s+1)-t.length,h=new Date(e.getFullYear(),e.getMonth()+1,1);for(i=0;u>i;i++)t.push({num:i+1,date:h.getFullYear()+"-"+h.getMonth()+"-"+(i+1),anotherMonth:!0});return t}var d="SUN MON TUES WEN THU FRI SAT".split(" ");e.bindingHandlers.calendarGrid={init:function(l,r){function i(r){var i=r,o=new Date(i.year,i.month);l.innerHTML="";for(var s=document.createElement("tbody"),u=document.createElement("tr"),h=0;7>h;h++){var c=document.createElement("td");c.classList.add("top"),c.appendChild(document.createTextNode(d[h])),u.appendChild(c)}s.appendChild(u);var m=0,g=a(o),v=g.length/7;for(h=0;v>h;h++){var p=document.createElement("tr"),f=7*m++,M=g.slice(f,f+7);M.forEach(function(a,d){var l=document.createElement("td");l.setAttribute("data-bind","click: showFull"),l.id=Math.random(),a.anotherMonth&&l.classList.add("another-month"),l.innerHTML='<div class="date-num">'+a.num+'</div><div class="events-number" data-bind="text: eventsNumber, visible: tasks().length > 3"></div><ul data-bind="foreach: tasks"><li class="item"><div data-bind="text: title"></div></li></ul>',p.appendChild(l),e.applyBindings(new t(n[a.date],a.date,d,m),l)}),s.appendChild(p)}l.appendChild(s)}r().subscribe(function(e){console.log("update called"),i(e)});var o=new Date;i({year:o.getFullYear(),month:o.getMonth()})}}});