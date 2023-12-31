gameEngine.player = player;
gameEngine.input = new GameInputManager(); 

gameEngine.entities.walls.push(new Wall(-250, -250, -250, 250));
gameEngine.entities.walls.push(new Wall(250, 250, -250, 250));
gameEngine.entities.walls.push(new Wall(-250, 250, 250, 250));
gameEngine.entities.walls.push(new Wall(-250, 250, -250, -250));

gameEngine.start(document.getElementById('the-canvas'), window);