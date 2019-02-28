document.addEventListener('DOMContentLoaded', function(){
	const events = document.querySelector('.events');

	/*---------------------------------------------------------------------------
	Function to generate a list of events from the given JSON data/localStorage
	---------------------------------------------------------------------------*/
	function populateEvents(){
		//Defining a template literal for an event
		function createEvents(event, idx){
			return `
			<li>
				<a href="#">
					<div class="content">
						<h6>${event.eventName}</h6>
						<ul class="meta">
							<li>${event.eventLocation}</li>
							<li>${event.eventType}</li>
							<li>${event.eventDate}</li>
						</ul>
						<small>${event.eventDescription}</small>
					</div>
					<span class="button">View</span>
				</a>
			</li>
			`;
		}

		//Iterating over the JSON data and adding it using the above declared literal
		var htmlString = '<ul>';
		localStorage.getItem('events') ? data = JSON.parse(localStorage.getItem('events')) : data;
		data.forEach((event, idx) => {
		    var markup = createEvents(event, idx);
		    htmlString += markup;
		});
		htmlString = htmlString + '</ul>';
		events.innerHTML = "<h2>Events</h2>" + htmlString + "<div class='text-center'><a href='#'' class='add-event button button--filled'>New Event</a></div>";
	}

	populateEvents();

	/*------------------------------------------------------------------------------------
	Function to fetch data from the form, create a new event and adding it to localStorage
	------------------------------------------------------------------------------------*/
	const eventsForm = document.querySelector('.events-form');
	const addNewEventButton = document.getElementById('add-event');
	function createEvent(){
		var newEvent = {};

		let el = document.querySelectorAll('.required');;
		for(let i=0; i<el.length; i++){
			newEvent[el[i].name] = el[i].value;
		}

		data.push(newEvent);
		localStorage.setItem('events', JSON.stringify(data));
	}

	//Click event of the Add New Event button
	addNewEventButton.addEventListener('click', function(e){
		createEvent();
		populateEvents();

		events.style.display = 'block';
		eventsForm.style.display = 'none';
		e.preventDefault();
	});

	//Toggling the events list and form sections
	const addEventButton = document.querySelector('.add-event');
	const addEventCancelButton = document.querySelector('.add-event-cancel');
	addEventButton.addEventListener('click', function(){
		events.style.display = 'none';
		eventsForm.style.display = 'block';
	});
	addEventCancelButton.addEventListener('click', function(){
		events.style.display = 'block';
		eventsForm.style.display = 'none';
	});
});