var appointments;

$(document).ready(function() {
	appointments = new Array();

	//test data
	appointments = [
		{name: 'John Smith', date: '2017-09-14', time: '14:00'},
		{name: 'Kelly Jones', date: '2017-02-16', time: '10:30'},
		{name: 'Julie Jackson', date: '2016-11-30', time: '13:15'},
		{name: 'Charlotte Gray', date: '2016-05-02', time: '17:00'},
		{name: 'Christopher Thornton', date: '2017-11-09', time: '12:45'},
		{name: 'Charles Jones', date: '2017-04-02', time: '11:20'},
		{name: 'Katie Foster', date: '2017-07-07', time: '13:00'},
		{name: 'Jamie Green', date: '2016-12-09', time: '10:00'},
		{name: 'Jade Frost', date: '2017-05-10', time: '14:00'},
		{name: 'Patrick Slater', date: '2016-12-08', time: '15:30'}
	];

	var allAppointments = appointments;

	populateTable();

	//event handlers - buttons
	$("#addButton").click(addAppointment);
	$("#submitApp").click(submitAppointment);
	$("#deleteButton").click(deleteAppointment);
	$("#editButton").click(editAppointment);
	$("#searchButton").click(search);
	//event handlers - table headers - for sorting
	$("#nameCol").click(function() {sortBy('name');});
	$("#dateCol").click(function() {sortBy('date');});
	$("#timeCol").click(function() {sortBy('time');});
	
});

//for each appointment fill row in table
function populateTable(){
	$("#table tbody").empty();

	$.each(appointments, function(index, value){
		var tr = $('<tr>').appendTo('tbody');
		
		$.each(value, function(propIndex, propVal){
			tr.append('<td>' + propVal + '</td>');
		});
	});

	$("tbody > tr").click(selectAppointment);
}

//display modal with add new appointment form
function addAppointment(){
	$("#addAppModal").modal();

	$("#name").val("");
	$("#date").val("");
	$("#time").val("12:00");

	$("#modalHead").html("Add Appointment");
	$("#updateApp").hide();
	$("#submitApp").show();
}

//submit new appointment and add to table
function submitAppointment(){
	if($("#name").val().length == 0 || $("#date").val().length == 0){
		$("#message").html("Please complete all fields");
	}
	else{
		var newName = $("#name").val();
		var newDate = $("#date").val();
		var newTime = $("#time").val();

		appointments.push({name: newName, date: newDate, time: newTime});

		$("form").trigger("reset");

		populateTable();

		$("#addAppModal").modal('hide');
		$("#message").html("");
	}	
}

//select appointment in table and highlight
function selectAppointment(){
	var selected = $(this).hasClass("highlight");
	$("tbody > tr").removeClass("highlight");

	if(!selected){
		$(this).addClass("highlight");
	}
}

//delete selected appointment form table
function deleteAppointment(){
	$("tbody > tr").each(function(index, element){
		var selected = $(this).hasClass("highlight");
		if(selected){
			$(this).remove();
			appointments.splice(index, 1);
		}
	});	
}

//edit selected appointment - display modal with edit form
function editAppointment(){
	$("tbody > tr").each(function(index, element){
		var selected = $(this).hasClass("highlight");
			
		if(selected){
			$("#addAppModal").modal();

			//set form values to current values of selected appointment
			$("#name").val(appointments[index].name);
			$("#date").val(appointments[index].date);
			$("#time").val(appointments[index].time);

			$("#modalHead").html("Edit Appointment");
			$("#submitApp").hide();
			$("#updateApp").show();

			//event handler for update button - updates appointment and rewrites table
			$("#updateApp").click(function(){
				if($("#name").val().length == 0 || $("#date").val().length == 0){
					$("#message").html("Please complete all fields");
				}
				else{
					appointments[index] = {name: $("#name").val(), date: $("#date").val(), time: $("#time").val()};

					$("form").trigger("reset");

					populateTable();
					selectAppointment();

					$("#addAppModal").modal('hide');
					$("#message").html("");
				}
			});

		}
	});
}

var sorted = {field: "name", clicked:false};

//sort appointments to asc/desc
function sortBy(field){
	appointments.sort(function(a, b){
		if(a[field].toLowerCase() < b[field].toLowerCase()) return -1;
		if(a[field].toLowerCase() > b[field].toLowerCase()) return 1;
		return 0;
	});

	if(sorted.field == field && sorted.clicked == true){
		appointments.reverse();
		sorted = {field:field, clicked:false};
	}
	else{
		sorted = {field:field, clicked:true};
	}

	populateTable();
}

//search appointments
function search(){

	var fullList = appointments;
	appointments = [];

	var searchBy = $("#searchBy option:selected").text();
	var input = $("#searchInput").val();

	for(var i=0; i<fullList.length; i++){
		if(fullList[i][searchBy].toLowerCase().search(input.toLowerCase()) != -1){
			appointments.push(fullList[i]);
		}

	}

	populateTable();

	if(input == ""){
		appointments = fullList;
	}
}