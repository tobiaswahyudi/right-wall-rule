// Dead simple
export class InventoryManager {
  constructor() {
    this.gunCapacity = 3;
    this.turretCapacity = 2;
    this.guns = [];
    this.turrets = [];
    this.gunIndex = 0;
  }

  addGun(gun) {
    if(this.guns.length < this.gunCapacity) this.guns.push(gun);
  }

  addTurret(turret) {
    if(this.turrets.length < this.turretCapacity) this.turrets.push(turret);
  }

  get selectedGun() {
    return this.guns[this.gunIndex];
  }
}