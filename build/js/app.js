define(["knockout","Components/calendarGrid","Components/ctrlEnter"],function(e){function t(e){if(!e){var t=new Date;e={year:t.getFullYear(),month:t.getMonth()}}this.date=e,this.humanizeDate=r[e.month],this.tasks=[]}function n(){this.test=!0}var a=document.getElementById("app"),r="January February March April May June July August September October November 				  December".split(" ");this.test=new n,e.applyBindings(new t,a)});