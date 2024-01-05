const COLORS = {
  wall: "#1D3427",
  floor: "#335B43",
  enemy: "#9C528B",
  player: "#0582CA",
  playerBullet: "#F18F01",
  towerBase: "#157F1F",
  towerBullet: "#4CB963"
};

const SIZES = {
  cell: 100,
  wallWidth: 30,
  playerRadius: 20,
  enemyRadius: 16,
  bulletRadius: 7.5,
  bulletSmokeRadius: {
    min: 5,
    max: 10
  }
};

const CONFIG = {
  FPS: 60,
  pixelation: 4,
  collisionMapChunkSize: 40,
  mazeCellSize: 480,
  mazeGridSize: 16
};

const WEIGHTS = {
  repulsion: {
    enemy: 0.24,
    bullet: 10,
    player: 0.36,
  }
}

const SPEEDS = {
  player: 3,
  bullet: 12,
}