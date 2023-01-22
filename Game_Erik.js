// Sneldheid van de achtergrond
let move_speed = 4;
	
// De hoeveelheid gravity
let gravity = 0.15;
	
// Verwijzing naar het vogelelement verkrijgen
let bird = document.querySelector('.bird');
	
// Eigenschappen van vogelelementen ophalen
let bird_props = bird.getBoundingClientRect();
let background =
	document.querySelector('.background')
			.getBoundingClientRect();
	
// Verwijzing naar het score-element ophalen
let score_val =
	document.querySelector('.score_val');
let message =
	document.querySelector('.message');
let score_title =
	document.querySelector('.score_title');
	
// De eerste gamestatus instellen om te starten
let game_state = 'Start';
	
// Een eventlistener toevoegen voor toetsaanslagen
document.addEventListener('keydown', (e) => {
	
// Start het spel als de enter-toets wordt ingedrukt
if (e.key == 'Enter' &&
	game_state != 'Play') {
	document.querySelectorAll('.pipe_sprite')
			.forEach((e) => {
	e.remove();
	});
	bird.style.top = '40vh';
	game_state = 'Play';
	message.innerHTML = '';
	score_title.innerHTML = 'Score : ';
	score_val.innerHTML = '0';
	play();
}
});
function play() {
function move() {
	
	// Detecteren of de game is afgelopen
	if (game_state != 'Play') return;
	
	// Verwijzing naar alle pijpelementen
	let pipe_sprite = document.querySelectorAll('.pipe_sprite');
	pipe_sprite.forEach((element) => {
		
	let pipe_sprite_props = element.getBoundingClientRect();
	bird_props = bird.getBoundingClientRect();
		
	// Verwijder de pijpen als je ze niet meer ziet
	// om meer gehuigen te besparen op het scherm
	if (pipe_sprite_props.right <= 0) {
		element.remove();
	} else {
		// Botsingsdetectie met vogel en pijen
		if (
		bird_props.left < pipe_sprite_props.left +
		pipe_sprite_props.width &&
		bird_props.left +
		bird_props.width > pipe_sprite_props.left &&
		bird_props.top < pipe_sprite_props.top +
		pipe_sprite_props.height &&
		bird_props.top +
		bird_props.height > pipe_sprite_props.top
		) {
			
		// De spelstatus wijzigen en het spel beëindigen
		// als er een botsing optreedt
		game_state = 'End';
		message.innerHTML = 'Press Enter To Restart';
		message.style.left = '28vw';
		return;
		} else {
		// Verhoog de score als speler
		// Door een pijp heen is
		if (
			pipe_sprite_props.right < bird_props.left &&
			pipe_sprite_props.right +
			move_speed >= bird_props.left &&
			element.increase_score == '1'
		) {
			score_val.innerHTML = +score_val.innerHTML + 1;
		}
		element.style.left =
			pipe_sprite_props.left - move_speed + 'px';
		}
	}
	});

	requestAnimationFrame(move);
}
requestAnimationFrame(move);

let bird_dy = 0;
function apply_gravity() {
	if (game_state != 'Play') return;
	bird_dy = bird_dy + gravity;
	document.addEventListener('keydown', (e) => {
	if (e.key == 'ArrowUp' || e.key == ' ') {
		bird_dy = -7.6;
	}
	});

	// Botsingsdetectie als de vogel
	// tegen de boven of onder komt

	if (bird_props.top <= 0 ||
		bird_props.bottom >= background.bottom) {
	game_state = 'End';
	message.innerHTML = 'Press Enter To Restart';
	message.style.left = '28vw';
	return;
	}
	bird.style.top = bird_props.top + bird_dy + 'px';
	bird_props = bird.getBoundingClientRect();
	requestAnimationFrame(apply_gravity);
}
requestAnimationFrame(apply_gravity);

let pipe_seperation = 0;
	
// Constante waarde voor de opening tussen twee pijpen
let pipe_gap = 65;
function create_pipe() {
	if (game_state != 'Play') return;
	
	// Een nieuwe set pijpen maken
	// als de afstand tussen twee pijpen is overschreden
	// een vooraf gedefinieerde waarde
	if (pipe_seperation > 120) {
	pipe_seperation = 0
		
	// Bereken willekeurige positie van pijpen op y-as
	let pipe_posi = Math.floor(Math.random() * 43) + 8;
	let pipe_sprite_inv = document.createElement('div');
	pipe_sprite_inv.className = 'pipe_sprite';
	pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
	pipe_sprite_inv.style.left = '100vw';
		
	// Het gemaakte pipe-element toevoegen in DOM
	document.body.appendChild(pipe_sprite_inv);
	let pipe_sprite = document.createElement('div');
	pipe_sprite.className = 'pipe_sprite';
	pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
	pipe_sprite.style.left = '100vw';
	pipe_sprite.increase_score = '1';
		
	// Het gemaakte pipe-element toevoegen in DOM
	document.body.appendChild(pipe_sprite);
	}
	pipe_seperation++;
	requestAnimationFrame(create_pipe);
}
requestAnimationFrame(create_pipe);
}
