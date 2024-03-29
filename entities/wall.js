import { Entity } from "./entity.js";
import { COLORS, SIZES, } from "../config.js";
import { RectHitbox } from "../hitbox/shapes.js";
import { EFFECT_LAYERS } from "../effects/effect.js";
import { AbstractEffect } from "../effects/abstractEffect.js";
import gameEngine from "../core/engine.js";

export class Wall extends Entity {
  constructor(xStart, xEnd, yStart, yEnd) {
    super((xStart + xEnd)/2, (yStart + yEnd)/2);

    this.xStart = xStart;
    this.xEnd = xEnd;
    this.yStart = yStart;
    this.yEnd = yEnd;

    this.hitbox = new RectHitbox(
      this.xStart - SIZES.wallWidth,
      this.xEnd + SIZES.wallWidth,
      this.yStart - SIZES.wallWidth,
      this.yEnd + SIZES.wallWidth,
      COLORS.wall
    )

    const pathString = `M ${this.xStart - SIZES.wallWidth}, ${this.yEnd + SIZES.wallWidth}
    l 30, 45
    h ${this.xEnd - this.xStart + 2 * SIZES.wallWidth}
    v -${this.yEnd - this.yStart + 2 * SIZES.wallWidth}
    l -30, -45
    z`;
    const shadowPath = new Path2D(pathString);
    this.shadow = new AbstractEffect(0, 0, () => shadowPath, null, COLORS.shadowOnFloor);
    gameEngine.spawnEffect(EFFECT_LAYERS.under, this.shadow, -1);
  }

  tick() {}

  // Override. Walls don't move.
  move() {}

  render(context) {
    this.hitbox.render(context);
  }

  collide(other, collisionPoint) {}
}