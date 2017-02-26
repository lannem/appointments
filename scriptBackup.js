// Array with appointments with default appointments
var appointments;

$(document).ready(function() {
	appointments = new Array();

	appointments = [
		{name: 'John Smith', date: '2017-09-14', time: '14:00'},
		{name: 'Kelly Jones', date: '2017-02-16', time: '10:30'},
		{name: 'Julie Jackson', date: '2016-11-30', time: '13:15'}
	];

	populateTable();
	addAppointment();
	selectAppointment();
	deleteAppointment();
	editAppointment();
	
});

//for each appointment fill a row in the table
function populateTable(){
	$("#table tbody").empty();

	$.each(appointments, function(index, value){
		var tr = $('<tr>').appendTo('tbody');
		
		$.each(value, function(propIndex, propVal){
			tr.append('<td>' + propVal + '</td>');
		});
	});
}

//add
function addAppointment(){
	$("#addButton").click(function(){
		$("#addAppModal").modal();

		$("#name").val("");
		$("#date").val("");
		$("#time").val("12:00");

		$("#modalHead").html("Add Appointment");
		$("#updateApp").hide();
		$("#submitApp").show();
	});

	$("#submitApp").click(function(){
			var newName = $("#name").val();
			var newDate = $("#date").val();
			var newTime = $("#time").val();

			appointments.push({name: newName, date: newDate, time: newTime});

			$("form").trigger("reset");

			populateTable();
			selectAppointment();
		});
}

//select
function selectAppointment(){
	$("tbody > tr").click(function(){
		var selected = $(this).hasClass("highlight");
		$("tbody > tr").removeClass("highlight");

		if(!selected){
			$(this).addClass("highlight");
		}
	});
}

//delete
function deleteAppointment(){
	$("#deleteButton").click(function(){
		$("tbody > tr").each(function(index, element){
			var selected = $(this).hasClass("highlight");
			
			if(selected){
				$(this).remove();
				appointments.splice(index, 1);
			}
		});	
	});
}

//edit
function editAppointment(){
	$("#editButton").click(function(){
		$("tbody > tr").each(function(index, element){
			var selected = $(this).hasClass("highlight");
			
			if(selected){
				$("#addAppModal").modal();

				$("#name").val(appointments[index].name);
				$("#date").val(appointments[index].date);
				$("#time").val(appointments[index].time);

				$("#modalHead").html("Edit Appointment");
				$("#submitApp").hide();
				$("#updateApp").show();

				$("#updateApp").click(function(){
					appointments[index] = {name: $("#name").val(), date: $("#date").val(), time: $("#time").val()};

					$("form").trigger("reset");

					populateTable();
					selectAppointment();

				});

			}
		});

	});
}

// sorting

// searching - by name/date/who they're seeing?

//validation(check all form elements are filled)