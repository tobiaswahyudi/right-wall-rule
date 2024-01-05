class GridCell {
  constructor() {
    this.N = false;
    this.E = false;
    this.W = false;
    this.S = false;
    this.wallCount = 0;
  }
}

class Maze {
  constructor(size, wallProbability) {
    this.size = size;
    this.grid = Array(size).fill(0).map(v => Array(size).fill(0).map(v => new GridCell()));

    this.unionFind = new UnionFind(size * size);
    this.deadEnds = []

    this.generate(wallProbability);
  }

  generate(wallProbability) {
    for(let row = 0; row < this.size; row++) {
      for(let col = 0; col < this.size; col++) {
        if(col == this.size - 1) {
          this.grid[row][col].E = true;
        } else {
          const wall = coinFlip(wallProbability)
          this.grid[row][col].E = wall;
          if(!wall) this.unionFind.unite((row * this.size + col), (row * this.size + col + 1));
        }
        if(row == this.size - 1) {
          this.grid[row][col].S = true;
        } else {
          const wall = coinFlip(wallProbability)
          this.grid[row][col].S = wall;
          if(!wall) this.unionFind.unite((row * this.size + col), (row * this.size + col + this.size));
        }
      }
    }

    const componentSet = new Set();

    for(let idx = 0; idx < this.size * this.size; idx++) {
      if(this.unionFind.findPar(idx) == idx) componentSet.add(idx);
    }

    while(componentSet.size > 1) {
      const component = randomChoice(componentSet, componentSet.size);
      const elements = []
      for(let idx = 0; idx < this.size * this.size; idx++) {
        if(this.unionFind.findPar(idx) == component) elements.push(idx);
      }
      const walls = []
      elements.forEach(idx => {
        const row = Math.trunc(idx / this.size);
        const col = idx % this.size;

        if(!this.grid[row][col].E && !this.grid[row][col].S) return;
        if(this.grid[row][col].E && col != this.size - 1 && this.unionFind.findPar(idx) != this.unionFind.findPar(idx + 1)) {
          walls.push([idx, 'E']);
        }
        if(this.grid[row][col].S && row != this.size - 1 && this.unionFind.findPar(idx) != this.unionFind.findPar(idx + 16)) {
          walls.push([idx, 'S']);
        }
      })

      // Pick another component?
      // This happens if component is bottom-right
      if(walls.length == 0) continue;

      const [idx, direction] = randomChoice(walls, walls.length);

      const row = Math.trunc(idx / this.size);
      const col = idx % this.size;

      const adjacentCellOffset = direction == 'E' ? 1 : 16;

      this.grid[row][col][direction] = false;
      const yieldingParent = this.unionFind.yieldingParent(idx, idx + adjacentCellOffset);
      componentSet.delete(yieldingParent);
      this.unionFind.unite(idx, idx + adjacentCellOffset);
    }

    for(let row = 0; row < this.size; row++) {
      this.grid[row][0].wallCount++;
      this.grid[row][this.size - 1].wallCount++;
      if(this.grid[row][this.size - 1].S) this.grid[row][this.size - 1].wallCount++;
    }
    for(let col = 0; col < this.size; col++) {
      this.grid[0][col].wallCount++;
      this.grid[this.size - 1][col].wallCount++;
      if(this.grid[this.size - 1][col].S) this.grid[this.size - 1][col].wallCount++;
    }
    for(let row = 0; row < this.size; row++) {
      for(let col = 0; col < this.size; col++) {
        if(this.grid[row][col].S && row != this.size - 1) {
          this.grid[row][col].wallCount += 1;
          this.grid[row+1][col].wallCount += 1;
        }
        if(this.grid[row][col].E && col != this.size - 1) {
          this.grid[row][col].wallCount += 1;
          this.grid[row][col+1].wallCount += 1;
        }
        if(this.grid[row][col].wallCount == 3) this.deadEnds.push([row, col]);
      }
    }
  }

  generateWalls() {
    const walls = [
      [0, this.size, 0, 0],
      [this.size, this.size, 0, this.size],
      [0, this.size, this.size, this.size],
      [0, 0, 0, this.size]
    ]

    let wallStart = null;
    for(let row = 0; row < this.size - 1; row++) {
      for(let col = 0; col < this.size; col++) {
        if(this.grid[row][col].S) {
          if(!wallStart) wallStart = col;
        } else if(!!wallStart) {
          walls.push([wallStart, col, row + 1, row + 1]);
          wallStart = null;
        }
      }
      if(!!wallStart) {
        walls.push([wallStart, this.size, row + 1, row + 1]);
        wallStart = null;
      }
    }

    for(let col = 0; col < this.size - 1; col++) {
      for(let row = 0; row < this.size; row++) {
        if(this.grid[row][col].E) {
          if(!wallStart) wallStart = row;
        } else if(!!wallStart) {
          walls.push([col+1, col+1, wallStart, row]);
          wallStart = null;
        }
      }
      if(!!wallStart) {
        walls.push([col+1, col+1, wallStart, this.size]);
        wallStart = null;
      }
    }

    return walls;
  }
}