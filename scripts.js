	var key = 'd57f3ac24ce946f3a57d42b3c590d0c4';
	var searchURL = 'http://api.giphy.com/v1/gifs/search';
	var topics = ['Rick & Morty','Ed, Edd n Eddy','The Simpsons','Voltron','Rugrats','Teenage Mutant Ninja Turtles','Duck Tales','Thundercats','Transformers','Inspector Gadget','Animaniacs','The Flintstones'];
	
	$(document).ready(function(){

	$('#add-button').on('click',function(){
		event.preventDefault();
		newVal = $('#addbutton-txt').val().trim();
		if(newVal != '' && topics.indexOf(newVal) == -1){
			topics.push(newVal);
			makeButtons();
		}

	});

	makeButtons()
	$(document).on('click','img',animation);

	})

	function makeButtons(){
		$('#buttons').empty();
		$(topics).each(function(){
			var newButton = $('<button>');
			newButton.addClass('btn btn-info img-maker');
			newButton.data('value',this);
			newButton.text(this)
			$('#buttons').append(newButton);
		}) 
		$(document).on("click", ".img-maker", makeImages)	
	}
	function makeImages(){
		$('#results').empty();
		var searchVar = $(this).data('value');
		$.get(searchURL,{
			api_key : key,
			q : searchVar
		}).done(function(response){
			$(response.data).each(function(){
				newDiv = $('<div>');
				newDiv.addClass('img-div');
				newDiv.append('<b>Rating: </b>' + this.rating+'<br>');
				newImg = $('<img>');
				newImg.addClass('image')
				newImg.attr('src',this.images.fixed_height_still.url);
				newImg.attr('data-alt', this.images.fixed_height.url);
				newDiv.append(newImg);
				$('#results').append(newDiv);
			});
		})

	}
	
	function animation(img){
		image = $(this);
		switchTo = image.attr('data-alt');

		switchFrom = image.attr('src');

		image.attr('src',switchTo);

		image.attr('data-alt',switchFrom);
		console.log(switchTo);
		console.log(switchFrom);

	}
